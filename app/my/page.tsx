import Link from "next/link";
import { ArrowRight, Bookmark, FolderKanban, Plus } from "lucide-react";
import { InspirationCard } from "@/components/inspiration-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { listMyItems } from "@/lib/data";
import type { Inspiration, Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const user = await getCurrentUser();
  let data: { owned: Inspiration[]; saved: Inspiration[]; projects: Project[] } = { owned: [], saved: [], projects: [] };
  if (user) { try { data = await listMyItems(user.id); } catch { data = { owned: [], saved: [], projects: [] }; } }
  return (
    <main className="page-shell py-10 sm:py-14"><div className="mx-auto max-w-6xl">
      <div className="rounded-[2rem] bg-[#126f9f] p-7 text-white sm:p-10"><p className="text-sm font-bold text-[#d5ff63]">FOOTPRINT</p><h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{user?.name ?? "FOOTER"}의 작업실</h1><div className="mt-8 grid grid-cols-3 gap-3"><div className="stat"><strong>{data.owned.length}</strong><span>올린 영감</span></div><div className="stat"><strong>{data.saved.length}</strong><span>저장한 영감</span></div><div className="stat"><strong>{data.projects.length}</strong><span>내 프로젝트</span></div></div></div>
      <section className="mt-12"><div className="section-title"><div><p className="eyebrow text-[#126f9f]">CREATED</p><h2>내가 올린 영감</h2></div><Button asChild variant="outline" className="rounded-full"><Link href="/inspirations/new"><Plus />새 영감</Link></Button></div>{data.owned.length ? <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.owned.map((item) => <InspirationCard key={item.id} item={item} />)}</div> : <Empty icon={Plus} text="첫 영감을 기록해보세요." href="/inspirations/new" />}</section>
      <section className="mt-14"><div className="section-title"><div><p className="eyebrow text-[#126f9f]">SAVED</p><h2>저장한 영감</h2></div><Bookmark className="text-black/20" /></div>{data.saved.length ? <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.saved.map((item) => <InspirationCard key={item.id} item={item} />)}</div> : <Empty icon={Bookmark} text="마음에 드는 영감을 저장해보세요." href="/" />}</section>
      <section className="mt-14"><div className="section-title"><div><p className="eyebrow text-[#126f9f]">COLLAB</p><h2>내 프로젝트</h2></div><FolderKanban className="text-black/20" /></div>{data.projects.length ? <div className="mt-6 grid gap-3">{data.projects.map((project) => <Link key={project.id} href={`/inspirations/${project.inspirationId}`} className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-5 hover:border-[#249bd3]"><div><p className="font-black">{project.title}</p><p className="mt-1 text-sm text-black/50">{project.status} · {project.rolesNeeded.join(", ")}</p></div><ArrowRight /></Link>)}</div> : <Empty icon={FolderKanban} text="영감에서 협업 프로젝트를 시작해보세요." href="/" />}</section>
    </div></main>
  );
}

function Empty({ icon: Icon, text, href }: { icon: typeof Plus; text: string; href: string }) {
  return <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-black/20 p-6"><span className="flex items-center gap-3 font-semibold text-black/55"><Icon className="size-5" />{text}</span><Button asChild variant="ghost" size="icon"><Link href={href} aria-label="이동"><ArrowRight /></Link></Button></div>;
}
