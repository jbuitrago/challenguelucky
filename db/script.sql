-- SEQUENCE: public.city_id_seq

-- DROP SEQUENCE public.city_id_seq;

CREATE SEQUENCE public.city_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- SEQUENCE: public.country_id_seq

-- DROP SEQUENCE public.country_id_seq;

CREATE SEQUENCE public.country_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
    
-- SEQUENCE: public.profile_id_seq

-- DROP SEQUENCE public.profile_id_seq;

CREATE SEQUENCE public.profile_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- SEQUENCE: public.user_id_seq
-- DROP SEQUENCE public.user_id_seq;

CREATE SEQUENCE public.user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- Table: public.country
-- DROP TABLE public.country;

CREATE TABLE IF NOT EXISTS public.country
(
    id integer NOT NULL DEFAULT nextval('country_id_seq'::regclass),
    name character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT country_pkey PRIMARY KEY (id)
);

-- Table: public.city

-- DROP TABLE public.city;

CREATE TABLE IF NOT EXISTS public.city
(
    id integer NOT NULL DEFAULT nextval('city_id_seq'::regclass),
    name character varying(30) COLLATE pg_catalog."default",
    countryid integer,
    CONSTRAINT city_pkey PRIMARY KEY (id),
    CONSTRAINT city_countryid_fkey FOREIGN KEY (countryid)
        REFERENCES public.country (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: public.address

-- DROP TABLE public.address;

CREATE TABLE IF NOT EXISTS public.address
(
    id integer NOT NULL DEFAULT nextval('address_id_seq'::regclass),
    street character varying(30) COLLATE pg_catalog."default",
    cityid integer,
    CONSTRAINT address_pkey PRIMARY KEY (id),
    CONSTRAINT address_cityid_fkey FOREIGN KEY (cityid)
        REFERENCES public.city (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    username character varying(30) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- Table: public.profile

-- DROP TABLE public.profile;

CREATE TABLE IF NOT EXISTS public.profile
(
    id integer NOT NULL DEFAULT nextval('profile_id_seq'::regclass),
    userid integer,
    addressid integer,
    name character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT profile_pkey PRIMARY KEY (id),
    CONSTRAINT profile_addressid_fkey FOREIGN KEY (addressid)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT profile_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

