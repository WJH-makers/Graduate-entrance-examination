import React, { useEffect, useRef } from 'react'

// 懒加载 mermaid，避免初始打包过大 & 动态依赖拉取失败时崩溃
let mermaidInstance = null

const initMermaid = async () => {
  if (mermaidInstance) return mermaidInstance
  const mermaid = (await import('mermaid')).default
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    maxEdges: 2000, // 避免 500 边上限
    flowchart: { htmlLabels: true, curve: 'basis' },
    themeVariables: {
      primaryColor: '#e0f2fe',
      primaryBorderColor: '#38bdf8',
      primaryTextColor: '#0f172a',
      lineColor: '#38bdf8',
      secondaryColor: '#f8fafc',
      tertiaryColor: '#ffffff',
    },
  })
  mermaidInstance = mermaid
  return mermaid
}

export const MermaidDiagram = ({ chart }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      if (!containerRef.current) return
      if (!chart || !chart.trim()) {
        containerRef.current.innerHTML = '<div class="text-slate-500 text-sm">暂无图谱</div>'
        return
      }

      try {
        const mermaid = await initMermaid()
        // 语法检查
        mermaid.parse(chart)
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`
        const { svg } = await mermaid.render(id, chart)
        if (!mounted || !containerRef.current) return
        if (svg && svg.includes('Syntax error')) {
          throw new Error('syntax')
        }
        containerRef.current.innerHTML = svg
      } catch (error) {
        console.error('Mermaid render error', error)
        if (!mounted || !containerRef.current) return
        const msg = error?.message?.includes('fetch dynamically imported module')
          ? '图谱依赖加载失败（可能是缓存/网络问题），建议硬刷新 Ctrl+F5 或使用列表视图。'
          : '知识图谱生成失败：请检查是否包含特殊符号，或改用列表视图。'
        containerRef.current.innerHTML = `<div class="text-red-500 text-sm p-4 border border-red-100 bg-red-50 rounded-lg">${msg}</div>`
      }
    }

    renderDiagram()
    return () => {
      mounted = false
    }
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto flex justify-center p-4 bg-white rounded-xl border border-slate-200"
    />
  )
}
