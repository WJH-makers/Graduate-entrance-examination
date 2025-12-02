import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Loader2, Sparkles, EyeOff, RefreshCcw, Check, Undo2 } from "lucide-react";
import { useCodexChat } from "../../hooks/useCodexChat";
import { getUXSnapshot } from "../../utils/uxSignals";

const defaultContext = {
  route: "home",
  sections: ["Hero", "NewsBar", "Resources", "Knowledge", "AI Workbench"],
  theme: {
    accent: "cyan/purple neon grid",
    surface: "glass morphism"
  }
};

const extractJson = (text) => {
  if (!text) return null;
  const match = text.match(/```json\s*([\s\S]*?)```/i);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch (err) {
    console.warn("JSON parse failed", err);
    return null;
  }
};

const applyPreview = (diff, setUndo) => {
  if (!diff) return;
  const undo = [];
  (diff.styles || []).forEach(({ selector, styles }) => {
    if (!selector || !styles) return;
    document.querySelectorAll(selector).forEach((el) => {
      Object.entries(styles).forEach(([k, v]) => {
        const prev = el.style[k];
        undo.push(() => {
          el.style[k] = prev;
        });
        el.style[k] = v;
      });
    });
  });
  (diff.copy || []).forEach(({ selector, text }) => {
    if (!selector || text == null) return;
    document.querySelectorAll(selector).forEach((el) => {
      const prev = el.innerText;
      undo.push(() => {
        el.innerText = prev;
      });
      el.innerText = text;
    });
  });
  setUndo(() => () => undo.reverse().forEach((fn) => fn()));
};

const CodexPanel = ({ open, onClose }) => {
  const [customPrompt, setCustomPrompt] = useState("提升页面层次感、突出考研 400+ 行动提示");
  const [previewDiff, setPreviewDiff] = useState(null);
  const [undoPreview, setUndoPreview] = useState(null);
  const { send, loading, error } = useCodexChat([
    {
      role: "system",
      content: "Codex 会返回 rationale + JSON diff。"
    }
  ]);

  useEffect(() => {
    return () => {
      if (undoPreview) undoPreview();
    };
  }, [undoPreview]);

  const contextText = useMemo(() => {
    const ux = getUXSnapshot();
    return [
      `Route: ${defaultContext.route}`,
      `Sections: ${defaultContext.sections.join(", ")}`,
      `Theme: ${defaultContext.theme.accent} / ${defaultContext.theme.surface}`,
      `UX clicks: ${ux.clicks.map((c) => `${c.name || "anon"}x${c.count}`).join("; ") || "none"}`,
      `Scroll depth(avg): ${ux.avgDepth}%`,
      `Errors: ${ux.errors}`,
      `Recent events: ${ux.sample.length}`
    ].join("\n");
  }, []);

  const handleOptimize = async (mode) => {
    if (undoPreview) {
      undoPreview();
      setUndoPreview(null);
    }
    setPreviewDiff(null);
    const reply = await send({
      mode,
      content: [
        "页面上下文：",
        contextText,
        "请给出 rationale 和 JSON diff（copy/styles）。保持 5 项以内，小改动。",
        `额外需求：${customPrompt}`
      ].join("\n")
    });
    const parsed = extractJson(reply);
    if (parsed) {
      setPreviewDiff(parsed);
      applyPreview(parsed, setUndoPreview);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      <div className="absolute right-4 bottom-4 w-full max-w-xl pointer-events-auto animate-float-up">
        <Card className="bg-[#0b1224]/90 border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs text-cyan-300 uppercase tracking-[0.2em]">Codex</p>
                <h3 className="text-lg font-bold text-white">页面自优化助手</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <EyeOff size={16} className="mr-1" /> 收起
              </Button>
            </div>
          </div>

          <Tabs defaultValue="opt" className="space-y-3">
            <TabsList>
              <TabsTrigger value="opt">优化 UI</TabsTrigger>
              <TabsTrigger value="content">文案/提示</TabsTrigger>
            </TabsList>

            <TabsContent value="opt">
              <Textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="告诉 Codex 想要的感觉，例如：突出行动按钮、减少视觉噪点"
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => handleOptimize("optimize")} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Sparkles size={14} className="mr-2" />}
                  生成方案
                </Button>
                <Button variant="ghost" onClick={() => { if (undoPreview) undoPreview(); setUndoPreview(null); setPreviewDiff(null); }}>
                  <Undo2 size={14} className="mr-2" /> 撤销预览
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <Textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="例如：强化 400+ 行动 checklist、增加记忆口决"
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => handleOptimize("content")} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Sparkles size={14} className="mr-2" />}
                  生成文案
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {loading && (
            <p className="text-sm text-cyan-300 mt-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Codex 正在思考…
            </p>
          )}
          {error && <p className="text-sm text-red-300 mt-2">{error}</p>}

          {previewDiff && (
            <div className="mt-4 p-3 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-cyan-200 font-semibold">
                <Check size={14} /> 预览（已应用于当前页面，仅本地）
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Copy</p>
                {(previewDiff.copy || []).map((c, idx) => (
                  <div key={`c${idx}`} className="text-xs text-gray-200">
                    {c.selector} → “{c.text}”
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Styles</p>
                {(previewDiff.styles || []).map((s, idx) => (
                  <div key={`s${idx}`} className="text-xs text-gray-200">
                    {s.selector}: {Object.entries(s.styles || {})
                      .map(([k, v]) => `${k}: ${v}`)
                      .join("; ")}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <RefreshCcw size={12} /> 手动点击“撤销预览”可恢复
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CodexPanel;
