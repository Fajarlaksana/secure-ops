import { motion } from "framer-motion";
import { blockedIPs } from "@/data/mockData";
import { Lock, Unlock, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlockedIPsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground text-glow-primary flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" /> Blocked IPs
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">{blockedIPs.length} IPs currently blocked</p>
      </div>

      <div className="space-y-2">
        {blockedIPs.map((ip, i) => (
          <motion.div
            key={ip.ip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-critical/15 flex items-center justify-center">
                <Lock className="h-4 w-4 text-critical" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-foreground">{ip.ip}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{ip.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <Badge className={ip.isActive ? "bg-critical/15 text-critical border-critical/30 text-[8px]" : "bg-muted text-muted-foreground text-[8px]"}>
                  {ip.isActive ? "ACTIVE" : "EXPIRED"}
                </Badge>
                <p className="text-[9px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {new Date(ip.blockedAt).toLocaleDateString()}
                </p>
              </div>
              <Button size="sm" variant="outline" className="text-[10px] h-7 border-border/30 text-muted-foreground hover:text-foreground">
                <Unlock className="h-3 w-3 mr-1" /> Unblock
              </Button>
            </div>
          </motion.div>
        ))}

        {blockedIPs.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No blocked IPs</p>
          </div>
        )}
      </div>
    </div>
  );
}
