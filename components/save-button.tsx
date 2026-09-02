"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SaveButton({ inspirationId, initialSaved }: { inspirationId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function toggleSave() {
    setLoading(true);
    const response = await fetch(`/api/inspirations/${inspirationId}/save`, { method: "POST" });
    if (response.ok) {
      const data = await response.json();
      setSaved(data.saved);
    }
    setLoading(false);
  }

  return (
    <Button variant="outline" className="h-11 rounded-full border-black/15 bg-transparent px-5" onClick={toggleSave} disabled={loading}>
      {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
      {saved ? "저장됨" : "저장하기"}
    </Button>
  );
}
