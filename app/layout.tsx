import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXRY HUB",
  description: "SA-MP Modding Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
