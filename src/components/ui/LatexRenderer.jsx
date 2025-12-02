import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * LatexRenderer component for rendering LaTeX formulas using KaTeX
 * Supports both inline and block display modes
 */
export const LatexRenderer = ({ latex, block = false, className = '' }) => {
    const [copied, setCopied] = React.useState(false);
    const [error, setError] = React.useState(null);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (!containerRef.current || !latex) return;

        try {
            katex.render(latex, containerRef.current, {
                throwOnError: false,
                displayMode: block,
                output: 'html',
                strict: false,
                trust: false,
                macros: {
                    "\\RR": "\\mathbb{R}",
                    "\\NN": "\\mathbb{N}",
                    "\\ZZ": "\\mathbb{Z}",
                    "\\QQ": "\\mathbb{Q}",
                }
            });
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('KaTeX rendering error:', err);
        }
    }, [latex, block]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(latex);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!latex) return null;

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                <span className="font-semibold">LaTeX Error:</span> {error}
            </div>
        );
    }

    return (
        <div className={cn(
            "relative group",
            block ? "my-4" : "inline-block",
            className
        )}>
            <div
                ref={containerRef}
                className={cn(
                    "latex-content select-text",
                    block && "p-4 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 rounded-lg border border-white/10 overflow-x-auto"
                )}
            />
            <button
                onClick={handleCopy}
                className={cn(
                    "absolute top-2 right-2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100",
                    "border border-white/10 hover:border-white/20"
                )}
                title="Copy LaTeX code"
            >
                {copied ? (
                    <Check size={14} className="text-green-400" />
                ) : (
                    <Copy size={14} className="text-gray-400" />
                )}
            </button>
        </div>
    );
};

/**
 * FormulaBlock component for displaying labeled formulas
 */
export const FormulaBlock = ({ label, latex, description }) => {
    return (
        <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl p-5 border border-white/10">
            {label && (
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full" />
                    <span className="text-sm font-semibold text-violet-300">{label}</span>
                </div>
            )}
            <LatexRenderer latex={latex} block={true} />
            {description && (
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{description}</p>
            )}
        </div>
    );
};
