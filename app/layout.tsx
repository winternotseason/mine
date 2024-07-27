import type { Metadata, Viewport } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/app/(user)/_component/session-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MINE",
  description: "나만의 쇼핑을 즐겨보세요!",
  icons: {
    icon: "/icon.PNG",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
