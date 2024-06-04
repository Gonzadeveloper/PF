PGDMP  8                    |            electroemporium    16.3    16.3 $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16459    electroemporium    DATABASE     �   CREATE DATABASE electroemporium WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE electroemporium;
                postgres    false            �            1259    16460 	   Addresses    TABLE     �  CREATE TABLE public."Addresses" (
    id integer NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    postalcode character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Addresses";
       public         heap    postgres    false            �            1259    16465    Addresses_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Addresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Addresses_id_seq";
       public          postgres    false    215            �           0    0    Addresses_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Addresses_id_seq" OWNED BY public."Addresses".id;
          public          postgres    false    216            �            1259    16466 
   Categories    TABLE     �   CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Categories";
       public         heap    postgres    false            �            1259    16469    Categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Categories_id_seq";
       public          postgres    false    217            �           0    0    Categories_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;
          public          postgres    false    218            �            1259    16470    Products    TABLE     �  CREATE TABLE public."Products" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    condition character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    "userId" integer,
    "categoryId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    16475    Products_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Products_id_seq";
       public          postgres    false    219            �           0    0    Products_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;
          public          postgres    false    220            �            1259    16476    Users    TABLE     P  CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    typeuser character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16481    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    221            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    222            )           2604    16482    Addresses id    DEFAULT     p   ALTER TABLE ONLY public."Addresses" ALTER COLUMN id SET DEFAULT nextval('public."Addresses_id_seq"'::regclass);
 =   ALTER TABLE public."Addresses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            *           2604    16483    Categories id    DEFAULT     r   ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);
 >   ALTER TABLE public."Categories" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            +           2604    16484    Products id    DEFAULT     n   ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);
 <   ALTER TABLE public."Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            ,           2604    16485    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �          0    16460 	   Addresses 
   TABLE DATA           x   COPY public."Addresses" (id, address, city, state, postalcode, country, "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   #+       �          0    16466 
   Categories 
   TABLE DATA           J   COPY public."Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �+       �          0    16470    Products 
   TABLE DATA           �   COPY public."Products" (id, name, description, price, stock, condition, image, "userId", "categoryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   �,       �          0    16476    Users 
   TABLE DATA           `   COPY public."Users" (id, name, email, password, typeuser, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   �2       �           0    0    Addresses_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Addresses_id_seq"', 3, true);
          public          postgres    false    216            �           0    0    Categories_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Categories_id_seq"', 14, true);
          public          postgres    false    218            �           0    0    Products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Products_id_seq"', 14, true);
          public          postgres    false    220            �           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 4, true);
          public          postgres    false    222            .           2606    16487    Addresses Addresses_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Addresses" DROP CONSTRAINT "Addresses_pkey";
       public            postgres    false    215            0           2606    16489    Categories Categories_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_pkey";
       public            postgres    false    217            2           2606    16491    Products Products_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    219            4           2606    16493    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    221            6           2606    16495    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    221            7           2606    16496    Addresses Addresses_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Addresses" DROP CONSTRAINT "Addresses_userId_fkey";
       public          postgres    false    215    4662    221            8           2606    16501 !   Products Products_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_categoryId_fkey";
       public          postgres    false    219    4656    217            9           2606    16506    Products Products_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_userId_fkey";
       public          postgres    false    221    4662    219            �   t   x���K
�@D�ݧ\��_�,و	HM<��	"CpS��C׎c_	W5�G}~�v��_�3��3��0�� �ϳIV���@���6nܣ	?�z�`כ�٣'-N7��F6      �     x�}��N�0���)x��l�nӬ� �I�,���Kr�+o�u�Z����b�V(��Z�#�����TR.*�K�����Rp����n��̑Y�  �K��}� ���]a�I=�  ��� G����ei�MF�Ƚ^O�Rxiu^�uJ�4�����|Y�ms����`hx�~��x=oS]I��f0��߷m���P2;�AЇ������ X������N׹.ӶA�s�� ±�:},s����9��Xo ~器      �     x�}��n�6���S��CJ%ꏁE'�d[g�&�@K��]IԒ���m�z(z�5/֡�d�-(��g~��#}g��N���B�c�tsu�n;-��m���k����T�A�~���9����!�˧��#�G��9����d3��hx-E�)t{{�P�U./��C���:YsT�Fh>|�u(#������ӕ��֌=O�z�yŵ2Kպ���ZR�V���d����2��!�,�X��'s��s���<\��1���V%6�~l�~,%�1��r��O᪻{LIL�!���~i�_`p%�A�?}���w1s�:��/ ��hP��	&���FԹE-�G�	��Z+��k����7�*���g�]�2��U�n�P����+�0���5����Ux@s�	���0H��a� ��졗.�R��ɋf�n�ސvf��� �����Mv/���~��q���,�j��(ޥ��v|��Ò�C�M��~DF�3��Jth*�R�ХO���St	<��Bx�Li����!Y^mT�i>�_,*iщFnF���@Z�x�����Vʥ(��F{1�G���0-NR�4�y�D!ϙK|_�qA� yģ)H��Y@}�(����  �]���vC#��:��㻛'w�㛳[4�ޝͮ�f����E�����^˼�UM�^tJuˁXΛ\T�Xr������\ f\*�[x��FZ/Js������u���=�r�
o�b�Xw^�V�ƃ�|�e�ǳ����Z��+<����R�J�����]�U+ܧB�,t��? l'4��� ��/�X����jT��_�(E+Y��l�n@j����5�R��
Ӽ��s`����t���Oݺ�����f�>^g���(ė�FhS?	h��J���
ۯ<��eip �Nh;��7bb�J	e-�9L����R���j�K��i�5�4���.�+���6��sk��� �{N�4�T��δB?D�ʦ�C��nD���1I\J��nh�8�TX��^+tvRh��v6O�Tl�B�����NP�0hU�<�U�{������[;Y��na���jX���Vǽ��x�l'��I�����>���bؼQ� [y���0q�4>X�Kh�:7��9�g�^��5�n���zz7b=@��B�7�`�-Wl�^�}K� �V����-��粲o,d�c;��6�`�ys��[y����Go�2R��H�+�Ɣ�A�����P��8��DC+���5��'�z���ɹ�d��aжK��昵�4���� b��݊�1H.�^ e@o�zQ$^ h���;���W1}�)����n���$��Rxo/��zح�4��Q�"�癝�(GhdG��7t~�a��6F�zKۡe�Y�3.�_��IP�x�K��Dw�2�2��#��^�p\�?7NH����ٷ��9���۲�����c���Bg���F���+Qd+����d�����aJX�Uԁm���q|8�	���)���pG�ѿ�-��      �   �   x��ͱ
�0����y���rQ�IQ�
U�\� h��Z���ﷰ��,���k��[�8�����n 4H�x�F�m	[g��Ae܏$t\"���G������85��di��$A#_K����)/[��͌���E!^�IC�     