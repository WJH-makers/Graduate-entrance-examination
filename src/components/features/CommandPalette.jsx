import React, { useEffect, useMemo, useState } from "react";
import { Command, Search, X, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";

const CommandPalette = ({ open, onClose, commands = [] }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose((v) => !v);
      }
      if (e.key === "Escape") onClose(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = useMemo(() => {
    if (!query) return commands;
    return commands.filter((c) =>
      c.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [commands, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onClose(false)} />
      <Card className="relative w-full max-w-2xl bg-slate-950/90 border-white/10 pointer-events-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white">
            <Command size={16} />
          </div>
          <div>
            <p className="text-sm text-white font-semibold">Command Palette</p>
            <p className="text-xs text-gray-400">按 Ctrl/⌘ + K 随时开启；Enter 执行，Esc 关闭</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white" onClick={() => onClose(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索命令：优化页面 / 跳转资讯 / 打开工作台 ..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30"
          />
        </div>

        <div className="max-h-60 overflow-auto space-y-2">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                c.action?.();
                onClose(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition flex items-center gap-2"
            >
              <ArrowRight size={14} className="text-cyan-300" />
              <div>
                <p className="text-sm text-white">{c.label}</p>
                {c.hint && <p className="text-xs text-gray-400">{c.hint}</p>}
              </div>
              {c.shortcut && (
                <span className="ml-auto text-[10px] text-gray-400 border border-white/10 rounded px-1.5 py-0.5">
                  {c.shortcut}
                </span>
              )}
            </button>
          ))}
          {!filtered.length && (
            <p className="text-xs text-gray-500 text-center py-3">没有匹配的命令</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommandPalette;
