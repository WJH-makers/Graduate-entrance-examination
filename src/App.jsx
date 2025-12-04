import React, { useMemo, lazy, Suspense, useEffect, useRef } from 'react'
import CodexPanel from '@/components/features/CodexPanel'
import OptimizeButton from '@/components/features/OptimizeButton'
import CommandPalette from '@/components/features/CommandPalette'
import ParticleBackground from '@/components/features/ParticleBackground'
import CursorGlow from '@/components/features/CursorGlow'
import TopNavTabs from '@/components/layout/TopNavTabs'
import FloatingTools from '@/components/features/FloatingTools'
import { resources } from '@/data/resources'
import { useAppStore } from '@/store/useAppStore'
import HomePage from '@/pages/HomePage'

const PAGE_IDS = ['home', 'knowledge', 'plan', 'workbench']
const DEFAULT_PAGE = 'home'

// 懒加载非关键组件
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage'))
const PlanPage = lazy(() => import('@/pages/PlanPage'))
const WorkbenchPage = lazy(() => import('@/pages/WorkbenchPage'))
const AIChat = lazy(() => import('@/components/features/AIChat'))

function App() {
  const {
    searchTerm,
    setSearchTerm,
    codexOpen,
    setCodexOpen,
    paletteOpen,
    setPaletteOpen,
    activePage,
    setActivePage,
  } = useAppStore()
  const searchInputRef = useRef(null)

  // 资源筛选
  const filteredResources = useMemo(() => {
    if (!searchTerm) return resources
    const term = searchTerm.toLowerCase()
    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(term) ||
        resource.category.toLowerCase().includes(term) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(term))
    )
  }, [searchTerm])

  // 命令面板
  const commands = useMemo(
    () => [
      {
        id: 'open-codex',
        label: '打开 Codex 优化面板',
        hint: '获取页面微调方案',
        action: () => setCodexOpen(true),
        shortcut: 'Ctrl/Cmd + O',
      },
      { id: 'tab-home', label: '切换到 主页', action: () => setActivePage('home') },
      { id: 'tab-knowledge', label: '切换到 知识库', action: () => setActivePage('knowledge') },
      { id: 'tab-plan', label: '切换到 冲刺计划', action: () => setActivePage('plan') },
      { id: 'tab-workbench', label: '切换到 AI 工作台', action: () => setActivePage('workbench') },
    ],
    [setActivePage, setCodexOpen]
  )

  // 页面切换同步到 Hash，便于分享/刷新后保持状态
  useEffect(() => {
    const nextHash = `#${activePage || DEFAULT_PAGE}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
  }, [activePage])

  // 全局快捷键：/ 聚焦搜索；Cmd/Ctrl+O 打开 Codex；Cmd/Ctrl+数字 切换页签
  useEffect(() => {
    const handler = (e) => {
      const isTyping =
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !isTyping) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault()
        setCodexOpen(true)
      }
      if ((e.metaKey || e.ctrlKey) && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault()
        const map = {
          1: PAGE_IDS[0],
          2: PAGE_IDS[1],
          3: PAGE_IDS[2],
          4: PAGE_IDS[3],
        }
        setActivePage(map[e.key])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setActivePage, setCodexOpen])

  const scrollToSection = (id) => {
    if (activePage !== DEFAULT_PAGE) {
      setActivePage(DEFAULT_PAGE)
      // 等待页面切换完成后再滚动
      setTimeout(() => scrollToSection(id), 60)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 页面块
  const renderPage = () => {
    switch (activePage) {
      case 'knowledge':
        return (
          <Suspense fallback={<Loading />}>
            <KnowledgePage />
          </Suspense>
        )
      case 'plan':
        return (
          <Suspense fallback={<Loading />}>
            <PlanPage />
          </Suspense>
        )
      case 'workbench':
        return (
          <Suspense fallback={<Loading />}>
            <WorkbenchPage />
          </Suspense>
        )
      case 'home':
      default:
        return (
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchInputRef={searchInputRef}
            filteredResources={filteredResources}
          />
        )
    }
  }

  return (
    <>
      <ParticleBackground />
      <CursorGlow />
      <TopNavTabs activePage={activePage} onChange={setActivePage} />
      <main
        id="main-content"
        role="main"
        className="min-h-screen px-4 md:px-8 lg:px-16 pb-20 overflow-x-hidden relative page-shell"
      >
        <h1 className="sr-only">2026 考研资料站关键时间线与备考资源</h1>
        <div className="max-w-7xl mx-auto space-y-8">
          {renderPage()}
          <footer className="text-center text-slate-500 text-sm py-12 border-t border-slate-200 mt-8">
            <p className="mb-1">(c) 2025 考研资料站 | Designed for Excellence</p>
            <p className="text-xs text-slate-400">Powered by DeepSeek AI</p>
          </footer>
        </div>

        <Suspense fallback={null}>
          <AIChat />
        </Suspense>

        <OptimizeButton onClick={() => setCodexOpen(true)} />
        <CodexPanel open={codexOpen} onClose={() => setCodexOpen(false)} />
        <CommandPalette open={paletteOpen} onClose={setPaletteOpen} commands={commands} />
        <FloatingTools
          onCalendar={() => scrollToSection('timeline-board')}
          onReminder={() => scrollToSection('news')}
          onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </main>
    </>
  )
}

const Loading = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
)

export default App
