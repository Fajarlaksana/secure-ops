export interface LoginEvent {
  id: string;
  source: string;
  ip: string;
  username: string;
  success: boolean;
  timestamp: string;
  userAgent: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  wazuhRuleId?: number;
  wazuhAgentId?: string;
}

export interface Alert {
  id: string;
  ruleName: string;
  attackType: string;
  severity: "low" | "medium" | "high" | "critical";
  ip: string;
  username: string;
  title: string;
  description: string;
  status: "new" | "acknowledged" | "investigating" | "resolved" | "false_positive";
  assignedTo: string | null;
  score: number;
  country: string;
  city: string;
  lat: number;
  lon: number;
  firstSeen: string;
  lastSeen: string;
  hitCount: number;
  isp?: string;
}

export interface BlockedIP {
  ip: string;
  reason: string;
  blockedBy: string;
  alertId: string;
  blockedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

const attackTypes = ["Brute Force", "Credential Stuffing", "Password Spray", "Impossible Travel", "TOR Exit Node"];
const sources = ["Linux SSH", "Windows RDP", "Web Login", "Wazuh Agent", "Syslog"];
const severities: Alert["severity"][] = ["low", "medium", "high", "critical"];
const statuses: Alert["status"][] = ["new", "acknowledged", "investigating", "resolved", "false_positive"];
const usernames = ["admin", "root", "user", "test", "deploy", "jenkins", "backup", "ftp", "oracle", "postgres", "www-data", "nginx"];

const locations = [
  { country: "Russia", city: "Moscow", lat: 55.75, lon: 37.62, isp: "Rostelecom" },
  { country: "China", city: "Beijing", lat: 39.9, lon: 116.4, isp: "China Telecom" },
  { country: "Brazil", city: "São Paulo", lat: -23.55, lon: -46.63, isp: "Vivo" },
  { country: "Nigeria", city: "Lagos", lat: 6.45, lon: 3.4, isp: "MTN Nigeria" },
  { country: "Iran", city: "Tehran", lat: 35.69, lon: 51.39, isp: "TCI" },
  { country: "North Korea", city: "Pyongyang", lat: 39.02, lon: 125.75, isp: "Star JV" },
  { country: "Vietnam", city: "Hanoi", lat: 21.03, lon: 105.85, isp: "VNPT" },
  { country: "Ukraine", city: "Kyiv", lat: 50.45, lon: 30.52, isp: "Kyivstar" },
  { country: "India", city: "Mumbai", lat: 19.08, lon: 72.88, isp: "Airtel" },
  { country: "Romania", city: "Bucharest", lat: 44.43, lon: 26.1, isp: "RCS&RDS" },
  { country: "Turkey", city: "Istanbul", lat: 41.01, lon: 28.98, isp: "Turk Telekom" },
  { country: "Argentina", city: "Buenos Aires", lat: -34.6, lon: -58.38, isp: "Telecom Argentina" },
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomIP(): string {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600000).toISOString();
}

// Generate login events
export const loginEvents: LoginEvent[] = Array.from({ length: 200 }, (_, i) => {
  const loc = randomFrom(locations);
  return {
    id: `evt-${i.toString().padStart(4, "0")}`,
    source: randomFrom(sources),
    ip: randomIP(),
    username: randomFrom(usernames),
    success: Math.random() > 0.7,
    timestamp: hoursAgo(Math.random() * 72),
    userAgent: "Mozilla/5.0",
    country: loc.country,
    city: loc.city,
    lat: loc.lat + (Math.random() - 0.5) * 2,
    lon: loc.lon + (Math.random() - 0.5) * 2,
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

// Generate alerts
export const alerts: Alert[] = Array.from({ length: 35 }, (_, i) => {
  const loc = randomFrom(locations);
  const attackType = randomFrom(attackTypes);
  const severity = randomFrom(severities);
  const ip = randomIP();
  return {
    id: `alert-${i.toString().padStart(3, "0")}`,
    ruleName: `${attackType} Detection`,
    attackType,
    severity,
    ip,
    username: randomFrom(usernames),
    title: `${attackType} detected from ${ip}`,
    description: `Multiple failed login attempts detected from ${ip} (${loc.country}). Pattern consistent with ${attackType.toLowerCase()}.`,
    status: randomFrom(statuses),
    assignedTo: Math.random() > 0.5 ? randomFrom(["analyst1", "analyst2", "admin"]) : null,
    score: severity === "critical" ? 90 + Math.floor(Math.random() * 10) : severity === "high" ? 70 + Math.floor(Math.random() * 20) : severity === "medium" ? 40 + Math.floor(Math.random() * 30) : 10 + Math.floor(Math.random() * 30),
    country: loc.country,
    city: loc.city,
    lat: loc.lat,
    lon: loc.lon,
    firstSeen: hoursAgo(Math.random() * 48 + 24),
    lastSeen: hoursAgo(Math.random() * 24),
    hitCount: Math.floor(Math.random() * 500) + 5,
    isp: loc.isp,
  };
}).sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());

// Generate blocked IPs
export const blockedIPs: BlockedIP[] = alerts
  .filter((a) => a.severity === "critical" && Math.random() > 0.3)
  .map((a) => ({
    ip: a.ip,
    reason: `Auto-blocked: ${a.attackType}`,
    blockedBy: "system",
    alertId: a.id,
    blockedAt: a.lastSeen,
    expiresAt: null,
    isActive: true,
  }));

// Stats
export const dashboardStats = {
  totalFailedLogins: loginEvents.filter((e) => !e.success).length,
  totalSuccessLogins: loginEvents.filter((e) => e.success).length,
  highSeverityAlerts: alerts.filter((a) => a.severity === "high" || a.severity === "critical").length,
  attackerIPs: new Set(alerts.map((a) => a.ip)).size,
  blockedIPCount: blockedIPs.filter((b) => b.isActive).length,
};

// Login trend data (hourly for last 24h)
export const loginTrendData = Array.from({ length: 24 }, (_, i) => {
  const hour = 23 - i;
  const time = new Date(Date.now() - hour * 3600000);
  const label = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return {
    time: label,
    failed: Math.floor(Math.random() * 40) + 5,
    success: Math.floor(Math.random() * 20) + 2,
  };
});

// Severity distribution
export const severityDistribution = [
  { name: "Critical", value: alerts.filter((a) => a.severity === "critical").length, color: "hsl(0, 84%, 60%)" },
  { name: "High", value: alerts.filter((a) => a.severity === "high").length, color: "hsl(25, 95%, 53%)" },
  { name: "Medium", value: alerts.filter((a) => a.severity === "medium").length, color: "hsl(48, 96%, 53%)" },
  { name: "Low", value: alerts.filter((a) => a.severity === "low").length, color: "hsl(142, 71%, 45%)" },
];

// Active threats for the dashboard
export const activeThreats = alerts
  .filter((a) => a.status === "new" || a.status === "acknowledged" || a.status === "investigating")
  .slice(0, 8);
