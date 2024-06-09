import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { MinChatUiProvider } from "@minchat/react-chat-ui";
import { myColorSet } from "@/components/utils/chatColorSet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget AI",
  description: "Track your daily expense using AI",
};

export default function RootLayout({
  children, // etai page.tsx
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><ColorSchemeScript /></head>
      <body className="bg-bgColor text-white">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
