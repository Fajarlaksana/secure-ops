import { motion } from "framer-motion";
import { useCorrelationRules } from "@/hooks/useSupabaseData";
import { Activity, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const severityColor: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-warning/10 text-warning/80 border-warning/20",
  low: "bg-success/15 text-success border-success/30",
};

export default function RulesPage() {
  const { data: rules = [], isLoading } = useCorrelationRules();

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground text-sm animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground text-glow-primary flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" /> Detection Rules
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Correlation rules for attack detection</p>
      </div>

      <div className="grid gap-3">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xs font-semibold text-foreground">{rule.name}</h3>
                  <Badge className={`${severityColor[rule.severity] ?? ""} text-[8px] px-1.5 py-0`}>
                    {rule.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{rule.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[9px] text-muted-foreground">Threshold: <span className="text-foreground">{rule.threshold}</span></span>
                  {rule.window_secs > 0 && (
                    <span className="text-[9px] text-muted-foreground">Window: <span className="text-foreground">{rule.window_secs}s</span></span>
                  )}
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${rule.is_active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                <ToggleRight className="h-3.5 w-3.5" />
                <span className="text-[9px] font-medium">{rule.is_active ? "Active" : "Disabled"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
