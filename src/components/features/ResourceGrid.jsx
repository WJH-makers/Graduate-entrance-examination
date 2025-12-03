import React from 'react';
import { FileText, Download, ExternalLink, HardDrive } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const ResourceGrid = ({ resources }) => {
    if (resources.length === 0) {
        return (
            <div className="text-center py-32">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={48} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">未找到相关资料</h3>
                <p className="text-slate-500 text-lg">试着换个关键词，或者问问 AI 导师？</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
};

const ResourceCard = ({ resource }) => {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Math': return 'primary';
            case '408': return 'secondary';
            case 'English': return 'warning';
            case 'Politics': return 'danger';
            default: return 'default';
        }
    };

    return (
        <Card hover className="flex flex-col h-full group">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-slate-200">
                    <FileText size={24} className="text-slate-600 group-hover:text-slate-800" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge variant={getCategoryColor(resource.category)}>
                        {resource.category === 'Math' ? '数学一' :
                          resource.category === '408' ? '计算机408' :
                          resource.category === 'English' ? '英语一' :
                          resource.category === 'Politics' ? '政治' : resource.category}
                    </Badge>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <HardDrive size={10} />
                        {resource.size}
                    </span>
                </div>
            </div>

            <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                {resource.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-8 flex-1 content-start">
                {resource.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        #{tag}
                    </span>
                ))}
            </div>

            {resource.downloadUrl && resource.downloadUrl !== '#' && (
              <p className="text-[11px] text-slate-500 mb-3 font-mono break-all">直链：{resource.downloadUrl}</p>
            )}

            <div className="flex gap-3 mt-auto">
                <Button
                  className="flex-1"
                  variant="secondary"
                  size="sm"
                  disabled={!resource.downloadUrl || resource.downloadUrl === '#'}
                  title={resource.downloadUrl && resource.downloadUrl !== '#' ? '在新标签打开资源' : '链接待补充'}
                  onClick={() => {
                    if (resource.downloadUrl && resource.downloadUrl !== '#') {
                      window.open(resource.downloadUrl, '_blank', 'noreferrer');
                    }
                  }}
                >
                    <Download size={16} className="mr-2" />
                    {resource.downloadUrl && resource.downloadUrl !== '#' ? '下载/查看' : '待发布'}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl"
                  disabled={!resource.downloadUrl || resource.downloadUrl === '#'}
                  aria-label="打开资源链接"
                  title={resource.downloadUrl && resource.downloadUrl !== '#' ? '在新标签打开资源' : '链接待补充'}
                  onClick={() => {
                    if (resource.downloadUrl && resource.downloadUrl !== '#') {
                      window.open(resource.downloadUrl, '_blank', 'noreferrer');
                    }
                  }}
                >
                    <ExternalLink size={16} />
                </Button>
            </div>
        </Card>
    );
};

export default ResourceGrid;
