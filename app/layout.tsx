"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "./providers";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RecoilRoot>
            <Navbar user={false} />
            {children}
          </RecoilRoot>
        </Providers>
      </body>
    </html>
  );
}
