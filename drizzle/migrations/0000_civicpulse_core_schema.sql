CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE public.app_role AS ENUM ('citizen', 'policymaker', 'analyst', 'admin');
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  name text NOT NULL,
  email text,
  language text NOT NULL DEFAULT 'English',
  country text NOT NULL DEFAULT 'India',
  region text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.request_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'India',
  region text NOT NULL,
  district text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  center_latitude double precision NOT NULL,
  center_longitude double precision NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  population_affected integer NOT NULL DEFAULT 0,
  infrastructure_gap integer NOT NULL DEFAULT 0,
  priority_score integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.request_clusters TO anon, authenticated;
GRANT ALL ON public.request_clusters TO service_role;
ALTER TABLE public.request_clusters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cluster demo data is readable" ON public.request_clusters FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.demographic_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'India',
  region text NOT NULL,
  population integer NOT NULL,
  population_density integer NOT NULL,
  children_population integer NOT NULL,
  elderly_population integer NOT NULL,
  vulnerable_population integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.demographic_data TO anon, authenticated;
GRANT ALL ON public.demographic_data TO service_role;
ALTER TABLE public.demographic_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Demographic demo data is readable" ON public.demographic_data FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.infrastructure_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'India',
  region text NOT NULL,
  road_access_index integer NOT NULL,
  healthcare_access_index integer NOT NULL,
  education_access_index integer NOT NULL,
  water_access_index integer NOT NULL,
  sanitation_index integer NOT NULL,
  digital_connectivity_index integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.infrastructure_data TO anon, authenticated;
GRANT ALL ON public.infrastructure_data TO service_role;
ALTER TABLE public.infrastructure_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Infrastructure demo data is readable" ON public.infrastructure_data FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.public_facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'India',
  name text NOT NULL,
  type text NOT NULL,
  region text NOT NULL,
  district text,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  accessibility_score integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.public_facilities TO anon, authenticated;
GRANT ALL ON public.public_facilities TO service_role;
ALTER TABLE public.public_facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Facility demo data is readable" ON public.public_facilities FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.investment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'India',
  project_name text NOT NULL,
  region text NOT NULL,
  category text NOT NULL,
  planned_budget numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'planned',
  start_date date,
  expected_completion date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.investment_plans TO anon, authenticated;
GRANT ALL ON public.investment_plans TO service_role;
ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Investment demo data is readable" ON public.investment_plans FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.citizen_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  country text NOT NULL DEFAULT 'India',
  region text,
  district text,
  original_text text NOT NULL,
  translated_text text,
  language text NOT NULL DEFAULT 'English',
  category text NOT NULL,
  sub_category text,
  location text,
  latitude double precision,
  longitude double precision,
  urgency text NOT NULL DEFAULT 'Medium',
  issue_summary text,
  affected_groups jsonb NOT NULL DEFAULT '[]'::jsonb,
  keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  service_affected text,
  status text NOT NULL DEFAULT 'analyzed',
  cluster_id uuid REFERENCES public.request_clusters(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.citizen_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.citizen_requests TO authenticated;
GRANT ALL ON public.citizen_requests TO service_role;
ALTER TABLE public.citizen_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anonymous requests may be submitted" ON public.citizen_requests FOR INSERT TO anon WITH CHECK (user_id IS NULL);
CREATE POLICY "Signed in citizens may read own requests" ON public.citizen_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Signed in citizens may submit own requests" ON public.citizen_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Signed in citizens may update own requests" ON public.citizen_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.project_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id uuid NOT NULL REFERENCES public.request_clusters(id),
  project_name text NOT NULL,
  category text NOT NULL,
  priority_score integer NOT NULL,
  demand_score integer NOT NULL,
  infrastructure_gap_score integer NOT NULL,
  population_impact_score integer NOT NULL,
  essential_service_score integer NOT NULL,
  feasibility_score integer NOT NULL,
  explanation text NOT NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'review',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_recommendations TO anon, authenticated;
GRANT ALL ON public.project_recommendations TO service_role;
ALTER TABLE public.project_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Recommendation demo data is readable" ON public.project_recommendations FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.project_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.project_recommendations(id),
  metric_name text NOT NULL,
  before_value numeric NOT NULL,
  after_value numeric NOT NULL,
  target_value numeric,
  measurement_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_outcomes TO anon, authenticated;
GRANT ALL ON public.project_outcomes TO service_role;
ALTER TABLE public.project_outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Outcome demo data is readable" ON public.project_outcomes FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  explanation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read audit records" ON public.audit_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can append audit records" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_clusters_country_region ON public.request_clusters(country, region);
CREATE INDEX idx_requests_created_at ON public.citizen_requests(created_at DESC);
CREATE INDEX idx_requests_country_region_category ON public.citizen_requests(country, region, category);
CREATE INDEX idx_requests_cluster_id ON public.citizen_requests(cluster_id);
CREATE INDEX idx_recommendations_priority ON public.project_recommendations(priority_score DESC);
CREATE INDEX idx_recommendations_cluster ON public.project_recommendations(cluster_id);
CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at DESC);