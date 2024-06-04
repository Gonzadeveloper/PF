PGDMP  )    #                |            electroemporium    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16396    electroemporium    DATABASE     �   CREATE DATABASE electroemporium WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE electroemporium;
                postgres    false            �            1259    16397 
   Categories    TABLE     �   CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Categories";
       public         heap    postgres    false            �            1259    16400    Categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Categories_id_seq";
       public          postgres    false    215            �           0    0    Categories_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;
          public          postgres    false    216            �            1259    16401    Products    TABLE     �  CREATE TABLE public."Products" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    condition character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "categoryId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    16406    Products_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Products_id_seq";
       public          postgres    false    217            �           0    0    Products_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;
          public          postgres    false    218                       2604    16407    Categories id    DEFAULT     r   ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);
 >   ALTER TABLE public."Categories" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215                        2604    16408    Products id    DEFAULT     n   ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);
 <   ALTER TABLE public."Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �          0    16397 
   Categories 
   TABLE DATA           J   COPY public."Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �       �          0    16401    Products 
   TABLE DATA           �   COPY public."Products" (id, name, description, price, stock, condition, image, "userId", "categoryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �       �           0    0    Categories_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Categories_id_seq"', 13, true);
          public          postgres    false    216            �           0    0    Products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Products_id_seq"', 10, true);
          public          postgres    false    218            "           2606    16410    Categories Categories_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_pkey";
       public            postgres    false    215            $           2606    16412    Products Products_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    217            %           2606    16413 !   Products Products_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_categoryId_fkey";
       public          postgres    false    217    215    4642            �   �   x�}��N�0@��+��Zv��iV$@:���ptI��2������z~I�6�ϒcɺ����(�$f$��?�T��D#N���_�������$a���A���!9��~����׽\�@.1!9�o��]�DeT~�E�i���_ε���Z�<��^��r��!���2��[�k?�8�N��<.�oe����1��8i4F�R��}?��	1*��/9/��Zr?WI�[R*�^ ~ �E�o      �   �  x�u��n�6���Sp�EJ�]2q�I�u.M��M��h�3������m� ]�u�로d��� ��C�<���֌�Z���L�#�)t}y�n����&��u@K%E�:V
�rѠR>?-ywC���/y�s��os���tb"�G�p3�lG�4g�9k�@77S�Z)r�h!���_�yMQ�&i�-��BB,7�.nO�\Z+�[5vɔ�$�k��B�Dk�vjVp�p[�G�正<�%^W7�0q����K4OW}z�4�c
�c)J�L�XA��s�c�F���W��Gb��7�[[��+vK����qhy�x&!vDȘ�c?��d�Y׬�9��!�GWRX75��]����[�hZU]�N�\d�����T����6�� 9���ӡ=x@��|��K�ѽ�O �O>��6�R2����E�C7o2�_vf���~��ڪS�=���Q�Q&^F=�Bl��a��C���I �	�|kN�h���йKЧ�)��%��!Gx�ʩ'C`/���ג.�7B�i���(�X�G@��1��Fʥ(�J:1YD~3��AZ�8IY�ӄ.q4m�,��x��G4Z����"�=��@��C�R���C��	��\4\�߂?�����[�����h��V���Ꝏ�Z�cTpŞ�oe`m��mEƽ���f�M;g��	q�T���a�\��ܭ��3��z̺�vU�l)��S*�;�fE����7eVo�h�$���x��bQ���k74
��'3tt{���vvt}r�&�ۓ�����_Nm4���t�I�w��Ф�B�z�9mrVm-�s�xa���a����e��y[3�yӆ�G��#C�.;�@�;s6-��@����J�B9���ρ��y�0����0��*<�J�\���E_`�>`�8tm/�nhYs%r<gP���m{�)��-^��'p���`_(\�5�6��i%�1�{�����(Z�f�g���<�9�.��.����(���xQ칉��� U����M�t �Nh��:�^@�D�!�:���K�oA=������\�䴦�Zm6�ۊ�t����5�+�9���fx�˕V-c�Q����������A5��0���nh�Xh������܃�ή����<e/OM%�O����6��&��}�j���O�W�A�\~7��]�/�Ǯ�w�5os4�����ͤ�eR�j�Rn�'�}�J���
�Kj�nh�Zע�9�W�����n����<�15@�����ZP¤˶R���Q[c
n+�|�x@�秜W�%/4pw��[O+���)!�{��I��%�~��`��];��;���uk�o��?E����:i
 �/��Ö����W��E?��%@h{,]�
L�7�@|�`z�96��C/�����R'J�ĉ#  v+�\+'v����u��gvv3��L28\���iևp ��M����hvD��nh��=��*i�     