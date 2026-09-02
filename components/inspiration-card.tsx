import Link from "next/link";
import { ArrowUpRight, Bookmark, FileText, ImageIcon, Music2, Shapes, Video, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Inspiration } from "@/lib/types";

const typeMeta: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  text: { label: "텍스트", icon: FileText, color: "bg-[#e7e8ff] text-[#1822ff]" },
  image: { label: "이미지", icon: ImageIcon, color: "bg-[#e5f7e9] text-[#176b39]" },
  audio: { label: "오디오", icon: Music2, color: "bg-[#fff0c9] text-[#7a4b00]" },
  video: { label: "영상", icon: Video, color: "bg-[#ffe4ee] text-[#9b174c]" },
  design: { label: "디자인", icon: Shapes, color: "bg-[#e4f5ff] text-[#075985]" },
};

export function InspirationCard({ item, demo = false }: { item: Inspiration; demo?: boolean }) {
  const meta = typeMeta[item.contentType] ?? typeMeta.text;
  const Icon = meta.icon;
  const content = (
    <article className="inspiration-card group flex h-full min-h-72 flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <Badge className={`rounded-full border-0 px-3 py-1 ${meta.color}`}>
          <Icon className="size-3.5" />{meta.label}
        </Badge>
        <ArrowUpRight className="size-5 text-black/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
      </div>
      <div className="mt-9 flex-1">
        <h2 className="max-w-[18ch] text-[1.55rem] font-black leading-[1.18] tracking-[-0.045em] text-balance">{item.title}</h2>
        <p className="mt-4 line-clamp-3 text-[0.95rem] leading-6 text-black/60">{item.summary}</p>
      </div>
      <div className="mt-7 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-black/10 px-2.5 py-1 text-xs font-medium text-black/55">#{tag}</span>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/10 pt-4 text-xs text-black/55">
        <div>
          <p className="font-bold text-black/80">{item.ownerName}</p>
          <p className="mt-1">{item.licenseType}</p>
        </div>
        <span className="flex items-center gap-1 font-semibold"><Bookmark className="size-3.5" />{item.saveCount ?? 0}</span>
      </div>
      {demo && <span className="absolute bottom-4 right-14 rounded-full bg-[#d7ff43] px-2 py-1 text-[11px] font-black">SAMPLE</span>}
    </article>
  );

  return demo ? <div className="relative cursor-default">{content}</div> : <Link href={`/inspirations/${item.id}`}>{content}</Link>;
}
