const buffer = [];
const MAX_EVENTS = 50;
let initialized = false;

const push = (type, payload) => {
  buffer.push({ type, payload, ts: Date.now() });
  if (buffer.length > MAX_EVENTS) buffer.shift();
};

const topBy = (key) => {
  const map = new Map();
  buffer.forEach((ev) => {
    const v = ev.payload?.[key];
    if (!v) return;
    map.set(v, (map.get(v) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, count }));
};

export const initUXSignals = () => {
  if (initialized) return;
  initialized = true;

  window.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (!target) return;
      const text = (target.innerText || "").slice(0, 30);
      const id =
        target.dataset?.track ||
        target.id ||
        target.getAttribute?.("aria-label") ||
        text;
      push("click", { id, text });
    },
    true
  );

  window.addEventListener(
    "scroll",
    () => {
      const doc = document.documentElement;
      const depth = Math.round(
        ((doc.scrollTop + doc.clientHeight) / doc.scrollHeight) * 100
      );
      push("scroll", { depth });
    },
    { passive: true }
  );

  window.addEventListener("error", (e) => {
    push("error", { message: e.message?.slice(0, 80) });
  });
};

export const getUXSnapshot = () => {
  const clicks = topBy("id");
  const avgDepth =
    buffer
      .filter((ev) => ev.type === "scroll")
      .reduce((sum, ev) => sum + (ev.payload?.depth || 0), 0) /
      (buffer.filter((ev) => ev.type === "scroll").length || 1);

  const errors = buffer.filter((ev) => ev.type === "error").length;

  return {
    clicks,
    avgDepth: Math.round(avgDepth || 0),
    errors,
    sample: buffer.slice(-10)
  };
};
