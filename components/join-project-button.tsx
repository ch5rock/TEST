"use client";

import { useState } from "react";
import { Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JoinProjectButton({ projectId, role }: { projectId: string; role: string }) {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  async function join() {
    setLoading(true);
    const response = await fetch(`/api/projects/${projectId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (response.ok) setJoined(true);
    setLoading(false);
  }

  return (
    <Button size="sm" className="rounded-full" variant={joined ? "secondary" : "default"} onClick={join} disabled={loading || joined}>
      {joined ? <Check /> : <Users />}{joined ? "신청 완료" : `${role}로 참여`}
    </Button>
  );
}
