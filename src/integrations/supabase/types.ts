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
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          explanation: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          explanation?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          explanation?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      citizen_requests: {
        Row: {
          affected_groups: Json
          category: string
          cluster_id: string | null
          country: string
          created_at: string
          district: string | null
          id: string
          issue_summary: string | null
          keywords: Json
          language: string
          latitude: number | null
          location: string | null
          longitude: number | null
          original_text: string
          region: string | null
          service_affected: string | null
          status: string
          sub_category: string | null
          translated_text: string | null
          urgency: string
          user_id: string | null
        }
        Insert: {
          affected_groups?: Json
          category: string
          cluster_id?: string | null
          country?: string
          created_at?: string
          district?: string | null
          id?: string
          issue_summary?: string | null
          keywords?: Json
          language?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          original_text: string
          region?: string | null
          service_affected?: string | null
          status?: string
          sub_category?: string | null
          translated_text?: string | null
          urgency?: string
          user_id?: string | null
        }
        Update: {
          affected_groups?: Json
          category?: string
          cluster_id?: string | null
          country?: string
          created_at?: string
          district?: string | null
          id?: string
          issue_summary?: string | null
          keywords?: Json
          language?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          original_text?: string
          region?: string | null
          service_affected?: string | null
          status?: string
          sub_category?: string | null
          translated_text?: string | null
          urgency?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citizen_requests_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "request_clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      demographic_data: {
        Row: {
          children_population: number
          country: string
          created_at: string
          elderly_population: number
          id: string
          population: number
          population_density: number
          region: string
          vulnerable_population: number
        }
        Insert: {
          children_population: number
          country?: string
          created_at?: string
          elderly_population: number
          id?: string
          population: number
          population_density: number
          region: string
          vulnerable_population: number
        }
        Update: {
          children_population?: number
          country?: string
          created_at?: string
          elderly_population?: number
          id?: string
          population?: number
          population_density?: number
          region?: string
          vulnerable_population?: number
        }
        Relationships: []
      }
      infrastructure_data: {
        Row: {
          country: string
          created_at: string
          digital_connectivity_index: number
          education_access_index: number
          healthcare_access_index: number
          id: string
          region: string
          road_access_index: number
          sanitation_index: number
          water_access_index: number
        }
        Insert: {
          country?: string
          created_at?: string
          digital_connectivity_index: number
          education_access_index: number
          healthcare_access_index: number
          id?: string
          region: string
          road_access_index: number
          sanitation_index: number
          water_access_index: number
        }
        Update: {
          country?: string
          created_at?: string
          digital_connectivity_index?: number
          education_access_index?: number
          healthcare_access_index?: number
          id?: string
          region?: string
          road_access_index?: number
          sanitation_index?: number
          water_access_index?: number
        }
        Relationships: []
      }
      investment_plans: {
        Row: {
          category: string
          country: string
          created_at: string
          expected_completion: string | null
          id: string
          planned_budget: number
          project_name: string
          region: string
          start_date: string | null
          status: string
        }
        Insert: {
          category: string
          country?: string
          created_at?: string
          expected_completion?: string | null
          id?: string
          planned_budget?: number
          project_name: string
          region: string
          start_date?: string | null
          status?: string
        }
        Update: {
          category?: string
          country?: string
          created_at?: string
          expected_completion?: string | null
          id?: string
          planned_budget?: number
          project_name?: string
          region?: string
          start_date?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string
          created_at: string
          email: string | null
          id: string
          language: string
          name: string
          region: string | null
          user_id: string | null
        }
        Insert: {
          country?: string
          created_at?: string
          email?: string | null
          id?: string
          language?: string
          name: string
          region?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          email?: string | null
          id?: string
          language?: string
          name?: string
          region?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      project_outcomes: {
        Row: {
          after_value: number
          before_value: number
          created_at: string
          id: string
          measurement_date: string
          metric_name: string
          project_id: string
          target_value: number | null
        }
        Insert: {
          after_value: number
          before_value: number
          created_at?: string
          id?: string
          measurement_date?: string
          metric_name: string
          project_id: string
          target_value?: number | null
        }
        Update: {
          after_value?: number
          before_value?: number
          created_at?: string
          id?: string
          measurement_date?: string
          metric_name?: string
          project_id?: string
          target_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_outcomes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      project_recommendations: {
        Row: {
          category: string
          cluster_id: string
          created_at: string
          demand_score: number
          essential_service_score: number
          evidence: Json
          explanation: string
          feasibility_score: number
          id: string
          infrastructure_gap_score: number
          population_impact_score: number
          priority_score: number
          project_name: string
          status: string
        }
        Insert: {
          category: string
          cluster_id: string
          created_at?: string
          demand_score: number
          essential_service_score: number
          evidence?: Json
          explanation: string
          feasibility_score: number
          id?: string
          infrastructure_gap_score: number
          population_impact_score: number
          priority_score: number
          project_name: string
          status?: string
        }
        Update: {
          category?: string
          cluster_id?: string
          created_at?: string
          demand_score?: number
          essential_service_score?: number
          evidence?: Json
          explanation?: string
          feasibility_score?: number
          id?: string
          infrastructure_gap_score?: number
          population_impact_score?: number
          priority_score?: number
          project_name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_recommendations_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "request_clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      public_facilities: {
        Row: {
          accessibility_score: number
          country: string
          created_at: string
          district: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          region: string
          type: string
        }
        Insert: {
          accessibility_score: number
          country?: string
          created_at?: string
          district?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          region: string
          type: string
        }
        Update: {
          accessibility_score?: number
          country?: string
          created_at?: string
          district?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          region?: string
          type?: string
        }
        Relationships: []
      }
      request_clusters: {
        Row: {
          category: string
          center_latitude: number
          center_longitude: number
          country: string
          created_at: string
          district: string
          id: string
          infrastructure_gap: number
          name: string
          population_affected: number
          priority_score: number
          region: string
          request_count: number
          status: string
        }
        Insert: {
          category: string
          center_latitude: number
          center_longitude: number
          country?: string
          created_at?: string
          district: string
          id?: string
          infrastructure_gap?: number
          name: string
          population_affected?: number
          priority_score?: number
          region: string
          request_count?: number
          status?: string
        }
        Update: {
          category?: string
          center_latitude?: number
          center_longitude?: number
          country?: string
          created_at?: string
          district?: string
          id?: string
          infrastructure_gap?: number
          name?: string
          population_affected?: number
          priority_score?: number
          region?: string
          request_count?: number
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "citizen" | "policymaker" | "analyst" | "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["citizen", "policymaker", "analyst", "admin"],
    },
  },
} as const
