export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          assigned_to: string | null
          attack_type: string
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          first_seen: string
          hit_count: number | null
          id: string
          ip: string
          isp: string | null
          last_seen: string
          lat: number | null
          lon: number | null
          rule_name: string
          score: number | null
          severity: Database["public"]["Enums"]["alert_severity"]
          status: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at: string
          username: string | null
        }
        Insert: {
          assigned_to?: string | null
          attack_type: string
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          first_seen?: string
          hit_count?: number | null
          id?: string
          ip: string
          isp?: string | null
          last_seen?: string
          lat?: number | null
          lon?: number | null
          rule_name: string
          score?: number | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          assigned_to?: string | null
          attack_type?: string
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          first_seen?: string
          hit_count?: number | null
          id?: string
          ip?: string
          isp?: string | null
          last_seen?: string
          lat?: number | null
          lon?: number | null
          rule_name?: string
          score?: number | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"]
          title?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      blocked_ips: {
        Row: {
          alert_id: string | null
          blocked_at: string
          blocked_by: string
          created_at: string
          expires_at: string | null
          id: string
          ip: string
          is_active: boolean
          reason: string | null
        }
        Insert: {
          alert_id?: string | null
          blocked_at?: string
          blocked_by?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          ip: string
          is_active?: boolean
          reason?: string | null
        }
        Update: {
          alert_id?: string | null
          blocked_at?: string
          blocked_by?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          ip?: string
          is_active?: boolean
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocked_ips_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      correlation_rules: {
        Row: {
          config: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          severity: Database["public"]["Enums"]["alert_severity"]
          threshold: number
          updated_at: string
          window_secs: number
        }
        Insert: {
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          threshold?: number
          updated_at?: string
          window_secs?: number
        }
        Update: {
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          threshold?: number
          updated_at?: string
          window_secs?: number
        }
        Relationships: []
      }
      login_events: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          ip: string
          lat: number | null
          lon: number | null
          raw_data: Json | null
          source: string
          success: boolean
          timestamp: string
          user_agent: string | null
          username: string
          wazuh_agent_id: string | null
          wazuh_rule_id: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip: string
          lat?: number | null
          lon?: number | null
          raw_data?: Json | null
          source: string
          success?: boolean
          timestamp?: string
          user_agent?: string | null
          username: string
          wazuh_agent_id?: string | null
          wazuh_rule_id?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip?: string
          lat?: number | null
          lon?: number | null
          raw_data?: Json | null
          source?: string
          success?: boolean
          timestamp?: string
          user_agent?: string | null
          username?: string
          wazuh_agent_id?: string | null
          wazuh_rule_id?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_status:
        | "new"
        | "acknowledged"
        | "investigating"
        | "resolved"
        | "false_positive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      alert_status: [
        "new",
        "acknowledged",
        "investigating",
        "resolved",
        "false_positive",
      ],
    },
  },
} as const
