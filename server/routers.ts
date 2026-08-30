import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { insertLead, listLeads, listNewsletterSignups, subscribeNewsletter } from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    /** Public: capture an inbound project lead from the "Start a build" form. */
    create: publicProcedure
      .input(
        z.object({
          name: z.string().trim().min(1, "Name is required").max(255),
          email: z.string().trim().email("Enter a valid email").max(320),
          projectType: z.string().trim().max(120).optional(),
          budget: z.string().trim().max(80).optional(),
          timeline: z.string().trim().max(80).optional(),
          message: z.string().trim().max(5000).optional(),
        })
      )
      .mutation(async ({ input }) => {
        await insertLead({
          name: input.name,
          email: input.email,
          projectType: input.projectType || null,
          budget: input.budget || null,
          timeline: input.timeline || null,
          message: input.message || null,
        });

        // Best-effort owner notification (non-blocking on failure).
        try {
          await notifyOwner({
            title: `New build request from ${input.name}`,
            content: [
              `Name: ${input.name}`,
              `Email: ${input.email}`,
              input.projectType ? `Project: ${input.projectType}` : null,
              input.budget ? `Budget: ${input.budget}` : null,
              input.timeline ? `Timeline: ${input.timeline}` : null,
              input.message ? `\nMessage:\n${input.message}` : null,
            ]
              .filter(Boolean)
              .join("\n"),
          });
        } catch (err) {
          console.warn("[leads.create] notifyOwner failed:", err);
        }

        return { success: true } as const;
      }),

    /** Admin: list recent leads. */
    list: adminProcedure.query(() => listLeads(200)),
  }),

  newsletter: router({
    /** Public: subscribe an email to the waitlist/newsletter (idempotent). */
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().trim().email("Enter a valid email").max(320),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await subscribeNewsletter(input.email);
        } catch (err) {
          console.error("[newsletter.subscribe] failed:", err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not save your email. Please try again.",
          });
        }

        try {
          await notifyOwner({
            title: "New newsletter signup",
            content: `Email: ${input.email}`,
          });
        } catch (err) {
          console.warn("[newsletter.subscribe] notifyOwner failed:", err);
        }

        return { success: true } as const;
      }),

    /** Admin: list newsletter signups. */
    list: adminProcedure.query(() => listNewsletterSignups(500)),
  }),
});

export type AppRouter = typeof appRouter;
