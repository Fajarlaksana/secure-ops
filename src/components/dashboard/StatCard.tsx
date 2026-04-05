import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: "default" | "critical" | "success" | "warning" | "info";
}

const variantClasses = {
  default: "glow-primary",
  critical: "glow-critical",
  success: "glow-success",
  warning: "",
  info: "glow-secondary",
};

const iconClasses = {
  default: "bg-primary/15 text-primary",
  critical: "bg-critical/15 text-critical",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
};

export function StatCard({ title, value, icon: Icon, trend, trendUp, variant = "default" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card p-5 ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
          {trend && (
            <p className={`text-[10px] mt-1 ${trendUp ? "text-critical" : "text-success"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${iconClasses[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
