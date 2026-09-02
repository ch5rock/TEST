import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "MOTIF — 영감에서 작품까지",
  description: "영감을 발견하고, 기록하고, 함께 만들어 완성하는 창작 협업 플랫폼",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
