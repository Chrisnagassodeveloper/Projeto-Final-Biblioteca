create table if not exists authors (
    id serial not null,
    fullName varchar(50) not null,
    nationality varchar(50) not null,
    book_id bigint not null,
    constraint pk_authors primary key (id),
    constraint fk_book foreign key (book_id) references books(id)
);

