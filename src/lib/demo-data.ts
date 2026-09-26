import type {
  AnalysisResult,
  AuditLog,
  CitizenRequest,
  DashboardOverview,
  DemandHotspot,
  ProjectOutcome,
  Recommendation,
  RequestUrgency,
} from "./types";

export const DEMO_BADGE = "Demo Environment • Synthetic Data";

export const DEMO_LANGUAGES = [
  "English",
  "Telugu",
  "Hindi",
  "Tamil",
  "Kannada",
  "Bengali",
  "Malayalam",
  "Marathi",
] as const;

export const DEMO_COUNTRIES = ["India", "Brazil", "Russia", "China", "South Africa"] as const;

const BROAD_REGIONS = [
  { country: "India", region: "Andhra Pradesh", district: "Example District", latitude: 17.4, longitude: 78.48 },
  { country: "India", region: "Telangana", district: "Medchal", latitude: 17.38, longitude: 78.48 },
  { country: "India", region: "Karnataka", district: "Hubballi", latitude: 15.36, longitude: 75.12 },
  { country: "India", region: "Tamil Nadu", district: "Villupuram", latitude: 11.93, longitude: 79.49 },
  { country: "India", region: "West Bengal", district: "Bankura", latitude: 23.25, longitude: 87.07 },
  { country: "India", region: "Maharashtra", district: "Nashik", latitude: 20.01, longitude: 73.79 },
  { country: "India", region: "Kerala", district: "Malappuram", latitude: 11.05, longitude: 76.07 },
  { country: "India", region: "Odisha", district: "Mayurbhanj", latitude: 21.93, longitude: 86.75 },
  { country: "Brazil", region: "Minas Gerais", district: "Belo Horizonte", latitude: -19.92, longitude: -43.93 },
  { country: "South Africa", region: "KwaZulu-Natal", district: "Durban", latitude: -29.86, longitude: 31.01 },
  { country: "Russia", region: "Volga", district: "Samara", latitude: 53.2, longitude: 50.15 },
  { country: "China", region: "Guangdong", district: "Shenzhen", latitude: 22.54, longitude: 114.06 },
] as const;

const CATEGORY_MAP: Record<string, { issue: string; sub: string; service: string; affected: string[]; keywords: string[] }> = {
  roads: {
    issue: "Damaged rural road",
    sub: "Rural road accessibility",
    service: "School transportation",
    affected: ["school children", "local residents"],
    keywords: ["damaged road", "rain", "school bus", "accessibility"],
  },
  water: {
    issue: "Water supply disruption",
    sub: "Water & sanitation access",
    service: "Community water access",
    affected: ["households", "women and children"],
    keywords: ["water scarcity", "leak", "service interruption", "sanitation"],
  },
  healthcare: {
    issue: "Healthcare access gap",
    sub: "Primary health service access",
    service: "Emergency medical access",
    affected: ["elderly residents", "pregnant women", "families"],
    keywords: ["clinic", "ambulance", "treatment delay", "healthcare"],
  },
  education: {
    issue: "School connectivity challenge",
    sub: "Educational access",
    service: "School transport",
    affected: ["students", "teachers"],
    keywords: ["school", "internet", "fare", "transport"],
  },
  digital: {
    issue: "Digital connectivity gap",
    sub: "Digital inclusion",
    service: "Public internet connectivity",
    affected: ["farmers", "small businesses", "students"],
    keywords: ["internet", "network", "mobile coverage", "digital access"],
  },
  sanitation: {
    issue: "Sanitation facility gap",
    sub: "Basic sanitation services",
    service: "Public sanitation",
    affected: ["school children", "women", "daily commuters"],
    keywords: ["toilet", "drainage", "clean water", "sanitation"],
  },
};

const SAMPLE_TEXTS = [
  "After rainfall, our village road is badly damaged and the school bus cannot safely reach the children.",
  "We are struggling with frequent water shortages and broken pipelines in our neighbourhood.",
  "The clinic is too far and emergency transport is not available when people need care.",
  "Students cannot attend digital learning sessions because the broadband connection is too weak.",
  "Drainage overflow is creating health risks around the school and market area.",
  "The public bus service is unreliable and older residents cannot reach essential services.",
  "Rural roads remain muddy for days after rain, making it difficult for ambulances to pass.",
  "Our community needs better sanitation and toilet access near the primary school.",
];

export const DEMO_REQUESTS: CitizenRequest[] = Array.from({ length: 160 }, (_, index) => {
  const regionData = BROAD_REGIONS[index % BROAD_REGIONS.length]!;
  const categoryKey = ["roads", "water", "healthcare", "education", "digital", "sanitation"][index % 6] as keyof typeof CATEGORY_MAP;
  const categoryMeta = (CATEGORY_MAP[categoryKey as keyof typeof CATEGORY_MAP] ?? CATEGORY_MAP["roads"]) as NonNullable<(typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]>;
  const urgency: RequestUrgency = ["Low", "Medium", "High", "Critical"][index % 4] as RequestUrgency;
  const base = SAMPLE_TEXTS[index % SAMPLE_TEXTS.length] ?? SAMPLE_TEXTS[0]!;
  const language = ["Telugu", "English", "Hindi", "Tamil", "Kannada", "Bengali"][index % 6] as CitizenRequest["language"];
  const date = new Date(2026, 7, 6 + (index % 18), (index * 3) % 18, (index * 7) % 60).toISOString();

  return {
    id: `req-${String(index + 1).padStart(4, "0")}`,
    user_id: `user-${(index + 1).toString().padStart(4, "0")}`,
    original_text: base,
    translated_text: base,
    language,
    category: categoryKey === "roads" ? "Roads & Transport" : categoryKey === "water" ? "Water & Sanitation" : categoryKey === "healthcare" ? "Healthcare" : categoryKey === "education" ? "Education" : categoryKey === "digital" ? "Digital Connectivity" : "Public Services",
    sub_category: categoryMeta.sub,
    issue_summary: categoryMeta.issue,
    location: regionData.district,
    latitude: Number((regionData.latitude + (index % 7) * 0.06).toFixed(4)),
    longitude: Number((regionData.longitude + (index % 5) * 0.04).toFixed(4)),
    urgency,
    affected_groups: categoryMeta.affected,
    keywords: categoryMeta.keywords,
    service_affected: categoryMeta.service,
    country: regionData.country,
    region: regionData.region,
    district: regionData.district,
    status: ["Analyzed", "Hotspot", "Recommendation", "Policy Review", "Implementation", "Impact Measured"][index % 6] ?? "Analyzed",
    created_at: date,
  };
});

export const DEMO_HOTSPOTS: DemandHotspot[] = [
  { id: "hotspot-01", name: "Rural Road Access", category: "Roads & Transport", region: "Andhra Pradesh", district: "Example District", center_latitude: 17.38, center_longitude: 78.46, request_count: 2430, population_affected: 2800, infrastructure_gap: 42, priority_score: 91, status: "Active" },
  { id: "hotspot-02", name: "School Access & Transport", category: "Education", region: "Telangana", district: "Medchal", center_latitude: 17.42, center_longitude: 78.51, request_count: 1820, population_affected: 2300, infrastructure_gap: 53, priority_score: 87, status: "Active" },
  { id: "hotspot-03", name: "Primary Healthcare Access", category: "Healthcare", region: "Tamil Nadu", district: "Villupuram", center_latitude: 11.94, center_longitude: 79.52, request_count: 2065, population_affected: 3300, infrastructure_gap: 56, priority_score: 88, status: "Monitoring" },
  { id: "hotspot-04", name: "Water Supply Reliability", category: "Water & Sanitation", region: "Karnataka", district: "Hubballi", center_latitude: 15.36, center_longitude: 75.12, request_count: 1715, population_affected: 2600, infrastructure_gap: 61, priority_score: 83, status: "Active" },
  { id: "hotspot-05", name: "Digital Inclusion", category: "Digital Connectivity", region: "West Bengal", district: "Bankura", center_latitude: 23.25, center_longitude: 87.07, request_count: 1450, population_affected: 2100, infrastructure_gap: 48, priority_score: 74, status: "Assessment" },
  { id: "hotspot-06", name: "Sanitation & Drainage", category: "Public Services", region: "Kerala", district: "Malappuram", center_latitude: 11.05, center_longitude: 76.07, request_count: 1870, population_affected: 2400, infrastructure_gap: 58, priority_score: 81, status: "Active" },
  { id: "hotspot-07", name: "Emergency Transport", category: "Healthcare", region: "Odisha", district: "Mayurbhanj", center_latitude: 21.93, center_longitude: 86.75, request_count: 1540, population_affected: 1700, infrastructure_gap: 49, priority_score: 78, status: "Monitoring" },
  { id: "hotspot-08", name: "Market Access Roads", category: "Roads & Transport", region: "Maharashtra", district: "Nashik", center_latitude: 20.01, center_longitude: 73.79, request_count: 1360, population_affected: 1950, infrastructure_gap: 44, priority_score: 72, status: "Review" },
];

export const DEMO_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-01",
    cluster_id: "hotspot-01",
    project_name: "Rural Road Accessibility Upgrade",
    category: "Roads & Transport",
    priority_score: 91,
    demand_score: 94,
    infrastructure_gap_score: 87,
    population_impact_score: 82,
    essential_service_score: 91,
    feasibility_score: 78,
    explanation: "Repeated flood-damaged road complaints indicate a persistent local access barrier affecting school transport and daily mobility.",
    evidence: ["2,430 similar citizen requests", "Low road accessibility index: 42/100", "Approximately 2,800 residents affected", "School transportation depends on this route", "No conflicting active investment project detected"],
    status: "Review",
    region: "Andhra Pradesh",
    district: "Example District",
    request_count: 2430,
    population_affected: 2800,
    created_at: "2026-09-25T08:00:00.000Z",
  },
  {
    id: "rec-02",
    cluster_id: "hotspot-02",
    project_name: "School Connectivity & Safety Upgrade",
    category: "Education",
    priority_score: 87,
    demand_score: 88,
    infrastructure_gap_score: 81,
    population_impact_score: 86,
    essential_service_score: 92,
    feasibility_score: 79,
    explanation: "School access and transport barriers appear in many student and family requests, especially in the final-mile connectivity gap.",
    evidence: ["1,820 similar requests", "School route reliability issue", "High dependence on safe transport", "Children affected across multiple villages"],
    status: "Planned",
    region: "Telangana",
    district: "Medchal",
    request_count: 1820,
    population_affected: 2300,
    created_at: "2026-09-23T10:00:00.000Z",
  },
  {
    id: "rec-03",
    cluster_id: "hotspot-03",
    project_name: "Primary Health Access Network",
    category: "Healthcare",
    priority_score: 88,
    demand_score: 90,
    infrastructure_gap_score: 84,
    population_impact_score: 85,
    essential_service_score: 94,
    feasibility_score: 72,
    explanation: "Healthcare access concerns cluster around transport and care availability issues affecting vulnerable populations.",
    evidence: ["2,065 related requests", "Weak healthcare access score: 56/100", "Elderly and pregnant populations affected", "Emergency response delay risk"],
    status: "Review",
    region: "Tamil Nadu",
    district: "Villupuram",
    request_count: 2065,
    population_affected: 3300,
    created_at: "2026-09-21T12:00:00.000Z",
  },
  {
    id: "rec-04",
    cluster_id: "hotspot-04",
    project_name: "Water Reliability & Pipeline Renewal",
    category: "Water & Sanitation",
    priority_score: 83,
    demand_score: 81,
    infrastructure_gap_score: 86,
    population_impact_score: 79,
    essential_service_score: 89,
    feasibility_score: 73,
    explanation: "A repeated pattern of water interruption and leakage suggests chronic service reliability issues across the community.",
    evidence: ["1,715 requests", "Water access score 61/100", "Regular service interruptions", "High household impact during dry spells"],
    status: "In Progress",
    region: "Karnataka",
    district: "Hubballi",
    request_count: 1715,
    population_affected: 2600,
    created_at: "2026-09-18T11:00:00.000Z",
  },
];

export const DEMO_PROJECT_OUTCOMES: ProjectOutcome[] = [
  { id: "out-01", project_id: "rec-01", metric_name: "Road accessibility", before_value: 42, after_value: 68, target_value: 75, measurement_date: "2026-09-26" },
  { id: "out-02", project_id: "rec-01", metric_name: "School access", before_value: 62, after_value: 92, target_value: 90, measurement_date: "2026-09-26" },
  { id: "out-03", project_id: "rec-01", metric_name: "Citizen satisfaction", before_value: 3.1, after_value: 4.6, target_value: 4.4, measurement_date: "2026-09-26" },
  { id: "out-04", project_id: "rec-02", metric_name: "Student commute time", before_value: 42, after_value: 25, target_value: 30, measurement_date: "2026-09-21" },
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  { id: "audit-01", user_id: "policy-user", action: "Recommendation generated", entity_type: "project_recommendations", entity_id: "rec-01", explanation: "Generated from 2,430 related citizen requests and demo infrastructure datasets.", created_at: "2026-09-25T08:10:00.000Z" },
  { id: "audit-02", user_id: "policy-user", action: "Status updated", entity_type: "project_recommendations", entity_id: "rec-01", explanation: "Human review required for a high-priority rural road access recommendation.", created_at: "2026-09-25T08:55:00.000Z" },
  { id: "audit-03", user_id: "analyst-user", action: "Data import", entity_type: "demographic_data", entity_id: "demo-sheet", explanation: "Synthetic demo dataset processed for regional infrastructure and population coverage.", created_at: "2026-09-24T08:00:00.000Z" },
];

const initialState = {
  requests: DEMO_REQUESTS,
  hotspots: DEMO_HOTSPOTS,
  recommendations: DEMO_RECOMMENDATIONS,
  outcomes: DEMO_PROJECT_OUTCOMES,
  audits: DEMO_AUDIT_LOGS,
};

function readLocalState() {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const raw = window.localStorage.getItem("civicpulse-demo-state");
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as typeof initialState;
    return {
      requests: Array.isArray(parsed.requests) ? parsed.requests : initialState.requests,
      hotspots: Array.isArray(parsed.hotspots) ? parsed.hotspots : initialState.hotspots,
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : initialState.recommendations,
      outcomes: Array.isArray(parsed.outcomes) ? parsed.outcomes : initialState.outcomes,
      audits: Array.isArray(parsed.audits) ? parsed.audits : initialState.audits,
    };
  } catch {
    return initialState;
  }
}

let state = readLocalState();

export function getDemoState() {
  state = readLocalState();
  return state;
}

export function setDemoState(nextState: Partial<typeof initialState>) {
  state = { ...readLocalState(), ...nextState };
  if (typeof window !== "undefined") {
    window.localStorage.setItem("civicpulse-demo-state", JSON.stringify(state));
  }
  return state;
}

export function analyzeCitizenText(text: string, language: string, location?: string): AnalysisResult {
  const normalized = text.toLowerCase();
  const categoryMap = [
    { key: "roads", match: ["road", "roadway", "bus", "rain", "school", "damaged", "village"] },
    { key: "water", match: ["water", "pipe", "leak", "sanitation", "drainage"] },
    { key: "healthcare", match: ["clinic", "hospital", "ambulance", "doctor", "health"] },
    { key: "education", match: ["school", "teacher", "classroom", "learning", "student"] },
    { key: "digital", match: ["internet", "wifi", "network", "online", "signal"] },
  ] as const;

  const matchedCategory = categoryMap.find(({ match }) => match.some((token) => normalized.includes(token))) ?? categoryMap[0];
  const categoryStyle = (CATEGORY_MAP[matchedCategory.key as keyof typeof CATEGORY_MAP] ?? CATEGORY_MAP["roads"]) as NonNullable<(typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]>;
  const issueLocation = location || "Example District";
  const urgency: RequestUrgency = normalized.includes("urgent") || normalized.includes("emergency") || normalized.includes("accident") ? "Critical" : normalized.includes("rain") || normalized.includes("school") ? "High" : "Medium";

  return {
    language: (language || "Telugu") as AnalysisResult["language"],
    translated_text: "After rainfall, the village road is severely damaged and the school bus cannot safely transport children.",
    issue: categoryStyle.issue,
    category: matchedCategory.key === "roads" ? "Roads & Transport" : matchedCategory.key === "water" ? "Water & Sanitation" : matchedCategory.key === "healthcare" ? "Healthcare" : matchedCategory.key === "education" ? "Education" : matchedCategory.key === "digital" ? "Digital Connectivity" : "Public Services",
    sub_category: categoryStyle.sub,
    location: issueLocation,
    service_affected: categoryStyle.service,
    urgency,
    affected_groups: categoryStyle.affected,
    keywords: categoryStyle.keywords,
    problem_summary: `${categoryStyle.issue} in ${issueLocation} is affecting residents and essential mobility services after local weather shocks.`,
    similar_issue_search_terms: [
      `${categoryStyle.issue.toLowerCase()} ${issueLocation.toLowerCase()}`,
      `${categoryStyle.service.toLowerCase()} access`,
    ],
    source: "Demo AI Simulation",
  };
}

export function createCitizenSubmission(input: { original_text: string; language: string; location?: string; user_id?: string }): CitizenRequest {
  const analysis = analyzeCitizenText(input.original_text, input.language, input.location);
  const id = `req-${Date.now().toString().slice(-6)}`;
  const request: CitizenRequest = {
    id,
    user_id: input.user_id || "citizen-demo",
    original_text: input.original_text,
    translated_text: analysis.translated_text,
    language: analysis.language,
    category: analysis.category,
    sub_category: analysis.sub_category,
    issue_summary: analysis.issue,
    location: analysis.location,
    latitude: 17.38,
    longitude: 78.46,
    urgency: analysis.urgency,
    affected_groups: analysis.affected_groups,
    keywords: analysis.keywords,
    service_affected: analysis.service_affected,
    country: "India",
    region: "Andhra Pradesh",
    district: "Example District",
    status: "Analyzed",
    created_at: new Date().toISOString(),
  };

  const next = getDemoState();
  setDemoState({ requests: [request, ...next.requests] });
  return request;
}

export function getDashboardOverview(): DashboardOverview {
  const state = getDemoState();
  return {
    totalRequests: state.requests.length + 12480,
    analyzedRequests: 12480,
    activeHotspots: state.hotspots.length + 126,
    highPriorityProjects: 8,
    populationAffected: 185000,
    projectsImplementation: 13,
  };
}

export function getRecommendationById(id: string) {
  const state = getDemoState();
  return state.recommendations.find((recommendation) => recommendation.id === id) ?? state.recommendations[0];
}

export function updateRecommendationStatus(id: string, status: Recommendation["status"]) {
  const state = getDemoState();
  const updated = state.recommendations.map((recommendation) =>
    recommendation.id === id ? { ...recommendation, status } : recommendation,
  );
  setDemoState({ recommendations: updated });

  const log: AuditLog = {
    id: `audit-${Date.now()}`,
    user_id: "policy-user",
    action: "Status updated",
    entity_type: "project_recommendations",
    entity_id: id,
    explanation: `Project status changed to ${status} by a human policymaker reviewer.`,
    created_at: new Date().toISOString(),
  };

  setDemoState({ audits: [log, ...readLocalState().audits] });
  return updated.find((item) => item.id === id) ?? updated[0];
}

export function getInsightsSummary() {
  return [
    "Citizen requests indicate a concentration of road-access concerns around several rural regions where infrastructure-access scores are relatively low.",
    "Healthcare demand remains highly clustered around emergency transport and late-night care access gaps.",
    "Water and sanitation demand is strongest in peri-urban areas with older infrastructure and dense household populations.",
  ];
}

export function importCsvRows(rows: Record<string, string>[]) {
  const state = getDemoState();
  const nextRequestCount = state.requests.length + rows.length;
  return {
    fileUploaded: "demo-import.csv",
    rowsDetected: rows.length,
    columnsDetected: Object.keys(rows[0] ?? {}).length,
    validation: "Passed synthetic demo validation",
    recordsImported: rows.length,
    errors: 0,
    summary: `${nextRequestCount} total records now available in the demo environment.`,
  };
}

export function getAuditTrail() {
  return getDemoState().audits;
}
