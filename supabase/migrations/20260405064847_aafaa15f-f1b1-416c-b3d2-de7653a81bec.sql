
-- Create severity enum
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create alert status enum
CREATE TYPE public.alert_status AS ENUM ('new', 'acknowledged', 'investigating', 'resolved', 'false_positive');

-- Create login_events table
CREATE TABLE public.login_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,
    ip TEXT NOT NULL,
    username TEXT NOT NULL,
    success BOOLEAN NOT NULL DEFAULT false,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_agent TEXT,
    country TEXT,
    city TEXT,
    lat DECIMAL,
    lon DECIMAL,
    wazuh_rule_id INT,
    wazuh_agent_id TEXT,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    rule_name TEXT NOT NULL,
    attack_type TEXT NOT NULL,
    severity alert_severity NOT NULL DEFAULT 'low',
    ip TEXT NOT NULL,
    username TEXT,
    title TEXT NOT NULL,
    description TEXT,
    status alert_status NOT NULL DEFAULT 'new',
    assigned_to TEXT,
    score INT DEFAULT 0,
    country TEXT,
    city TEXT,
    lat DECIMAL,
    lon DECIMAL,
    first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
    hit_count INT DEFAULT 1,
    isp TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create blocked_ips table
CREATE TABLE public.blocked_ips (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ip TEXT NOT NULL,
    reason TEXT,
    blocked_by TEXT NOT NULL DEFAULT 'system',
    alert_id UUID REFERENCES public.alerts(id) ON DELETE SET NULL,
    blocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create correlation_rules table
CREATE TABLE public.correlation_rules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    threshold INT NOT NULL DEFAULT 5,
    window_secs INT NOT NULL DEFAULT 300,
    severity alert_severity NOT NULL DEFAULT 'medium',
    config JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.correlation_rules ENABLE ROW LEVEL SECURITY;

-- RLS policies - authenticated users can read all data
CREATE POLICY "Authenticated users can view login events" ON public.login_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert login events" ON public.login_events FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view alerts" ON public.alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert alerts" ON public.alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update alerts" ON public.alerts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view blocked IPs" ON public.blocked_ips FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert blocked IPs" ON public.blocked_ips FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update blocked IPs" ON public.blocked_ips FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view rules" ON public.correlation_rules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert rules" ON public.correlation_rules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update rules" ON public.correlation_rules FOR UPDATE TO authenticated USING (true);

-- Create indexes for performance
CREATE INDEX idx_login_events_timestamp ON public.login_events(timestamp DESC);
CREATE INDEX idx_login_events_ip ON public.login_events(ip);
CREATE INDEX idx_alerts_severity ON public.alerts(severity);
CREATE INDEX idx_alerts_status ON public.alerts(status);
CREATE INDEX idx_alerts_last_seen ON public.alerts(last_seen DESC);
CREATE INDEX idx_blocked_ips_ip ON public.blocked_ips(ip);
CREATE INDEX idx_blocked_ips_active ON public.blocked_ips(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_correlation_rules_updated_at BEFORE UPDATE ON public.correlation_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
