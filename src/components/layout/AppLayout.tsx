import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, User } from "lucide-react";
import { useActiveThreats } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { data: activeThreats = [] } = useActiveThreats();
  const { user } = useAuth();
  const newAlertCount = activeThreats.filter((a) => a.status === "new").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/30 bg-card/40 backdrop-blur-sm px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events, IPs, users..."
                  className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                LIVE
              </div>
              <button className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
                {newAlertCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-critical text-[9px] text-critical-foreground flex items-center justify-center font-bold">
                    {newAlertCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="hidden md:block">
                  <p className="text-[11px] text-foreground font-medium">SOC Analyst</p>
                  <p className="text-[9px] text-muted-foreground">{user?.email ?? ""}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
