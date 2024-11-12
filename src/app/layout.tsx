import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
import { urls } from "@/data/urls";
import Script from "next/dist/client/script";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./mode-toggle";
const outfit = Outfit({
  subsets: ["latin"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Learn Rust",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${mono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <header className="fixed left-0 top-0 z-50 w-full border-b bg-background">
            <div className="container mx-auto flex items-center justify-between py-3">
              <h1>RussTut</h1>

              <div className="">
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="container relative mx-auto flex">
            <div className="sticky top-0 h-dvh min-w-80 overflow-y-auto border-r pl-3 pt-20">
              <ul className="content-list h-max space-y-4 border-l text-muted-foreground">
                {Object.entries(urls).map(([key, url]) => (
                  <li
                    key={url.rank}
                    data-rank={url.rank}
                    className="relative pl-6 hover:text-primary"
                  >
                    <Link href={`/${key}`}>{url.chapter}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full">{children}</div>
          </main>

          <NextTopLoader
            color="hsl(var(--primary))"
            showSpinner={false}
            height={4}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
