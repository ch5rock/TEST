import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import { getInspiration } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ inspiration?: string }> }) {
  const { inspiration: inspirationId } = await searchParams;
  if (!inspirationId) notFound();
  const inspiration = await getInspiration(inspirationId);
  if (!inspiration) notFound();
  return <main className="page-shell py-10 sm:py-16"><div className="mx-auto max-w-2xl"><p className="eyebrow text-[#1822ff]">START COLLAB</p><h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">사람을 모읍니다.</h1><p className="mt-4 text-base leading-7 text-black/55">만들고 싶은 결과와 필요한 역할을 구체적으로 적어주세요.</p><div className="mt-10 rounded-[2rem] bg-[#f7f7f2] p-5 sm:p-9"><ProjectForm inspirationId={inspiration.id} inspirationTitle={inspiration.title} /></div></div></main>;
}
