"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProjectForm({ inspirationId, inspirationTitle }: { inspirationId: string; inspirationTitle: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inspirationId,
        title: formData.get("title"),
        description: formData.get("description"),
        rolesNeeded: String(formData.get("rolesNeeded") ?? "").split(",").map((v) => v.trim()).filter(Boolean),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "프로젝트를 만들지 못했습니다.");
      setLoading(false);
      return;
    }
    router.push(`/inspirations/${inspirationId}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-6">
      <div className="rounded-2xl bg-[#dff4ff] p-4 text-sm">
        <span className="font-semibold text-[#126f9f]">시작 영감</span><p className="mt-1 font-bold">{inspirationTitle}</p>
      </div>
      <div className="grid gap-2"><Label htmlFor="title">프로젝트명</Label><Input id="title" name="title" required maxLength={100} className="h-12 rounded-xl bg-white" /></div>
      <div className="grid gap-2"><Label htmlFor="description">무엇을 만들고 싶나요?</Label><Textarea id="description" name="description" required maxLength={1000} className="min-h-40 rounded-xl bg-white" /></div>
      <div className="grid gap-2"><Label htmlFor="rolesNeeded">필요한 역할</Label><Input id="rolesNeeded" name="rolesNeeded" required placeholder="작가, 영상 감독, 음악가" className="h-12 rounded-xl bg-white" /><p className="text-xs text-black/45">쉼표로 구분해주세요.</p></div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      <Button type="submit" size="lg" disabled={loading} className="h-13 rounded-full bg-[#126f9f] text-white hover:bg-[#0d587e]">{loading ? "만드는 중…" : "협업 모집 시작"}<ArrowRight /></Button>
    </form>
  );
}
