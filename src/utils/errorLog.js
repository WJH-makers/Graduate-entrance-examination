const STORAGE_KEY = "exam_error_log";
const MAX_ENTRIES = 200;

const loadLog = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Load error log failed", e);
    return [];
  }
};

const saveLog = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch (e) {
    console.warn("Save error log failed", e);
  }
};

const append = (entry) => {
  const log = loadLog();
  log.push(entry);
  saveLog(log);
};

export const initErrorLog = () => {
  const handler = (payload) => {
    const record = {
      ts: new Date().toISOString(),
      type: payload.type,
      message: payload.message || payload.reason?.message || "unknown",
      stack: payload.error?.stack || payload.reason?.stack || "",
      url: payload.filename || payload.reason?.fileName || window.location.href,
      userAgent: navigator.userAgent
    };
    append(record);
  };

  window.addEventListener(
    "error",
    (e) => handler({ ...e, type: "error" }),
    true
  );
  window.addEventListener(
    "unhandledrejection",
    (e) => handler({ ...e, type: "unhandledrejection" }),
    true
  );

  // expose helper for manual inspection
  window.__errorLog = {
    get: loadLog,
    clear: () => saveLog([])
  };
};
