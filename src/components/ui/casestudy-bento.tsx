import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CaseStudyBentoItem {
  nombre: string;
  categoria: string;
  identificadores?: string[];
  severidad?: string;
  descripcion: string;
  impacto: string[];
  mitigacion?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function CaseStudyTile({ item, featured = false }: { item: CaseStudyBentoItem; featured?: boolean }) {
  const score = parseFloat((item.severidad ?? "").replace(/[^\d.]/g, ""));

  return (
    <article
      className={cn(
        "flex flex-col rounded-3xl border bg-panel/80 backdrop-blur-sm",
        featured ? "border-ember/40 p-7 shadow-[0_0_60px_-24px_var(--color-ember)]" : "border-line p-6",
      )}
    >
      <span className="self-start rounded-full border border-threat/35 bg-threat/10 px-3.5 py-1.5 font-mono text-[18px] tracking-[0.12em] text-threat uppercase">
        {item.categoria}
      </span>
      <h3
        className={cn(
          "font-semibold tracking-tight text-fg",
          featured ? "mt-4 text-[68px] leading-[0.95]" : "mt-4 text-[44px] leading-none",
        )}
      >
        {item.nombre}
      </h3>
      {item.identificadores && item.identificadores.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.identificadores.map((id) => (
            <span key={id} className="rounded-md border border-line bg-ink px-2 py-1 font-mono text-[18px] text-ember">
              {id}
            </span>
          ))}
        </div>
      )}
      {item.severidad && (
        <div className="mt-4 flex items-center gap-4">
          <span className={cn("font-mono font-semibold whitespace-nowrap text-threat", featured ? "text-[32px]" : "text-[22px]")}>
            {item.severidad}
          </span>
          {featured && Number.isFinite(score) && (
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ember to-threat"
                initial={{ width: 0 }}
                animate={{ width: `${score * 10}%` }}
                transition={{ delay: 0.5, duration: 1.2, ease }}
              />
            </div>
          )}
        </div>
      )}
      <p className={cn("leading-snug", featured ? "mt-4 text-[26px] text-fg/90" : "mt-3 text-[24px] text-dim")}>
        {item.descripcion}
      </p>
      <ul className={cn("space-y-2", featured ? "mt-4" : "mt-3")}>
        {item.impacto.map((x) => (
          <li key={x} className={cn("flex gap-3 leading-snug text-fg/90", featured ? "text-[22px]" : "text-[20px]")}>
            <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-threat" />
            {x}
          </li>
        ))}
      </ul>
      {item.mitigacion && (
        <div className="mt-auto pt-4">
          <div
            className={cn(
              "flex items-start gap-3 rounded-2xl border border-defense/25 bg-defense/[0.06] text-fg",
              featured ? "p-4 text-[22px]" : "p-3.5 text-[20px]",
            )}
          >
            <ShieldCheck size={featured ? 24 : 20} className="mt-0.5 shrink-0 text-defense" />
            <p className="leading-snug">{item.mitigacion}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export function CaseStudyBento({
  featured,
  items,
}: {
  featured: CaseStudyBentoItem;
  items: [CaseStudyBentoItem, CaseStudyBentoItem];
}) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[1.2fr_1fr_1fr] gap-4 bg-[radial-gradient(var(--color-faint)_1px,transparent_1px)] [background-size:18px_18px]">
      <CaseStudyTile item={featured} featured />
      {items.map((item) => (
        <CaseStudyTile key={item.nombre} item={item} />
      ))}
    </div>
  );
}
