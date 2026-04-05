import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLoginTrendData } from "@/hooks/useSupabaseData";
import { motion } from "framer-motion";

export function LoginTrendChart() {
  const { trendData, isLoading } = useLoginTrendData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-foreground">Login Trend</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Failed vs Successful (24h)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-critical" />
            <span className="text-[10px] text-muted-foreground">Failed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="text-[10px] text-muted-foreground">Success</span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="h-[250px] flex items-center justify-center text-muted-foreground text-xs animate-pulse">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 16%)" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(220, 10%, 55%)" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 55%)" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 12%, 8%)",
                border: "1px solid hsl(240, 10%, 16%)",
                borderRadius: "8px",
                fontSize: "11px",
                fontFamily: "JetBrains Mono",
              }}
            />
            <Area type="monotone" dataKey="failed" stroke="hsl(0, 84%, 60%)" fill="url(#failedGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="success" stroke="hsl(142, 71%, 45%)" fill="url(#successGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
