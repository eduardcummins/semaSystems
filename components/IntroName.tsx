/** "Sema Systems" in the headline's place; letters fade in, then dissolve in a fixed shuffled order. */
export function IntroName() {
  const text = "Sema Systems";
  const order = shuffle([...text].map((_, i) => i).filter((i) => text[i] !== " "));
  return (
    <span className="intro-name" aria-hidden="true">
      {[...text].map((ch, i) =>
        ch === " " ? (
          " "
        ) : (
          <span key={i} style={{ "--a": i, "--b": order.indexOf(i) } as React.CSSProperties}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

// Deterministic so the server and client render the same order.
function shuffle<T>(arr: T[]) {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
