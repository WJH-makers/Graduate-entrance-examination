import { generateWithDeepSeek } from "./api";

const baseSystemPrompt = [
  "You are “Codex”, the built-in UX optimizer and study coach for this app.",
  "Constraints:",
  "- Propose only UI text and CSS tweaks; never run shell commands or mutate files.",
  "- Keep answers <= 200 words, return rationale + minimal diff.",
  "- Diff format JSON with keys copy (array) and styles (array).",
  "- Copy item: { selector, text }.",
  "- Style item: { selector, styles: { cssProperty: value } }.",
  "- Respect current neon-grid visual language; avoid heavy colors and big layout shifts.",
  "- If context is insufficient, ask for one clarifying fact instead of guessing."
].join("\n");

const modePrompts = {
  optimize:
    "Focus on readability, hierarchy, and conversion to study actions. Prefer small, testable changes.",
  content:
    "Improve instructional clarity and mnemonic strength. Keep technical accuracy; avoid hallucinating facts.",
  chat: "General assistant mode. Keep replies short and actionable."
};

/**
 * Chat with Codex persona
 * @param {{messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>, mode?: 'optimize' | 'content' | 'chat', temperature?: number}} params
 * @returns {Promise<string>}
 */
export const chatCodex = async ({
  messages,
  mode = "optimize",
  temperature = 0.55
}) => {
  const modeHint = modePrompts[mode] || modePrompts.optimize;
  const fullMessages = [
    { role: "system", content: `${baseSystemPrompt}\n${modeHint}` },
    ...messages
  ];
  return generateWithDeepSeek(fullMessages, temperature);
};
