import { InspirationForm } from "@/components/inspiration-form";

export const dynamic = "force-dynamic";

export default async function NewInspirationPage({ searchParams }: { searchParams: Promise<{ parent?: string }> }) {
  const { parent } = await searchParams;
  return (
    <main className="page-shell py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-[#126f9f]">INFOOT</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">영감을 기록합니다.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/55">아이디어 자체가 아니라, 다른 사람이 이해하고 활용할 수 있는 구체적인 표현물로 남겨주세요.</p>
        <div className="mt-10 rounded-[2rem] border border-black/10 bg-[#e9f7ef] p-5 sm:p-9"><InspirationForm parentId={parent} /></div>
      </div>
    </main>
  );
}
