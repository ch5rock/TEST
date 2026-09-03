"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InspirationForm({ parentId }: { parentId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/inspirations", { method: "POST", body: new FormData(event.currentTarget) });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "등록하지 못했습니다.");
      setLoading(false);
      return;
    }
    router.push(`/inspirations/${data.inspiration.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-7">
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <div className="grid gap-2">
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" required maxLength={80} placeholder="한 문장으로 영감의 핵심을 적어주세요" className="h-12 rounded-xl bg-white" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="summary">짧은 소개</Label>
        <Textarea id="summary" name="summary" required maxLength={240} placeholder="누가, 무엇을 만들 때 유용한 영감인지 설명해주세요" className="min-h-28 rounded-xl bg-white" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="body">구체적인 내용</Label>
        <Textarea id="body" name="body" maxLength={5000} placeholder="설정, 배경, 사용 방법, 제작 의도 등을 자유롭게 적어주세요" className="min-h-48 rounded-xl bg-white" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contentType">형식</Label>
          <select id="contentType" name="contentType" className="form-select" defaultValue="text">
            <option value="text">텍스트·기획</option><option value="image">사진·이미지</option><option value="audio">음성·음악</option><option value="video">영상</option><option value="design">디자인</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="licenseType">이용 범위</Label>
          <select id="licenseType" name="licenseType" className="form-select" defaultValue="협업 전용">
            <option>열람 전용</option><option>개인 이용</option><option>상업 이용</option><option>2차 창작 허용</option><option>독점 이용</option><option>협업 전용</option>
          </select>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="tags">태그</Label>
          <Input id="tags" name="tags" placeholder="도시, 여름, 단편영화" className="h-12 rounded-xl bg-white" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">가격(원)</Label>
          <Input id="price" name="price" type="number" min="0" step="1000" defaultValue="0" className="h-12 rounded-xl bg-white" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="file">원본 파일 <span className="font-normal text-black/45">선택 · 최대 25MB</span></Label>
        <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-black/25 bg-white px-5 text-sm font-semibold transition hover:border-[#249bd3] hover:bg-[#effaff]">
          <UploadCloud className="size-5 text-[#126f9f]" />파일 선택
          <Input id="file" name="file" type="file" className="sr-only" />
        </label>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      <Button type="submit" size="lg" disabled={loading} className="h-13 rounded-full bg-[#126f9f] text-base text-white hover:bg-[#0d587e]">
        {loading ? "등록 중…" : "영감 공개하기"}<ArrowRight />
      </Button>
    </form>
  );
}
