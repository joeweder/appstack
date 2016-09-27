create table PERSON
(
    id			BIGINT primary key identity,
    firstName 	varchar(80) not null,
    lastName 	varchar(80) not null,
    middleName 	varchar(80) not null,
    birthDay    timestamp,
    gender      integer,
    ethnicity   integer,
    deceased    boolean
 );
ALTER TABLE PERSON ALTER COLUMN id RESTART WITH 1;
