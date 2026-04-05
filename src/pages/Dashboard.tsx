import { ShieldAlert, ShieldCheck, AlertTriangle, Crosshair } from "lucide-react";
import { useDashboardStats } from "@/hooks/useSupabaseData";
import { StatCard } from "@/components/dashboard/StatCard";
import { LoginTrendChart } from "@/components/dashboard/LoginTrendChart";
import { SeverityChart } from "@/components/dashboard/SeverityChart";
import { ThreatMapWidget } from "@/components/dashboard/ThreatMapWidget";
import { ActiveThreats } from "@/components/dashboard/ActiveThreats";

export default function Dashboard() {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground text-glow-primary">Dashboard</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Login Attack Monitoring Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Failed Logins" value={isLoading ? 0 : stats.totalFailedLogins} icon={ShieldAlert} variant="critical" trend="+12% from yesterday" trendUp />
        <StatCard title="Successful Logins" value={isLoading ? 0 : stats.totalSuccessLogins} icon={ShieldCheck} variant="success" trend="-3% from yesterday" />
        <StatCard title="High Severity Alerts" value={isLoading ? 0 : stats.highSeverityAlerts} icon={AlertTriangle} variant="warning" trend="+5 new" trendUp />
        <StatCard title="Attacker IPs" value={isLoading ? 0 : stats.attackerIPs} icon={Crosshair} variant="info" trend="+8 new" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LoginTrendChart />
        </div>
        <SeverityChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ThreatMapWidget />
        </div>
        <ActiveThreats />
      </div>
    </div>
  );
}
