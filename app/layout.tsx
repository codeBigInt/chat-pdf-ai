import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"
import {
  ClerkProvider,
} from '@clerk/nextjs'

import "./globals.css";
import QueryProvider from "./provider/QueryProvider";
import ToggleContextProvider from "./context/ToggleCotext";

export const metadata: Metadata = {
  title: "PDFChat",
  description: "Chatting with any pdf made easy ",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body
            className={`${poppins.className}`}
          >
            <ToggleContextProvider>
              {children}
            </ToggleContextProvider>
            <Toaster />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
