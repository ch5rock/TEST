import Link from "next/link";
import Image from "next/image";
import { FolderKanban, Plus, Sparkles, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f4fbff]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-7">
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0" aria-label="MOTIFOOT 홈">
            <Image src="/motifoot-logo.png" alt="MOTIFOOT" width={160} height={102} className="h-12 w-auto rounded-md" priority />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
            <Link href="/" className="nav-link">INFOOT</Link>
            <Link href="/projects" className="nav-link">OUTFOOT</Link>
            <Link href="/my" className="nav-link">FOOTPRINT</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/my" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold hover:bg-black/5 sm:flex">
            <UserCircle className="size-4" />
            <span className="max-w-32 truncate">{user?.name ?? "FOOTER"}</span>
          </Link>
          <Button asChild className="rounded-full bg-[#126f9f] px-4 text-white hover:bg-[#0d587e]">
            <Link href="/inspirations/new"><Plus className="size-4" />영감 올리기</Link>
          </Button>
        </div>
      </div>
      <nav className="flex h-11 items-center gap-1 overflow-x-auto border-t border-black/5 px-4 md:hidden" aria-label="모바일 메뉴">
        <Link href="/" className="nav-link"><Sparkles className="size-4" />INFOOT</Link>
        <Link href="/projects" className="nav-link"><FolderKanban className="size-4" />OUTFOOT</Link>
        <Link href="/my" className="nav-link"><UserCircle className="size-4" />FOOTPRINT</Link>
      </nav>
    </header>
  );
}
