import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { severityDistribution } from "@/data/mockData";
import { motion } from "framer-motion";

export function SeverityChart() {
  const total = severityDistribution.reduce((sum, s) => sum + s.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-5"
    >
      <h3 className="text-xs font-semibold text-foreground mb-1">Severity Distribution</h3>
      <p className="text-[10px] text-muted-foreground mb-4">Alert severity breakdown</p>

      <div className="flex items-center">
        <ResponsiveContainer width="50%" height={180}>
          <PieChart>
            <Pie
              data={severityDistribution}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {severityDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 12%, 8%)",
                border: "1px solid hsl(240, 10%, 16%)",
                borderRadius: "8px",
                fontSize: "11px",
                fontFamily: "JetBrains Mono",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-3">
          {severityDistribution.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                <span className="text-[11px] text-muted-foreground">{s.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-foreground">{s.value}</span>
                <span className="text-[10px] text-muted-foreground ml-1">
                  ({total > 0 ? Math.round((s.value / total) * 100) : 0}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
