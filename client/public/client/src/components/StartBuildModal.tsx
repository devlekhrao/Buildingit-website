import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";

const PROJECT_TYPES = [
  "Web App",
  "Mobile App",
  "AI / Automation",
  "Fintech / Payments",
  "E-commerce",
  "Brand / Website",
  "Something else",
];
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

interface StartBuildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional idea typed in the "Name it" hero, pre-fills the message field. */
  prefillIdea?: string;
}

export default function StartBuildModal({ open, onOpenChange, prefillIdea }: StartBuildModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // When the modal opens with a prefilled idea from the hero, seed the message
  // field once per open (only if the user hasn't already typed something).
  useEffect(() => {
    if (open && prefillIdea && prefillIdea.trim()) {
      setMessage((prev) => (prev.trim() ? prev : prefillIdea.trim()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefillIdea]);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Request received — we'll be in touch shortly.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const resetAndClose = (next: boolean) => {
    if (!next) {
      // Reset after the close animation so it doesn't flash empty.
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setProjectType("");
        setBudget("");
        setTimeline("");
        setMessage("");
      }, 250);
    }
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    createLead.mutate({
      name: name.trim(),
      email: email.trim(),
      projectType: projectType || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
      message: message.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-lg border-zinc-800 bg-zinc-950 text-zinc-100 p-0 overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center text-center px-8 py-12">
            <div className="cta-float h-16 w-16 rounded-full flex items-center justify-center mb-5">
              <CheckCircle2 className="h-8 w-8 text-zinc-900" />
            </div>
            <DialogTitle className="font-display text-2xl font-black tracking-tight">
              You named it.
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-2 max-w-sm">
              We've got your request and the team is reviewing it. Expect a reply at{" "}
              <span className="text-zinc-200 font-medium">{email}</span> soon.
            </DialogDescription>
            <button
              onClick={() => resetAndClose(false)}
              className="btn-silver mt-7 rounded-full px-7 py-2.5 font-display font-bold text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-7 pt-7 pb-2">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Rocket className="h-3.5 w-3.5" /> Start a build
              </div>
              <DialogTitle className="font-display text-2xl font-black tracking-tight text-zinc-50">
                You name it. We build it.
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Tell us what you want to bring to life. We'll get back to you with next steps.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="px-7 pb-7 pt-3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                    Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="field-dark w-full rounded-lg px-3.5 py-2.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="field-dark w-full rounded-lg px-3.5 py-2.5 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                  What do you want built?
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setProjectType((p) => (p === t ? "" : t))}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors duration-200 ${
                        projectType === t
                          ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                          : "border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                    Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="field-dark w-full rounded-lg px-3.5 py-2.5 text-sm"
                  >
                    <option value="">Select…</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-zinc-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                    Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="field-dark w-full rounded-lg px-3.5 py-2.5 text-sm"
                  >
                    <option value="">Select…</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="bg-zinc-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                  Tell us more
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your idea, problem, or vision…"
                  rows={3}
                  className="field-dark w-full rounded-lg px-3.5 py-2.5 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={createLead.isPending}
                className="btn-silver w-full rounded-full py-3 font-display font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {createLead.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send build request"
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
