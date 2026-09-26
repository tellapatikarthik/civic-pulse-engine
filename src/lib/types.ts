export type LanguageCode =
  | "English"
  | "Telugu"
  | "Hindi"
  | "Tamil"
  | "Kannada"
  | "Bengali"
  | "Malayalam"
  | "Marathi";

export type RequestUrgency = "Low" | "Medium" | "High" | "Critical";
export type RecommendationStatus =
  | "Review"
  | "Approved"
  | "Planned"
  | "In Progress"
  | "Implemented"
  | "Rejected";

export interface CitizenRequest {
  id: string;
  user_id: string;
  original_text: string;
  translated_text: string;
  language: LanguageCode;
  category: string;
  sub_category: string;
  issue_summary: string;
  location: string;
  latitude: number;
  longitude: number;
  urgency: RequestUrgency;
  affected_groups: string[];
  keywords: string[];
  service_affected: string;
  country: string;
  region: string;
  district: string;
  status: string;
  created_at: string;
}

export interface DemandHotspot {
  id: string;
  name: string;
  category: string;
  region: string;
  district: string;
  center_latitude: number;
  center_longitude: number;
  request_count: number;
  population_affected: number;
  infrastructure_gap: number;
  priority_score: number;
  status: string;
}

export interface Recommendation {
  id: string;
  cluster_id: string;
  project_name: string;
  category: string;
  priority_score: number;
  demand_score: number;
  infrastructure_gap_score: number;
  population_impact_score: number;
  essential_service_score: number;
  feasibility_score: number;
  explanation: string;
  evidence: string[];
  status: RecommendationStatus;
  region: string;
  district: string;
  request_count: number;
  population_affected: number;
  created_at: string;
}

export interface ProjectOutcome {
  id: string;
  project_id: string;
  metric_name: string;
  before_value: number;
  after_value: number;
  target_value: number;
  measurement_date: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  explanation: string;
  created_at: string;
}

export interface AnalysisResult {
  language: LanguageCode;
  translated_text: string;
  issue: string;
  category: string;
  sub_category: string;
  location: string;
  service_affected: string;
  urgency: RequestUrgency;
  affected_groups: string[];
  keywords: string[];
  problem_summary: string;
  similar_issue_search_terms: string[];
  source: "Gemini" | "Demo AI Simulation";
}

export interface DashboardOverview {
  totalRequests: number;
  analyzedRequests: number;
  activeHotspots: number;
  highPriorityProjects: number;
  populationAffected: number;
  projectsImplementation: number;
}
