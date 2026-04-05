import { motion } from "framer-motion";
import { Activity, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const rules = [
  { name: "Brute Force Detection", description: "Detect >10 failed logins from same IP within 5 minutes", threshold: 10, windowSecs: 300, severity: "high", isActive: true },
  { name: "Credential Stuffing", description: "Detect >20 unique usernames from same IP within 10 minutes", threshold: 20, windowSecs: 600, severity: "critical", isActive: true },
  { name: "Password Spray", description: "Detect same password used across >5 usernames within 15 minutes", threshold: 5, windowSecs: 900, severity: "high", isActive: true },
  { name: "Impossible Travel", description: "Detect logins from geographically distant locations within short time", threshold: 2, windowSecs: 3600, severity: "critical", isActive: false },
  { name: "TOR Exit Node", description: "Detect login attempts from known TOR exit nodes", threshold: 1, windowSecs: 0, severity: "medium", isActive: true },
  { name: "Known Bad IP", description: "Detect login attempts from threat intelligence IP lists", threshold: 1, windowSecs: 0, severity: "high", isActive: true },
];

const severityColor: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-warning/10 text-warning/80 border-warning/20",
};

export default function RulesPage() {
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
            key={rule.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xs font-semibold text-foreground">{rule.name}</h3>
                  <Badge className={`${severityColor[rule.severity]} text-[8px] px-1.5 py-0`}>
                    {rule.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{rule.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[9px] text-muted-foreground">Threshold: <span className="text-foreground">{rule.threshold}</span></span>
                  {rule.windowSecs > 0 && (
                    <span className="text-[9px] text-muted-foreground">Window: <span className="text-foreground">{rule.windowSecs}s</span></span>
                  )}
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${rule.isActive ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                <ToggleRight className="h-3.5 w-3.5" />
                <span className="text-[9px] font-medium">{rule.isActive ? "Active" : "Disabled"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
