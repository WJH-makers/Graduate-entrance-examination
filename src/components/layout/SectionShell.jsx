import React from 'react'
import { sectionClasses } from '../../constants/theme'

const SectionShell = ({ title, description, badge, actions, children, className = '' }) => {
  return (
    <section className={`${sectionClasses} ${className}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-amber-400 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            {badge && (
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                {badge}
              </span>
            )}
          </div>
          {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}

export default SectionShell
