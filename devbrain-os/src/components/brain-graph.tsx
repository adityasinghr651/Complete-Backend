/**
 * BrainGraph is DevBrain OS's signature visual: a small node-and-edge
 * graph. It's a literal illustration of the product's core idea — a
 * project's architecture, decisions, and docs as connected nodes of
 * knowledge, instead of scattered files an AI assistant has to
 * rediscover every time.
 *
 * It's a plain functional component (not in components/ui) because it
 * is specific to DevBrain OS branding, not a generic reusable primitive.
 * Colors are pulled from CSS variables (see globals.css) so it stays in
 * sync with the rest of the design system automatically.
 */
export function BrainGraph() {
  const nodes = [
    { id: "core", x: 210, y: 150, r: 7 },
    { id: "arch", x: 90, y: 70, r: 4 },
    { id: "adr", x: 60, y: 170, r: 4 },
    { id: "api", x: 330, y: 60, r: 4 },
    { id: "docs", x: 350, y: 160, r: 4 },
    { id: "review", x: 260, y: 250, r: 4 },
    { id: "context", x: 130, y: 250, r: 4 },
  ];

  const edges: [string, string][] = [
    ["core", "arch"],
    ["core", "adr"],
    ["core", "api"],
    ["core", "docs"],
    ["core", "review"],
    ["core", "context"],
    ["arch", "adr"],
    ["api", "docs"],
    ["review", "context"],
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 420 320" className="h-full w-full" aria-hidden="true">
      {edges.map(([from, to]) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--line)"
            strokeWidth="1"
          />
        );
      })}
      {nodes.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.id === "core" ? "var(--accent)" : "var(--accent-signal)"}
          opacity={n.id === "core" ? 1 : 0.85}
        />
      ))}
    </svg>
  );
}
