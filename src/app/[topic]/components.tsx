import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";

import React from "react";
const getElementPropsAndContent = (child: React.ReactNode) => {
  if (React.isValidElement(child)) {
    return {
      type: child.type,
      props: child.props,
      content: child.props.children,
    };
  }
  return null;
};
const getLanguageClass = (className: string | undefined) => {
  if (!className) return "bash";
  const classNames = className.split(" ");
  const languageClass = classNames.find(
    (cls) => cls.startsWith("language-") || cls.startsWith("lang-"),
  );

  return languageClass?.split("-")[1] || "bash";
};

export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  const elementDetails = getElementPropsAndContent(children);
  //     elementDetails.type,
  //     elementDetails.props,
  //     elementDetails.content,
  if (!elementDetails) return <pre>something is wrong</pre>;

  const { content, props } = elementDetails;
  return (
    <pre className="hljs relative rounded-2xl shadow dark:bg-black/30">
      <code
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(content as string, {
            language: getLanguageClass(props.className),
          }).value,
        }}
      ></code>
      <button className="absolute right-0 top-0" data-copy-content={content}>
        Copy
      </button>
    </pre>
  );
};

export const MarkdownLink = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  console.log(props);
  return (
    <a
      {...props}
      className="border-b-2 border-primary no-underline transition-colors hover:text-primary"
    >
      {children}
    </a>
  );
};
export function TypographyH1({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      {...props}
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    >
      {children}
    </h1>
  );
}
export function TypographyH2({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      {...props}
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    >
      {children}
    </h2>
  );
}
export function TypographyH3({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <h3
      {...props}
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      {children}
    </h3>
  );
}
export function TypographyH4({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <h4 {...props} className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      {...props}
      className="mb-10 text-lg leading-7 [&:not(:first-child)]:mt-6"
    >
      {children}
    </p>
  );
}
export function TypographyListItem({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <li {...props} className="text-lg leading-7">
      {children}
    </li>
  );
}
export function TypographyBlockquote({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote {...props} className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  );
}
export function TypographyUnorderedList({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children}
    </ul>
  );
}
export function TypographyOrderedList({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <ol {...props} className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {children}
    </ol>
  );
}
