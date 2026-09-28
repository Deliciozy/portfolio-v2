import type {
    ReactNode,
  } from "react";
  
  import "./resume.css";
  
  type ResumeLayoutProps = {
    children:
      ReactNode;
  };
  
  export default function ResumeLayout({
    children,
  }: ResumeLayoutProps) {
    return children;
  }