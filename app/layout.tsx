import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider"; // Pastikan buat file ini atau hapus jika belum ada

export const metadata: Metadata = {
  title: "EXRY HUB | SA-MP Modding Community",
  description: "Koleksi modifikasi visual dan script Lua.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
