import { motion } from "framer-motion";
import { useActiveThreats } from "@/hooks/useSupabaseData";
import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const severityVariant: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-warning/10 text-warning/80 border-warning/20",
  low: "bg-success/15 text-success border-success/30",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function ActiveThreats() {
  const { data: activeThreats = [], isLoading } = useActiveThreats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-critical" />
        <h3 className="text-xs font-semibold text-foreground">Active Threats</h3>
        <Badge className="bg-critical/15 text-critical border-critical/30 text-[9px] ml-auto">
          {isLoading ? "..." : `${activeThreats.length} Active`}
        </Badge>
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto">
        {isLoading ? (
          <div className="text-muted-foreground text-xs animate-pulse text-center py-8">Loading...</div>
        ) : activeThreats.map((threat, i) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className={`h-2 w-2 rounded-full flex-shrink-0 ${threat.severity === "critical" ? "bg-critical animate-pulse" : threat.severity === "high" ? "bg-warning" : "bg-success"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground truncate">{threat.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-muted-foreground font-mono">{threat.ip}</span>
                <span className="text-[9px] text-muted-foreground">•</span>
                <span className="text-[9px] text-muted-foreground">{threat.country}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge className={`${severityVariant[threat.severity]} text-[8px] px-1.5 py-0`}>
                {threat.severity.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5" />
                {timeAgo(threat.last_seen)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
