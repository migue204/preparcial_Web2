--
-- PostgreSQL database dump
--

-- Dumped from database version 16.16
-- Dumped by pg_dump version 17.0

-- Started on 2026-11-24 16:08:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16424)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16387)
-- Name: roles; Type: TABLE; Schema: public; Owner: preparcial
--

CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_name character varying(255) NOT NULL,
    description character varying(255)
);
ALTER TABLE ONLY public.roles ALTER COLUMN id SET (pg_attver=26616472);
ALTER TABLE ONLY public.roles ALTER COLUMN role_name SET (pg_attver=26616472);
ALTER TABLE ONLY public.roles ALTER COLUMN description SET (pg_attver=26616472);


ALTER TABLE public.roles OWNER TO preparcial;

--
-- TOC entry 218 (class 1259 OID 16409)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: preparcial
--

CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);
ALTER TABLE ONLY public.user_roles ALTER COLUMN user_id SET (pg_attver=26781952);
ALTER TABLE ONLY public.user_roles ALTER COLUMN role_id SET (pg_attver=26781952);


ALTER TABLE public.user_roles OWNER TO preparcial;

--
-- TOC entry 217 (class 1259 OID 16397)
-- Name: users; Type: TABLE; Schema: public; Owner: preparcial
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255),
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE ONLY public.users ALTER COLUMN id SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN email SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN password SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN name SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN phone SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN is_active SET (pg_attver=26736256);
ALTER TABLE ONLY public.users ALTER COLUMN created_at SET (pg_attver=26736256);


ALTER TABLE public.users OWNER TO preparcial;

--
-- TOC entry 3478 (class 0 OID 16387)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: preparcial
--

INSERT INTO public.roles VALUES ('8e959249-f359-4c26-8255-41e3f2159990', 'supervisor', 'Supervisa usuarios');
INSERT INTO public.roles VALUES ('f186fda5-9c3b-4dc3-8bc3-5580db5a45f2', 'admin', 'Administrador del sistema');


--
-- TOC entry 3480 (class 0 OID 16409)
-- Dependencies: 218
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: preparcial
--

INSERT INTO public.user_roles VALUES ('12422347-26a3-4b1a-9e60-5d0b44bdb520', 'f186fda5-9c3b-4dc3-8bc3-5580db5a45f2');
INSERT INTO public.user_roles VALUES ('12422347-26a3-4b1a-9e60-5d0b44bdb520', '8e959249-f359-4c26-8255-41e3f2159990');
INSERT INTO public.user_roles VALUES ('2fb9be94-2b1b-45d1-9a56-418ba801a93c', 'f186fda5-9c3b-4dc3-8bc3-5580db5a45f2');


--
-- TOC entry 3479 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: preparcial
--

INSERT INTO public.users VALUES ('12422347-26a3-4b1a-9e60-5d0b44bdb520', 'carlos@ejemplo.com', '$scrypt$ln=17,r=8,p=1$rAZTb+X/Xqr5ek2UwsKN5Q$F9V7H/pmZSGB25d9cDkomv/2Pu7xxKG0SpHIfQrHFHU', 'Carlos', '3001234567', true, '2026-11-24 15:42:14.020913');
INSERT INTO public.users VALUES ('8d3d608e-4666-46e4-93ae-0e8530417615', 'prueba1894811066@ejemplo.com', '$scrypt$ln=17,r=8,p=1$R7+E3XKwjEdpG5TqegZSDQ$IHCe9O5xfHd9UUm5c2D0P6+9IXuUyf91LYM50Bu7yfU', 'Usuario Prueba', NULL, true, '2026-11-24 16:11:13.930509');
INSERT INTO public.users VALUES ('2fb9be94-2b1b-45d1-9a56-418ba801a93c', 'admin@ejemplo.com', '$scrypt$ln=17,r=8,p=1$KXO2hTprRbHtnr/clfwlaQ$hGck5o9P+7B4xWNcmAh0Hv85SzmJ3vPi8el8IwbyfmA', 'Administrador', NULL, true, '2026-11-24 16:18:14.420078');


--
-- TOC entry 3324 (class 2606 OID 16394)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3326 (class 2606 OID 16396)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 3332 (class 2606 OID 16413)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 3328 (class 2606 OID 16408)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3330 (class 2606 OID 16406)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3333 (class 2606 OID 16419)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 3334 (class 2606 OID 16414)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: preparcial
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-11-24 16:08:55

--
-- PostgreSQL database dump complete
--

