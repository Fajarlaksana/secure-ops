import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alerts, type Alert } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Search, Filter, Eye, X, Clock, MapPin, User, Activity, MessageSquare } from "lucide-react";

const severityVariant: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-warning/10 text-warning/80 border-warning/20",
  low: "bg-success/15 text-success border-success/30",
};

const statusVariant: Record<string, string> = {
  new: "bg-info/15 text-info border-info/30",
  acknowledged: "bg-primary/15 text-primary border-primary/30",
  investigating: "bg-warning/15 text-warning border-warning/30",
  resolved: "bg-success/15 text-success border-success/30",
  false_positive: "bg-muted text-muted-foreground border-border",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = alerts.filter((a) => {
    if (filter !== "all" && a.severity !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.ip.includes(search)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground text-glow-primary flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" /> Alerts
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">{alerts.length} total alerts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-48"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {["all", "critical", "high", "medium", "low"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${
                filter === s ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Alert list */}
        <div className={`flex-1 space-y-2 ${selectedAlert ? "max-w-[55%]" : ""}`}>
          {filtered.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setSelectedAlert(alert)}
              className={`glass-card p-4 cursor-pointer hover:bg-muted/30 transition-all ${
                selectedAlert?.id === alert.id ? "ring-1 ring-primary/50 glow-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${severityVariant[alert.severity]} text-[8px] px-1.5 py-0`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge className={`${statusVariant[alert.status]} text-[8px] px-1.5 py-0`}>
                      {alert.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground">{alert.attackType}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground truncate">{alert.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-muted-foreground font-mono">{alert.ip}</span>
                    <span className="text-[10px] text-muted-foreground">{alert.country}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {timeAgo(alert.lastSeen)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-bold text-foreground">{alert.score}</span>
                  <span className="text-[9px] text-muted-foreground">Score</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investigation panel */}
        <AnimatePresence>
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "45%" }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="glass-card p-5 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">Investigation</h3>
                <button onClick={() => setSelectedAlert(null)} className="p-1 hover:bg-muted/50 rounded">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${severityVariant[selectedAlert.severity]} text-[9px]`}>
                      {selectedAlert.severity.toUpperCase()}
                    </Badge>
                    <Badge className={`${statusVariant[selectedAlert.status]} text-[9px]`}>
                      {selectedAlert.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">{selectedAlert.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">{selectedAlert.description}</p>
                </div>

                <div className="neon-line" />

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Activity, label: "Attack Type", value: selectedAlert.attackType },
                    { icon: User, label: "Username", value: selectedAlert.username },
                    { icon: MapPin, label: "Location", value: `${selectedAlert.city}, ${selectedAlert.country}` },
                    { icon: Eye, label: "ISP", value: selectedAlert.isp || "Unknown" },
                  ].map((item) => (
                    <div key={item.label} className="bg-muted/30 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <item.icon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-foreground font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-lg p-2.5">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Attacker IP</p>
                  <p className="text-sm font-mono font-bold text-foreground">{selectedAlert.ip}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Hit Count: {selectedAlert.hitCount} | Score: {selectedAlert.score}</p>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Timeline</h4>
                  <div className="space-y-2">
                    {[
                      { time: selectedAlert.firstSeen, label: "First seen", color: "bg-info" },
                      { time: selectedAlert.lastSeen, label: "Last seen", color: "bg-critical" },
                    ].map((t) => (
                      <div key={t.label} className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${t.color}`} />
                        <span className="text-[10px] text-muted-foreground">{t.label}</span>
                        <span className="text-[10px] text-foreground font-mono ml-auto">
                          {new Date(t.time).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="neon-line" />

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="text-[10px] h-7 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                    <Eye className="h-3 w-3 mr-1" /> Investigate
                  </Button>
                  <Button size="sm" className="text-[10px] h-7 bg-critical/20 text-critical hover:bg-critical/30 border border-critical/30">
                    Block IP
                  </Button>
                  <Button size="sm" className="text-[10px] h-7 bg-muted text-muted-foreground hover:bg-muted/80 border border-border">
                    Dismiss
                  </Button>
                </div>

                {/* Comment section */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Analyst Notes
                  </h4>
                  <textarea
                    placeholder="Add investigation notes..."
                    className="w-full bg-muted/30 rounded-lg p-2.5 text-[11px] text-foreground placeholder:text-muted-foreground border border-border/30 outline-none focus:ring-1 focus:ring-primary/50 resize-none h-20"
                  />
                  <Button size="sm" className="text-[10px] h-7 mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Add Note
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
