import React from 'react'
import { Star, TrendingUp, Activity } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * FrequencyBadge component for displaying exam frequency indicators
 * @param {number} frequency - Frequency rating (1-5)
 * @param {string[]} recentExams - Array of recent exam years
 * @param {boolean} showStars - Whether to show star rating
 */
export const FrequencyBadge = ({
  frequency = 3,
  recentExams = [],
  showStars = true,
  className = '',
}) => {
  const getFrequencyColor = (freq) => {
    if (freq >= 4) return 'from-red-500 to-orange-500'
    if (freq >= 3) return 'from-yellow-500 to-amber-500'
    return 'from-blue-500 to-cyan-500'
  }

  const getFrequencyLabel = (freq) => {
    if (freq >= 4) return '高频'
    if (freq >= 3) return '中频'
    return '低频'
  }

  const getFrequencyTextColor = (freq) => {
    if (freq >= 4) return 'text-red-300'
    if (freq >= 3) return 'text-yellow-300'
    return 'text-cyan-300'
  }

  return (
    <div className={cn('group relative', className)}>
      <div
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full',
          'bg-gradient-to-r',
          getFrequencyColor(frequency),
          'shadow-lg'
        )}
      >
        <Activity size={12} className="text-white" />
        <span className="text-xs font-bold text-white">{getFrequencyLabel(frequency)}</span>
        {showStars && (
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={cn(i < frequency ? 'text-white fill-white' : 'text-white/30')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {recentExams.length > 0 && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            'bg-gray-900 border border-white/20 rounded-lg p-3 shadow-xl',
            'whitespace-nowrap z-50 pointer-events-none'
          )}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp size={14} className={getFrequencyTextColor(frequency)} />
            <span className="text-xs font-semibold text-white">考频分析</span>
          </div>
          <div className="text-xs text-gray-300">
            <div className="mb-1">
              <span className="text-gray-400">频率等级：</span>
              <span className={cn('font-semibold ml-1', getFrequencyTextColor(frequency))}>
                {frequency}/5
              </span>
            </div>
            <div>
              <span className="text-gray-400">近年考察：</span>
              <span className="text-white ml-1">{recentExams.slice(0, 5).join(', ')}</span>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="w-2 h-2 bg-gray-900 border-b border-r border-white/20 rotate-45" />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * FrequencyIndicator - Simple frequency stars without badge
 */
export const FrequencyIndicator = ({ frequency = 3, size = 12 }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(i < frequency ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600')}
        />
      ))}
    </div>
  )
}
