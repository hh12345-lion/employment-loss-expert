"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** "On this page" list built from the h2 headings of the surrounding article. */
export function ArticleToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("[data-article] h2")
    ).filter((h) => h.textContent?.trim());

    const used = new Set<string>();
    const found = headings.map((h) => {
      if (!h.id) {
        const base = slugify(h.textContent ?? "") || "section";
        let id = base;
        for (let n = 2; used.has(id) || document.getElementById(id); n++) id = `${base}-${n}`;
        h.id = id;
      }
      used.add(h.id);
      return { id: h.id, text: h.textContent?.trim() ?? "" };
    });

    const frame = requestAnimationFrame(() => setItems(found));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );
    headings.forEach((h) => observer.observe(h));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="border-l border-border pl-5">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
        On this page
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              className={`block text-sm leading-snug transition-colors hover:text-ink ${
                activeId === item.id ? "font-semibold text-ink" : "text-body"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
