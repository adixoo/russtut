import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import { urls } from "@/data/urls";
import React from "react";
import { CodeBlock, MarkdownLink } from "./components";

import type { Metadata } from "next";

type Props = { params: Promise<{ topic: string }> };

export const dynamic = "force-static";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = (await params).topic;
  const url = urls[topic].chapter;
  return {
    title: url,
  };
}

async function getData(topic: string) {
  try {
    const url = urls[topic].content;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdownContent = await response.text();
    return markdownContent;
  } catch (error) {
    console.error("Error fetching the markdown content:", error);
    return null;
  }
}

export default async function Page({ params }: Props) {
  const topic = (await params).topic;
  const markdownContent = await getData(topic);

  if (!markdownContent) return notFound();

  return (
    <>
      <Markdown
        options={{
          overrides: {
            pre: {
              component: CodeBlock,
            },
            a: {
              component: MarkdownLink,
            },
            // h1: {
            //   component: TypographyH1,
            // },
            // h2: {
            //   component: TypographyH2,
            // },
            // h3: {
            //   component: TypographyH3,
            // },
            // h4: {
            //   component: TypographyH4,
            // },
            // p: {
            //   component: TypographyP,
            // },
            // blockquote: {
            //   component: TypographyBlockquote,
            // },
            // ul: {
            //   component: TypographyUnorderedList,
            // },
            // ol: {
            //   component: TypographyOrderedList,
            // },
            // li: {
            //   component: TypographyListItem,
            // },
          },
        }}
        className="prose prose-lg prose-light w-full px-10 py-20 dark:prose-invert prose-strong:font-medium"
      >
        {markdownContent}
      </Markdown>
      {/* <div className="h-full min-w-64 border-l pl-5">
        <div className="sticky top-0 h-max pt-20">on this pae</div>
      </div> */}
    </>
  );
}
