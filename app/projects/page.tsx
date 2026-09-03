import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { listProjects } from "@/lib/data";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try { projects = await listProjects(); } catch { projects = []; }
  return (
    <main className="page-shell py-10 sm:py-14"><div className="mx-auto max-w-6xl">
      <p className="eyebrow text-[#1822ff]">OUTFOOT</p>
      <div className="mt-3 flex items-end justify-between gap-4"><h1 className="text-4xl font-black tracking-[-0.055em] sm:text-7xl">발맞춰 만드는 중.</h1><Users className="hidden size-12 text-black/15 sm:block" /></div>
      {projects.length ? <div className="mt-10 grid gap-4 md:grid-cols-2">{projects.map((project) => <Link href={`/inspirations/${project.inspirationId}`} key={project.id} className="group rounded-[1.75rem] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"><div className="flex justify-between"><Badge className="rounded-full bg-[#d7ff43] text-black">{project.status === "recruiting" ? "모집 중" : project.status}</Badge><ArrowUpRight className="text-black/25 group-hover:text-black" /></div><p className="mt-7 text-xs font-bold text-[#1822ff]">FROM · {project.inspirationTitle}</p><h2 className="mt-2 text-3xl font-black tracking-tight">{project.title}</h2><p className="mt-4 text-sm leading-6 text-black/55">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.rolesNeeded.map((role) => <span key={role} className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold">{role}</span>)}</div></Link>)}</div> : <div className="mt-10 rounded-[2rem] border border-dashed border-black/20 p-12 text-center"><p className="text-xl font-black">아직 공개된 프로젝트가 없습니다.</p><p className="mt-2 text-sm text-black/50">영감 상세 페이지에서 첫 협업을 시작할 수 있습니다.</p></div>}
    </div></main>
  );
}
