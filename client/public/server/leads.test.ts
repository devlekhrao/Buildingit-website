import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the db helpers and notification so tests don't hit a real database.
const insertLead = vi.fn();
const subscribeNewsletter = vi.fn();
const listLeads = vi.fn();
const listNewsletterSignups = vi.fn();
const notifyOwner = vi.fn();

vi.mock("./db", () => ({
  insertLead: (...args: unknown[]) => insertLead(...args),
  subscribeNewsletter: (...args: unknown[]) => subscribeNewsletter(...args),
  listLeads: (...args: unknown[]) => listLeads(...args),
  listNewsletterSignups: (...args: unknown[]) => listNewsletterSignups(...args),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: (...args: unknown[]) => notifyOwner(...args),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function publicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

beforeEach(() => {
  insertLead.mockReset().mockResolvedValue(undefined);
  subscribeNewsletter.mockReset().mockResolvedValue(undefined);
  notifyOwner.mockReset().mockResolvedValue(true);
});

describe("leads.create", () => {
  it("inserts a lead and notifies the owner", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.leads.create({
      name: "Jane Doe",
      email: "jane@example.com",
      projectType: "AI / Automation",
      budget: "$15k – $50k",
      timeline: "1–3 months",
      message: "I want to build a thing.",
    });

    expect(result).toEqual({ success: true });
    expect(insertLead).toHaveBeenCalledTimes(1);
    expect(insertLead).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      projectType: "AI / Automation",
      budget: "$15k – $50k",
      timeline: "1–3 months",
      message: "I want to build a thing.",
    });
    expect(notifyOwner).toHaveBeenCalledTimes(1);
  });

  it("maps omitted optional fields to null", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await caller.leads.create({ name: "Bob", email: "bob@example.com" });

    expect(insertLead).toHaveBeenCalledWith({
      name: "Bob",
      email: "bob@example.com",
      projectType: null,
      budget: null,
      timeline: null,
      message: null,
    });
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.leads.create({ name: "Bad", email: "not-an-email" })
    ).rejects.toThrow();
    expect(insertLead).not.toHaveBeenCalled();
  });

  it("rejects a missing name", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      // @ts-expect-error intentionally missing required name
      caller.leads.create({ email: "x@example.com" })
    ).rejects.toThrow();
    expect(insertLead).not.toHaveBeenCalled();
  });

  it("still succeeds if owner notification fails", async () => {
    notifyOwner.mockRejectedValueOnce(new Error("notify down"));
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.leads.create({
      name: "Jane",
      email: "jane@example.com",
    });
    expect(result).toEqual({ success: true });
    expect(insertLead).toHaveBeenCalledTimes(1);
  });
});

describe("newsletter.subscribe", () => {
  it("subscribes a valid email", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.newsletter.subscribe({ email: "fan@example.com" });

    expect(result).toEqual({ success: true });
    expect(subscribeNewsletter).toHaveBeenCalledWith("fan@example.com");
    expect(notifyOwner).toHaveBeenCalledTimes(1);
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.newsletter.subscribe({ email: "nope" })
    ).rejects.toThrow();
    expect(subscribeNewsletter).not.toHaveBeenCalled();
  });

  it("surfaces a server error if the insert fails", async () => {
    subscribeNewsletter.mockRejectedValueOnce(new Error("db down"));
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.newsletter.subscribe({ email: "fan@example.com" })
    ).rejects.toThrow();
  });
});
