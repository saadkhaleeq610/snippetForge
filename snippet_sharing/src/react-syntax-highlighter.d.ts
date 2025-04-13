// filepath: d:\GoLang\Snippet_Sharing\snippet_sharing\src\react-syntax-highlighter.d.ts
declare module "react-syntax-highlighter" {
  import * as React from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    showLineNumbers?: boolean;
    customStyle?: React.CSSProperties;
    lineNumberStyle?: React.CSSProperties | ((lineNumber: number) => React.CSSProperties);
    children?: React.ReactNode;
  }

  export class Prism extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const vscDarkPlus: any;
}