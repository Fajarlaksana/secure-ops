import { motion } from "framer-motion";
import { useAlerts } from "@/hooks/useSupabaseData";
import { Globe, MapPin } from "lucide-react";

const severityColor: Record<string, string> = {
  critical: "bg-critical",
  high: "bg-warning",
  medium: "bg-warning/60",
  low: "bg-success",
};

const severityPulse: Record<string, string> = {
  critical: "animate-pulse",
  high: "animate-pulse-glow",
  medium: "",
  low: "",
};

function WorldMapDots() {
  const { data: alerts = [] } = useAlerts();

  const uniqueAlerts = alerts.reduce((acc, alert) => {
    const key = `${(alert.lat ?? 0).toFixed(0)}-${(alert.lon ?? 0).toFixed(0)}`;
    if (!acc.has(key)) acc.set(key, alert);
    return acc;
  }, new Map<string, typeof alerts[0]>());

  return (
    <div className="relative w-full h-[300px] bg-muted/20 rounded-lg overflow-hidden border border-border/20">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-primary" style={{ top: `${(i + 1) * 11}%` }} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-primary" style={{ left: `${(i + 1) * 8}%` }} />
        ))}
      </div>

      {Array.from(uniqueAlerts.values()).map((alert, i) => {
        const x = (((alert.lon ?? 0) + 180) / 360) * 100;
        const y = ((90 - (alert.lat ?? 0)) / 180) * 100;

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="absolute group cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`h-3 w-3 rounded-full ${severityColor[alert.severity]} ${severityPulse[alert.severity]} opacity-80`} />
            <div className={`absolute h-6 w-6 rounded-full ${severityColor[alert.severity]} opacity-20 -inset-1.5`} />

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="glass-card p-2.5 rounded-lg min-w-[160px] text-[10px]">
                <p className="font-semibold text-foreground">{alert.ip}</p>
                <p className="text-muted-foreground">{alert.city}, {alert.country}</p>
                <p className="text-muted-foreground">{alert.isp}</p>
                <div className="neon-line my-1.5" />
                <p className="text-muted-foreground">Type: <span className="text-foreground">{alert.attack_type}</span></p>
                <p className="text-muted-foreground">Hits: <span className="text-foreground">{alert.hit_count}</span></p>
              </div>
            </div>
          </motion.div>
        );
      })}

      <Globe className="absolute bottom-3 right-3 h-8 w-8 text-muted/30" />
    </div>
  );
}

export function ThreatMapWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <div>
            <h3 className="text-xs font-semibold text-foreground">Threat Map</h3>
            <p className="text-[10px] text-muted-foreground">Global attack origins</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {(["critical", "high", "medium", "low"] as const).map((s) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${severityColor[s]}`} />
              <span className="text-[9px] text-muted-foreground capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <WorldMapDots />
    </motion.div>
  );
}
