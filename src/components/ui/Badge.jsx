import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'default', className, ...props }) => {
    const variants = {
        default: 'bg-slate-100 text-slate-700 border-slate-200',
        primary: 'bg-blue-50 text-blue-700 border-blue-200',
        secondary: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        danger: 'bg-red-50 text-red-700 border-red-200',
        outline: 'border border-slate-300 text-slate-700 bg-white',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent transition-colors',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
