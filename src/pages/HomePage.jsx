import React from 'react'
import Hero from '@/components/features/Hero'
import SearchBar from '@/components/features/SearchBar'
import ResourceGrid from '@/components/features/ResourceGrid'
import NewsBar from '@/components/features/NewsBar'
import TrendWidget from '@/components/features/TrendWidget'
import ExamTimeline from '@/components/features/ExamTimeline'
import SourceBoard from '@/components/features/SourceBoard'
import KeywordGrid from '@/components/features/KeywordGrid'
import RuleAccordion from '@/components/features/RuleAccordion'
import SectionShell from '@/components/layout/SectionShell'

const HomePage = ({ searchTerm, setSearchTerm, searchInputRef, filteredResources }) => {
  return (
    <>
      <Hero />

      <SectionShell
        id="timeline-board"
        title="关键时间线与规则速览"
        badge="时间 / 规则 / 热词"
        description="报名、确认、初试节点与阅卷规则一屏掌握"
        className="shadow-lg shadow-slate-200/60"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <ExamTimeline />
            <SourceBoard />
          </div>
          <div className="space-y-4">
            <KeywordGrid />
            <RuleAccordion />
          </div>
        </div>
      </SectionShell>

      <SectionShell
        title="快速检索"
        badge="搜索资源"
        description="输入关键词，快速筛选资料与节点"
        className="bg-white/95"
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          inputRef={searchInputRef}
        />
      </SectionShell>

      <SectionShell title="考研资讯快报" badge="自动汇总" id="news">
        <NewsBar />
      </SectionShell>

      <SectionShell title="趋势洞察" badge="近 7 日">
        <TrendWidget />
      </SectionShell>

      <SectionShell
        id="resources"
        title="精选资料"
        description="按热度、标签与类别快速过滤"
        actions={
          <span className="text-slate-600 text-sm bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            共 {filteredResources.length} 个资源
          </span>
        }
      >
        <ResourceGrid resources={filteredResources} />
      </SectionShell>
    </>
  )
}

export default HomePage
