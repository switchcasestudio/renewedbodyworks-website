import Link from "next/link";
import type { PostBlock } from "@/lib/posts";

// Turns "[label](/path)" into <Link>s; everything else stays plain text.
function inline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link
        key={m.index}
        href={m[2]}
        className="font-medium text-pine underline decoration-pine/30 underline-offset-4 hover:text-pine-deep hover:decoration-pine"
      >
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="text-[17px] leading-[1.8] text-ink/90">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-12 mb-4 font-display text-3xl font-semibold leading-tight text-pine-deep"
            >
              {b.text}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="my-6 space-y-3 pl-1">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <span>{inline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-5">
            {inline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
