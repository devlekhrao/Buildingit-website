import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * Newsletter / waitlist signup band. Silver-pill submit, dark surface,
 * matches the buildingit identity.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setDone(true);
      toast.success("You're on the list.");
    },
    onError: (err) => {
      toast.error(err.message || "Could not subscribe. Try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    subscribe.mutate({ email: email.trim() });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 sm:p-10">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-zinc-100/[0.03] blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">
          <Mail className="h-3.5 w-3.5" /> The waitlist
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-50">
          Get the next thing we build.
        </h3>
        <p className="text-zinc-400 mt-2 max-w-md">
          No noise. Just launches, dispatches, and early access to what's coming out of the grid.
        </p>

        {done ? (
          <div className="mt-6 flex items-center gap-2 text-zinc-200">
            <div className="cta-float h-9 w-9 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-zinc-900" />
            </div>
            <span className="font-medium">Subscribed — welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="field-dark flex-1 rounded-full px-5 py-3 text-sm"
              required
            />
            <button
              type="submit"
              disabled={subscribe.isPending}
              className="btn-silver rounded-full px-6 py-3 font-display font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap"
            >
              {subscribe.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                </>
              ) : (
                "Join the waitlist"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
