import React from "react";
import { Flame, Activity, BarChart3 } from "lucide-react";
import { Card } from "../ui/Card";
import { Sparkline } from "../ui/Sparkline";

const cards = [
  {
    title: "资讯热度 (近7天)",
    icon: Flame,
    color: "#22d3ee",
    data: [32, 48, 60, 54, 72, 80, 96],
    note: "招生/调剂搜索量上升"
  },
  {
    title: "数学冲刺完成度",
    icon: Activity,
    color: "#a855f7",
    data: [40, 44, 50, 58, 65, 70, 78],
    note: "模考卷批次 +8%"
  },
  {
    title: "408 高频考点覆盖",
    icon: BarChart3,
    color: "#f59e0b",
    data: [52, 55, 57, 63, 66, 71, 75],
    note: "协议/存储管理覆盖提速"
  }
];

const TrendWidget = () => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((item) => (
        <Card
          key={item.title}
          hover
          className="p-4 bg-white/5 border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <item.icon size={16} className="text-cyan-200" />
              {item.title}
            </div>
            <span className="text-[10px] text-gray-400">实时微趋势</span>
          </div>
          <Sparkline data={item.data} stroke={item.color} />
          <p className="text-xs text-gray-400 mt-2">{item.note}</p>
        </Card>
      ))}
    </div>
  );
};

export default TrendWidget;
