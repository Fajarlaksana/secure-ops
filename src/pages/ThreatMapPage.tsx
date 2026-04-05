import { ThreatMapWidget } from "@/components/dashboard/ThreatMapWidget";
import { Globe } from "lucide-react";

export default function ThreatMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground text-glow-primary flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" /> Threat Map
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Global view of attack origins</p>
      </div>
      <ThreatMapWidget />
    </div>
  );
}
