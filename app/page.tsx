import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { InspirationCard } from "@/components/inspiration-card";
import { Button } from "@/components/ui/button";
import { listInspirations } from "@/lib/data";
import type { Inspiration } from "@/lib/types";

export const dynamic = "force-dynamic";

const samples: Inspiration[] = [
  { id: "sample-one", ownerId: "sample", ownerName: "J. Han", title: "비가 기억을 지우는 도시", summary: "비를 맞은 사람은 가장 최근의 기억부터 잃는다. 우산을 만드는 사람과 비를 기다리는 사람의 이야기.", body: "", contentType: "text", licenseType: "협업 전용", price: 0, tags: ["세계관", "단편영화", "비"], parentId: null, mediaName: null, mediaType: null, createdAt: "", saveCount: 18 },
  { id: "sample-two", ownerId: "sample", ownerName: "MOMO", title: "새벽 4시의 파란 소음", summary: "도시가 가장 조용한 시간에만 들리는 전자음과 빗소리를 겹친 48초의 사운드 스케치.", body: "", contentType: "audio", licenseType: "2차 창작 허용", price: 12000, tags: ["사운드", "도시", "새벽"], parentId: null, mediaName: null, mediaType: null, createdAt: "", saveCount: 31 },
  { id: "sample-three", ownerId: "sample", ownerName: "Studio 404", title: "버려진 간판의 알파벳", summary: "철거를 앞둔 골목에서 수집한 글자 조각 26개. 브랜드, 포스터, 타이틀 디자인을 위한 시각 자료.", body: "", contentType: "design", licenseType: "상업 이용", price: 28000, tags: ["타이포", "아카이브", "도시"], parentId: null, mediaName: null, mediaType: null, createdAt: "", saveCount: 42 },
];

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const params = await searchParams;
  let items: Inspiration[] = [];
  let databaseReady = true;
  try { items = await listInspirations({ q: params.q, type: params.type }); } catch { databaseReady = false; }
  const shownItems = items.length ? items : samples;

  return (
    <main>
      <section className="border-b border-black/10 bg-[#d7ff43]">
        <div className="mx-auto grid max-w-[1440px] gap-7 px-4 py-10 sm:px-7 md:grid-cols-[1fr_auto] md:items-end md:py-14">
          <div><p className="eyebrow"><Sparkles className="size-4" />CREATIVE IP NETWORK</p><h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.07em]">아직 만들어지지 않은 것들이 모이는 곳.</h1></div>
          <div className="max-w-sm md:pb-2"><p className="text-base font-medium leading-7 text-black/65">텍스트, 이미지, 소리, 영상에서 시작된 영감이 사람을 만나 프로젝트가 됩니다.</p><Button asChild variant="outline" className="mt-5 rounded-full border-black bg-transparent"><Link href="/inspirations/new">첫 영감 올리기<ArrowRight /></Link></Button></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-7 sm:py-12">
        <div className="flex flex-col gap-5 border-b border-black/10 pb-7 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="eyebrow text-[#1822ff]">DISCOVER</p><h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">오늘의 영감</h2></div>
          <form className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto" action="/">
            <label className="relative min-w-0 flex-1 lg:w-80"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/35" /><input name="q" defaultValue={params.q} className="h-11 w-full rounded-full border border-black/15 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#1822ff]" placeholder="제목, 태그, 키워드 검색" /></label>
            <select name="type" defaultValue={params.type ?? "all"} className="h-11 rounded-full border border-black/15 bg-white px-4 text-sm font-semibold outline-none focus:border-[#1822ff]"><option value="all">전체 형식</option><option value="text">텍스트</option><option value="image">이미지</option><option value="audio">오디오</option><option value="video">영상</option><option value="design">디자인</option></select>
            <Button type="submit" className="h-11 rounded-full px-5">찾기</Button>
          </form>
        </div>
        {!databaseReady && <p className="mt-5 rounded-xl bg-[#e7e8ff] px-4 py-3 text-sm font-semibold text-[#1822ff]">첫 배포 전 미리보기입니다. 배포 후 등록한 영감이 여기에 표시됩니다.</p>}
        {databaseReady && !items.length && <p className="mt-5 text-sm text-black/50">아직 등록된 영감이 없어 샘플을 보여드리고 있습니다.</p>}
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{shownItems.map((item) => <InspirationCard key={item.id} item={item} demo={!items.length} />)}</div>
      </section>
    </main>
  );
}
