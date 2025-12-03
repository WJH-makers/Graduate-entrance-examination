export const theme = {
  colors: {
    primary: '#0ea5e9',
    primaryStrong: '#0284c7',
    accent: '#f59e0b',
    surface: '#ffffff',
    surfaceMuted: '#f8fafc',
    border: 'rgba(148,163,184,0.25)',
    text: '#0f172a',
    textMuted: '#475569',
  },
  radii: {
    xs: 6,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 24,
    pill: 999,
  },
  shadows: {
    soft: '0 10px 30px rgba(15,23,42,0.08)',
    card: '0 18px 50px rgba(14,165,233,0.12)',
    subtle: '0 8px 20px rgba(0,0,0,0.04)',
    layer: '0 18px 60px rgba(15, 23, 42, 0.08)',
  },
  spacing: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    sectionY: '28px',
    sectionX: '20px',
    pageGutter: '24px',
  },
  typography: {
    fontSans:
      '"Manrope", "Inter", "SF Pro Display", -apple-system, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
    fontDisplay:
      '"Clash Display", "Manrope", "Inter", "SF Pro Display", -apple-system, system-ui, sans-serif',
    h1: 'clamp(32px, 4vw, 42px)',
    h2: 'clamp(22px, 3vw, 28px)',
    body: '16px',
    label: '12px',
  },
  layout: {
    pageWidth: '1200px',
    gridGap: '16px',
  },
}

export const sectionClasses =
  'bg-white border border-slate-200 rounded-2xl shadow-md shadow-slate-200/50'
