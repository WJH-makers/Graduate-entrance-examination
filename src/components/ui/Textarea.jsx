import React from 'react';
import { cn } from '../../utils/cn';

export const Textarea = ({ className, ...props }) => (
    <textarea
        className={cn(
            'w-full rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 px-3 py-2 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30',
            className
        )}
        {...props}
    />
);

export default Textarea;
