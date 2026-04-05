import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Alert = Tables<"alerts">;
export type LoginEvent = Tables<"login_events">;
export type BlockedIP = Tables<"blocked_ips">;
export type CorrelationRule = Tables<"correlation_rules">;

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("last_seen", { ascending: false });
      if (error) throw error;
      return data as Alert[];
    },
  });
}

export function useLoginEvents() {
  return useQuery({
    queryKey: ["login_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("login_events")
        .select("*")
        .order("timestamp", { ascending: false });
      if (error) throw error;
      return data as LoginEvent[];
    },
  });
}

export function useBlockedIPs() {
  return useQuery({
    queryKey: ["blocked_ips"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blocked_ips")
        .select("*")
        .order("blocked_at", { ascending: false });
      if (error) throw error;
      return data as BlockedIP[];
    },
  });
}

export function useCorrelationRules() {
  return useQuery({
    queryKey: ["correlation_rules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("correlation_rules")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as CorrelationRule[];
    },
  });
}

export function useDashboardStats() {
  const { data: loginEvents, isLoading: loadingEvents } = useLoginEvents();
  const { data: alerts, isLoading: loadingAlerts } = useAlerts();
  const { data: blockedIPs, isLoading: loadingBlocked } = useBlockedIPs();

  const stats = {
    totalFailedLogins: loginEvents?.filter((e) => !e.success).length ?? 0,
    totalSuccessLogins: loginEvents?.filter((e) => e.success).length ?? 0,
    highSeverityAlerts: alerts?.filter((a) => a.severity === "high" || a.severity === "critical").length ?? 0,
    attackerIPs: new Set(alerts?.map((a) => a.ip)).size,
    blockedIPCount: blockedIPs?.filter((b) => b.is_active).length ?? 0,
  };

  return { stats, isLoading: loadingEvents || loadingAlerts || loadingBlocked };
}

export function useLoginTrendData() {
  const { data: loginEvents, isLoading } = useLoginEvents();

  const trendData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i;
    const time = new Date(Date.now() - hour * 3600000);
    const label = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    const hourStart = new Date(Date.now() - (hour + 1) * 3600000);
    const hourEnd = new Date(Date.now() - hour * 3600000);

    const eventsInHour = loginEvents?.filter((e) => {
      const t = new Date(e.timestamp);
      return t >= hourStart && t < hourEnd;
    }) ?? [];

    return {
      time: label,
      failed: eventsInHour.filter((e) => !e.success).length,
      success: eventsInHour.filter((e) => e.success).length,
    };
  });

  return { trendData, isLoading };
}

export function useSeverityDistribution() {
  const { data: alerts, isLoading } = useAlerts();

  const distribution = [
    { name: "Critical", value: alerts?.filter((a) => a.severity === "critical").length ?? 0, color: "hsl(0, 84%, 60%)" },
    { name: "High", value: alerts?.filter((a) => a.severity === "high").length ?? 0, color: "hsl(25, 95%, 53%)" },
    { name: "Medium", value: alerts?.filter((a) => a.severity === "medium").length ?? 0, color: "hsl(48, 96%, 53%)" },
    { name: "Low", value: alerts?.filter((a) => a.severity === "low").length ?? 0, color: "hsl(142, 71%, 45%)" },
  ];

  return { distribution, isLoading };
}

export function useActiveThreats() {
  return useQuery({
    queryKey: ["active_threats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .in("status", ["new", "acknowledged", "investigating"])
        .order("last_seen", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as Alert[];
    },
  });
}

export function useUpdateAlertStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("alerts")
        .update({ status: status as Alert["status"] })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["active_threats"] });
    },
  });
}

export function useBlockIP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ip, reason, alertId }: { ip: string; reason: string; alertId?: string }) => {
      const { error } = await supabase
        .from("blocked_ips")
        .insert({ ip, reason, blocked_by: "analyst", alert_id: alertId ?? null, is_active: true });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked_ips"] });
    },
  });
}

export function useUnblockIP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blocked_ips")
        .update({ is_active: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked_ips"] });
    },
  });
}
