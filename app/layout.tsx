import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "MOTIF — INFOOT에서 OUTFOOT까지",
  description: "영감을 발견하고, 서로 발을 맞춰 프로젝트로 만드는 창작 협업 플랫폼",
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
