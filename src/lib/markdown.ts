import { marked } from "marked";

export function md(text?: string | null): string {
  return text ? (marked.parse(text) as string) : "";
}

export function mdInline(text?: string | null): string {
  return text ? (marked.parseInline(text) as string) : "";
}
