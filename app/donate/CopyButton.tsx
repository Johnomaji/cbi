"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy account number"
      title={copied ? "Copied!" : "Copy"}
      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/70 transition-colors text-slate-400 hover:text-cbi-blue"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-green-600" />
        : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
