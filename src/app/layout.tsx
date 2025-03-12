import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloquinhos de carnaval 2025",
  description: "Bloquinhos de carnaval 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`dark antialiased`}>{children}</body>
    </html>
  );
}
