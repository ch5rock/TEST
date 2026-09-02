import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, FileDown, GitBranch, Users } from "lucide-react";
import { JoinProjectButton } from "@/components/join-project-button";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getInspiration, getParentInspiration, isSaved, listProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function InspirationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getInspiration(id);
  if (!item) notFound();
  const user = await getCurrentUser();
  const [parent, relatedProjects, saved] = await Promise.all([
    getParentInspiration(item.parentId), listProjects(item.id), user ? isSaved(user.id, item.id) : false,
  ]);

  return (
    <main className="page-shell py-9 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
          <article>
            <div className="flex flex-wrap items-center gap-2"><Badge className="rounded-full bg-[#e7e8ff] px-3 py-1 text-[#1822ff]">{item.contentType}</Badge><Badge variant="outline" className="rounded-full px-3 py-1">{item.licenseType}</Badge></div>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,6.8rem)] font-black leading-[0.94] tracking-[-0.07em] text-balance">{item.title}</h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-black/60">{item.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-black/5 px-3 py-1.5 text-sm font-semibold">#{tag}</span>)}</div>
            <div className="mt-9 flex flex-wrap gap-3"><SaveButton inspirationId={item.id} initialSaved={saved} /><Button asChild className="h-11 rounded-full bg-[#1822ff] px-5 text-white hover:bg-[#1119cc]"><Link href={`/projects/new?inspiration=${item.id}`}>이 영감으로 함께 만들기<ArrowRight /></Link></Button></div>
            <section className="mt-14 border-t border-black/10 pt-9"><p className="eyebrow text-[#1822ff]">DETAIL</p><div className="prose-copy mt-6 whitespace-pre-wrap">{item.body || "판매자가 추가 설명을 작성하지 않았습니다."}</div>{item.mediaName && <Button asChild variant="outline" className="mt-8 rounded-full"><a href={`/api/media/${item.id}`}><FileDown />{item.mediaName}</a></Button>}</section>
          </article>
          <aside className="lg:pt-4"><div className="sticky top-24 grid gap-4"><div className="rounded-[1.75rem] bg-[#1822ff] p-6 text-white"><p className="text-xs font-bold tracking-[0.14em] text-white/55">CREATOR</p><p className="mt-4 text-2xl font-black tracking-tight">{item.ownerName}</p><p className="mt-8 text-sm text-white/55">이용 가격</p><p className="mt-1 text-2xl font-black">{item.price ? `${item.price.toLocaleString("ko-KR")}원` : "협의"}</p></div><div className="rounded-[1.75rem] border border-black/10 bg-[#f7f7f2] p-6"><p className="eyebrow"><GitBranch className="size-4" />INSPIRATION TREE</p><div className="mt-5 grid gap-3 text-sm">{parent ? <Link href={`/inspirations/${parent.id}`} className="tree-node bg-white"><span>출발 영감</span><strong>{parent.title}</strong></Link> : <div className="tree-node bg-white"><span>출발 영감</span><strong>{item.title}</strong></div>}<ArrowDown className="mx-auto size-4 text-black/30" /><div className="tree-node bg-[#d7ff43]"><span>현재</span><strong>{item.title}</strong></div><ArrowDown className="mx-auto size-4 text-black/30" /><Link href={`/inspirations/new?parent=${item.id}`} className="tree-node border border-dashed border-black/25 bg-transparent hover:border-[#1822ff]"><span>다음 영감</span><strong>새 가지 만들기 +</strong></Link></div></div></div></aside>
        </div>
        <section className="mt-16 border-t border-black/10 pt-10"><div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-[#1822ff]">COLLAB</p><h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">진행 중인 협업</h2></div><Users className="size-8 text-black/20" /></div>{relatedProjects.length ? <div className="mt-7 grid gap-4 md:grid-cols-2">{relatedProjects.map((project) => <div key={project.id} className="rounded-[1.75rem] border border-black/10 bg-white p-6"><div className="flex items-center justify-between"><Badge className="rounded-full bg-[#d7ff43] text-black">모집 중</Badge><span className="text-xs text-black/45">{project.memberCount}명 참여</span></div><h3 className="mt-5 text-2xl font-black tracking-tight">{project.title}</h3><p className="mt-3 text-sm leading-6 text-black/55">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.rolesNeeded.map((role) => <JoinProjectButton key={role} projectId={project.id} role={role} />)}</div></div>)}</div> : <div className="mt-7 rounded-[1.75rem] border border-dashed border-black/20 p-8 text-center"><p className="font-bold">아직 시작된 협업이 없습니다.</p><Button asChild variant="link" className="mt-2 text-[#1822ff]"><Link href={`/projects/new?inspiration=${item.id}`}>첫 프로젝트 만들기<ArrowRight /></Link></Button></div>}</section>
      </div>
    </main>
  );
}
