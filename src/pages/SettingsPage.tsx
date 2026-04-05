import { Settings, Server, Database, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground text-glow-primary flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" /> Settings
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">System configuration</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { icon: Server, title: "Wazuh Integration", status: "Mock Mode", statusColor: "bg-warning/15 text-warning border-warning/30", desc: "Connect to Wazuh REST API for real-time log collection" },
          { icon: Database, title: "Database", status: "Mock Data", statusColor: "bg-info/15 text-info border-info/30", desc: "PostgreSQL connection for persistent event storage" },
          { icon: Shield, title: "Authentication", status: "Demo Mode", statusColor: "bg-primary/15 text-primary border-primary/30", desc: "JWT-based authentication system" },
          { icon: Server, title: "Redis Cache", status: "Not Connected", statusColor: "bg-muted text-muted-foreground border-border", desc: "Sliding window detection engine cache" },
        ].map((item) => (
          <div key={item.title} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge className={`${item.statusColor} text-[8px]`}>{item.status}</Badge>
            </div>
            <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
