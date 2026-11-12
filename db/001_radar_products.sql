-- Radar de Agentes IA · esquema del catálogo de productos
-- Ejecutar en InsForge (SQL editor o POST /api/database/advance/rawsql/unrestricted).
-- La tabla legacy radar_agents no se toca.

CREATE TABLE IF NOT EXISTS public.radar_catalog_meta (
  id text PRIMARY KEY DEFAULT 'main',
  generated_at timestamptz NOT NULL DEFAULT now(),
  reference jsonb NOT NULL DEFAULT '{}'::jsonb,
  dimensions jsonb NOT NULL DEFAULT '[]'::jsonb,
  pillars jsonb NOT NULL DEFAULT '[]'::jsonb,
  tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  calibration jsonb NOT NULL DEFAULT '[]'::jsonb,
  limits jsonb NOT NULL DEFAULT '[]'::jsonb,
  excluded jsonb NOT NULL DEFAULT '[]'::jsonb,
  included text NOT NULL DEFAULT '',
  ranking_rule text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.radar_products (
  slug text PRIMARY KEY,
  name text NOT NULL,
  maker text NOT NULL,
  tagline text NOT NULL,
  summary text NOT NULL,
  description text NOT NULL,
  website text,
  repo text,
  docs text,
  category text NOT NULL,
  cat_label text NOT NULL,
  license_type text NOT NULL,
  license text,
  pricing text NOT NULL,
  price_label text NOT NULL,
  price_note text NOT NULL,
  setup text NOT NULL,
  setup_label text NOT NULL,
  maturity text NOT NULL,
  maturity_label text NOT NULL,
  platforms text[] NOT NULL DEFAULT '{}'::text[],
  models text NOT NULL DEFAULT '',
  channels text[] NOT NULL DEFAULT '{}'::text[],
  is_reference boolean NOT NULL DEFAULT false,
  kind text NOT NULL,
  total numeric(5,2) NOT NULL,
  tier text NOT NULL,
  agency integer NOT NULL,
  confidence integer NOT NULL,
  dimensions jsonb NOT NULL DEFAULT '{}'::jsonb,
  pillars jsonb NOT NULL DEFAULT '{}'::jsonb,
  strengths text[] NOT NULL DEFAULT '{}'::text[],
  weaknesses text[] NOT NULL DEFAULT '{}'::text[],
  comparison text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  reviewed_at date NOT NULL DEFAULT current_date,
  payload jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS radar_products_total_idx ON public.radar_products (total DESC);
CREATE INDEX IF NOT EXISTS radar_products_category_idx ON public.radar_products (category);
CREATE INDEX IF NOT EXISTS radar_products_license_idx ON public.radar_products (license_type);
CREATE INDEX IF NOT EXISTS radar_products_tier_idx ON public.radar_products (tier);

CREATE TABLE IF NOT EXISTS public.radar_product_sources (
  id bigserial PRIMARY KEY,
  product_slug text NOT NULL REFERENCES public.radar_products(slug) ON DELETE CASCADE,
  label text NOT NULL,
  url text NOT NULL,
  kind text NOT NULL DEFAULT 'official',
  checked_at date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_slug, url)
);
CREATE INDEX IF NOT EXISTS radar_product_sources_slug_idx ON public.radar_product_sources (product_slug);

CREATE TABLE IF NOT EXISTS public.radar_product_revisions (
  id bigserial PRIMARY KEY,
  product_slug text NOT NULL REFERENCES public.radar_products(slug) ON DELETE CASCADE,
  reviewed_at date NOT NULL DEFAULT current_date,
  total numeric(5,2) NOT NULL,
  tier text NOT NULL,
  agency integer NOT NULL,
  dimensions jsonb NOT NULL,
  pillars jsonb NOT NULL,
  notes text,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS radar_product_revisions_slug_idx ON public.radar_product_revisions (product_slug, reviewed_at DESC);

-- Cola de análisis: la llena el pipeline (Python, cron, edge function...).
CREATE TABLE IF NOT EXISTS public.radar_analysis_jobs (
  id bigserial PRIMARY KEY,
  product_slug text REFERENCES public.radar_products(slug) ON DELETE SET NULL,
  kind text NOT NULL DEFAULT 'review',
  status text NOT NULL DEFAULT 'queued',
  priority integer NOT NULL DEFAULT 0,
  model text,
  source_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  result jsonb,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz
);
CREATE INDEX IF NOT EXISTS radar_analysis_jobs_status_idx ON public.radar_analysis_jobs (status, priority DESC, created_at);
CREATE INDEX IF NOT EXISTS radar_analysis_jobs_product_idx ON public.radar_analysis_jobs (product_slug);

ALTER TABLE public.radar_catalog_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_product_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_product_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_analysis_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS radar_catalog_meta_read ON public.radar_catalog_meta;
CREATE POLICY radar_catalog_meta_read ON public.radar_catalog_meta
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS radar_products_read ON public.radar_products;
CREATE POLICY radar_products_read ON public.radar_products
  FOR SELECT TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS radar_product_sources_read ON public.radar_product_sources;
CREATE POLICY radar_product_sources_read ON public.radar_product_sources
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS radar_product_revisions_read ON public.radar_product_revisions;
CREATE POLICY radar_product_revisions_read ON public.radar_product_revisions
  FOR SELECT TO anon, authenticated USING (true);

-- Los jobs no son públicos: solo project_admin los lee/escribe.

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.radar_catalog_meta, public.radar_products,
  public.radar_product_sources, public.radar_product_revisions TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.radar_product_sources_id_seq TO anon, authenticated, project_admin;
GRANT USAGE, SELECT ON SEQUENCE public.radar_product_revisions_id_seq TO anon, authenticated, project_admin;
GRANT USAGE, SELECT ON SEQUENCE public.radar_analysis_jobs_id_seq TO project_admin;
