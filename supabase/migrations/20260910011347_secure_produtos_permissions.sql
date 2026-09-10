REVOKE ALL ON TABLE public.produtos FROM anon;

GRANT SELECT ON TABLE public.produtos TO anon;

ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
