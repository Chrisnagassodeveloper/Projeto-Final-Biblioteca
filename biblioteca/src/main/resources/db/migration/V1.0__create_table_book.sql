create table if not exists books (
    id serial not null,
    title varchar(50) not null,
    genre varchar(50) not null,
    constraint pk_book primary key (id)
);