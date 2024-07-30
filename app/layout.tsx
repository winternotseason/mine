import type { Metadata, Viewport } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/app/(user)/_component/session-provider";
import { Montserrat, Nanum_Gothic } from "next/font/google";



const nanum_gothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
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
    <html
      lang="ko"
      className={nanum_gothic.className}
    >
      <body className="font-gothic">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
