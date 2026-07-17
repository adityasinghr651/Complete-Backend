import { Button } from "@/components/ui/button";
import { BrainGraph } from "@/components/brain-graph";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 py-24 md:flex-row md:py-32">
        <div className="max-w-xl">
          <p className="text-accent-signal font-mono text-sm tracking-wide">
            devbrain-os / v0.1.0
          </p>

          <h1 className="font-display mt-4 text-4xl leading-tight tracking-tight md:text-5xl">
            Your codebase has a brain now.
          </h1>

          <p className="text-muted mt-6 text-lg">
            DevBrain OS turns your architecture, decisions, and docs into one
            Engineering Brain that both your team and every AI assistant you use
            can actually understand -- so you stop re-explaining the same
            project on repeat.
          </p>

          <div className="mt-8 flex gap-3">
            <Button>Read the architecture</Button>
            <Button variant="secondary">View on GitHub</Button>
          </div>
        </div>

        <div className="h-72 w-full max-w-md md:h-80">
          <BrainGraph />
        </div>
      </section>
    </main>
  );
}
