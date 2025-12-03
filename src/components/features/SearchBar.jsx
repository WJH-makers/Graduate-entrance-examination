import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';

const SearchBar = ({ searchTerm, setSearchTerm, inputRef }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-16 z-20">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

      <Input
        ref={inputRef}
        icon={Search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="搜索考研资料 (例如: 数学, 408, 英语...)"
        className="py-4 text-lg bg-white border-slate-200 focus:border-cyan-500 shadow-xl"
        aria-label="搜索考研资料"
      />
    </div>
  );
};

export default SearchBar;
