import React, { useState, useMemo, lazy, Suspense } from 'react';
import Hero from './components/features/Hero';
import SearchBar from './components/features/SearchBar';
import ResourceGrid from './components/features/ResourceGrid';
import NewsBar from './components/features/NewsBar';
import TrendWidget from './components/features/TrendWidget';
import CodexPanel from './components/features/CodexPanel';
import OptimizeButton from './components/features/OptimizeButton';
import CommandPalette from './components/features/CommandPalette';
import ParticleBackground from './components/features/ParticleBackground';
import CursorGlow from './components/features/CursorGlow';
import { resources } from './data/resources';
import { AppProvider } from './context/AppContext';
import HotExamSection from './components/features/HotExamSection';
import TopNavTabs from './components/layout/TopNavTabs';
import ExamTimeline from './components/features/ExamTimeline';
import SourceBoard from './components/features/SourceBoard';
import KeywordGrid from './components/features/KeywordGrid';
import RuleAccordion from './components/features/RuleAccordion';
import FloatingTools from './components/features/FloatingTools';

// 懒加载非关键组件
const StudyPlan = lazy(() => import('./components/features/StudyPlan'));
const KnowledgeSection = lazy(() => import('./components/features/KnowledgeSection'));
const AIChat = lazy(() => import('./components/features/AIChat'));
const AIWorkbench = lazy(() => import('./components/features/AIWorkbench'));

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [codexOpen, setCodexOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); // home | knowledge | plan | workbench

  // 资源筛选
  const filteredResources = useMemo(() => {
    if (!searchTerm) return resources;
    const term = searchTerm.toLowerCase();
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(term) ||
      resource.category.toLowerCase().includes(term) ||
      resource.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  // 命令面板
  const commands = useMemo(() => [
    { id: 'open-codex', label: '打开 Codex 优化面板', hint: '获取页面微调方案', action: () => setCodexOpen(true), shortcut: 'Ctrl/Cmd + O' },
    { id: 'tab-home', label: '切换到 主页', action: () => setActivePage('home') },
    { id: 'tab-knowledge', label: '切换到 知识库', action: () => setActivePage('knowledge') },
    { id: 'tab-plan', label: '切换到 冲刺计划', action: () => setActivePage('plan') },
    { id: 'tab-workbench', label: '切换到 AI 工作台', action: () => setActivePage('workbench') },
  ], []);

  // 页面块
  const renderPage = () => {
    switch (activePage) {
      case 'knowledge':
        return (
          <Suspense fallback={<Loading />}>
            <div id="knowledge">
              <KnowledgeSection />
            </div>
          </Suspense>
        );
      case 'plan':
        return (
          <Suspense fallback={<Loading />}>
            <div id="study-plan">
              <StudyPlan />
            </div>
          </Suspense>
        );
      case 'workbench':
        return (
          <Suspense fallback={<Loading />}>
            <div id="workbench">
              <AIWorkbench />
            </div>
          </Suspense>
        );
      case 'home':
      default:
        return (
          <>
            <div className="mb-10" id="timeline-board">
              <ExamTimeline />
              <SourceBoard />
              <KeywordGrid />
              <RuleAccordion />
            </div>
            <Hero />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="mb-8" id="news">
              <NewsBar />
            </div>
            <div className="mb-8" id="hot-exam">
              <HotExamSection />
            </div>
            <div className="mb-10">
              <TrendWidget />
            </div>
            <div className="mb-14" id="resources">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                  精选资料
                </h2>
                <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  共 {filteredResources.length} 个资源
                </span>
              </div>
              <ResourceGrid resources={filteredResources} />
            </div>
          </>
        );
    }
  };

  return (
    <AppProvider>
      <ParticleBackground />
      <CursorGlow />
      <TopNavTabs activePage={activePage} onChange={setActivePage} />
      <div className="min-h-screen px-4 md:px-8 lg:px-16 pb-20 overflow-x-hidden relative">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
          <footer className="text-center text-slate-500 text-sm py-12 border-t border-slate-200 mt-16">
            <p className="mb-1">© 2025 考研资料站 | Designed for Excellence</p>
            <p className="text-xs text-slate-400">Powered by DeepSeek AI</p>
          </footer>
        </div>

        <Suspense fallback={null}>
          <AIChat />
        </Suspense>

        <OptimizeButton onClick={() => setCodexOpen(true)} />
        <CodexPanel open={codexOpen} onClose={() => setCodexOpen(false)} />
        <CommandPalette open={paletteOpen} onClose={setPaletteOpen} commands={commands} />
        <FloatingTools onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </AppProvider>
  );
}

const Loading = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

export default App;
