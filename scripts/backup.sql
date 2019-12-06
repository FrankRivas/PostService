--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.6

-- Started on 2019-12-05 18:18:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2877 (class 1262 OID 16394)
-- Name: posts; Type: DATABASE; Schema: -; Owner: frank
--

CREATE DATABASE posts WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_El Salvador.1252' LC_CTYPE = 'Spanish_El Salvador.1252';


ALTER DATABASE posts OWNER TO frank;

\connect posts

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 204 (class 1259 OID 16452)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    comment character varying(512) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    id_post integer NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16450)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 203
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- TOC entry 199 (class 1259 OID 16407)
-- Name: post; Type: TABLE; Schema: public; Owner: frank
--

CREATE TABLE public.post (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    content character varying(2048) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    id_user integer NOT NULL
);


ALTER TABLE public.post OWNER TO frank;

--
-- TOC entry 198 (class 1259 OID 16405)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: frank
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO frank;

--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 198
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frank
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- TOC entry 200 (class 1259 OID 16418)
-- Name: post_tag; Type: TABLE; Schema: public; Owner: frank
--

CREATE TABLE public.post_tag (
    id_tag integer NOT NULL,
    id_post integer NOT NULL
);


ALTER TABLE public.post_tag OWNER TO frank;

--
-- TOC entry 197 (class 1259 OID 16397)
-- Name: tag; Type: TABLE; Schema: public; Owner: frank
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying(25) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.tag OWNER TO frank;

--
-- TOC entry 196 (class 1259 OID 16395)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: frank
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO frank;

--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 196
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frank
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- TOC entry 202 (class 1259 OID 16435)
-- Name: user; Type: TABLE; Schema: public; Owner: frank
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(30) NOT NULL,
    image character varying(128),
    last_login timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public."user" OWNER TO frank;

--
-- TOC entry 201 (class 1259 OID 16433)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: frank
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO frank;

--
-- TOC entry 2881 (class 0 OID 0)
-- Dependencies: 201
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frank
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2718 (class 2604 OID 16455)
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 16410)
-- Name: post id; Type: DEFAULT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 2709 (class 2604 OID 16400)
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- TOC entry 2715 (class 2604 OID 16438)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2871 (class 0 OID 16452)
-- Dependencies: 204
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, comment, user_id, created_at, updated_at, id_post) FROM stdin;
3	Good Post	2	2019-12-05 08:58:58.350645-06	2019-12-05 08:58:58.350645-06	6
15	Another good one. thanks	2	2019-12-05 18:02:14.141685-06	2019-12-05 18:02:14.141685-06	6
2	good one bud. thank you bro i really apreciate this words	2	2019-12-05 08:58:39.338989-06	2019-12-05 18:04:38.506306-06	6
16	Awesome!	2	2019-12-05 18:14:35.151525-06	2019-12-05 18:14:35.151525-06	20
17	Excellent post	2	2019-12-05 18:14:35.151525-06	2019-12-05 18:14:35.151525-06	20
18	Terrific	2	2019-12-05 18:14:35.151525-06	2019-12-05 18:14:35.151525-06	21
\.


--
-- TOC entry 2866 (class 0 OID 16407)
-- Dependencies: 199
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: frank
--

COPY public.post (id, title, content, created_at, updated_at, id_user) FROM stdin;
4	How to Be Funny	Learning how to be funny can make everything easier. Let me tell you a story. A year ago, I was having dinner with my favorite person. But I hadn’t said anything remotely funny in the last hour. 	2019-12-02 11:09:22.941189-06	2019-12-03 11:09:22.941189-06	2
6	Understanding Code	wip	2019-12-04 09:08:01.18614-06	2019-12-04 09:08:01.18614-06	2
20	Learning about music v3	Final content comming soon	2019-12-05 16:05:20.327363-06	2019-12-05 16:05:20.327363-06	2
18	Learning about best practices to code 3	Final content comming soon	2019-12-05 12:08:05.29364-06	2019-12-05 16:39:34.593002-06	2
21	Learning about music	Final content comming soon	2019-12-05 17:20:55.168535-06	2019-12-05 17:20:55.168535-06	2
23	Learning about refactoring code	Final content comming soon	2019-12-05 17:54:40.745794-06	2019-12-05 17:54:40.745794-06	2
3	Learning about best practices to code	Final content comming soon. Wait for it bro	2019-12-01 11:09:22.941189-06	2019-12-05 17:58:31.521973-06	2
\.


--
-- TOC entry 2867 (class 0 OID 16418)
-- Dependencies: 200
-- Data for Name: post_tag; Type: TABLE DATA; Schema: public; Owner: frank
--

COPY public.post_tag (id_tag, id_post) FROM stdin;
2	3
1	3
\.


--
-- TOC entry 2864 (class 0 OID 16397)
-- Dependencies: 197
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: frank
--

COPY public.tag (id, name, created_at, updated_at) FROM stdin;
1	fun	2019-12-03 11:04:34.037026-06	2019-12-03 11:04:34.037026-06
2	sports	2019-12-03 11:04:34.037026-06	2019-12-03 11:04:34.037026-06
3	random	2019-12-03 11:04:34.037026-06	2019-12-03 11:04:34.037026-06
4	sadness	2019-12-03 11:04:34.037026-06	2019-12-03 11:04:34.037026-06
5	finantial	2019-12-03 11:04:34.037026-06	2019-12-03 11:04:34.037026-06
\.


--
-- TOC entry 2869 (class 0 OID 16435)
-- Dependencies: 202
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: frank
--

COPY public."user" (id, name, last_name, username, password, email, image, last_login, created_at, updated_at) FROM stdin;
2	Carlos Francisco	Rivas Fuentes	Frank	admin123	frank@gmail.com	https://www.google.com/imgres?imgurl=https%3A%2F%2Fwebcomicms.net%2Fsites%2Fdefault%2Ffiles%2Fclipart%2F135709%2Fimages-soccer-1	2019-12-02 02:23:54-06	2019-12-02 18:12:54.329522-06	2019-12-02 18:12:54.329522-06
\.


--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 203
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 18, true);


--
-- TOC entry 2883 (class 0 OID 0)
-- Dependencies: 198
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frank
--

SELECT pg_catalog.setval('public.post_id_seq', 23, true);


--
-- TOC entry 2884 (class 0 OID 0)
-- Dependencies: 196
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frank
--

SELECT pg_catalog.setval('public.tag_id_seq', 5, true);


--
-- TOC entry 2885 (class 0 OID 0)
-- Dependencies: 201
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frank
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- TOC entry 2736 (class 2606 OID 16460)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- TOC entry 2726 (class 2606 OID 16415)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- TOC entry 2728 (class 2606 OID 16422)
-- Name: post_tag post_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_pkey PRIMARY KEY (id_tag, id_post);


--
-- TOC entry 2722 (class 2606 OID 16402)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- TOC entry 2730 (class 2606 OID 16444)
-- Name: user unique_email; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 2724 (class 2606 OID 16404)
-- Name: tag unique_name_key; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT unique_name_key UNIQUE (name);


--
-- TOC entry 2732 (class 2606 OID 16442)
-- Name: user unique_username; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 2734 (class 2606 OID 16440)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2741 (class 2606 OID 16489)
-- Name: comment post_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT post_comment FOREIGN KEY (id_post) REFERENCES public.post(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2739 (class 2606 OID 16484)
-- Name: post_tag post_tag_post; Type: FK CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_post FOREIGN KEY (id_post) REFERENCES public.post(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2738 (class 2606 OID 16428)
-- Name: post_tag post_tag_tag; Type: FK CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_tag FOREIGN KEY (id_tag) REFERENCES public.tag(id) NOT VALID;


--
-- TOC entry 2740 (class 2606 OID 16461)
-- Name: comment user_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT user_comment FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 2737 (class 2606 OID 16445)
-- Name: post user_post; Type: FK CONSTRAINT; Schema: public; Owner: frank
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT user_post FOREIGN KEY (id_user) REFERENCES public."user"(id) NOT VALID;


-- Completed on 2019-12-05 18:18:29

--
-- PostgreSQL database dump complete
--

