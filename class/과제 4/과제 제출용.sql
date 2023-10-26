drop table topic;

use webdb2023

# alreay exist table drop
drop table customer;
drop table author;
drop table topic;

# DDL customer
create table customer (
id int NOT NULL auto_increment,
name varchar(30) not null,
address text,
birth datetime not null,
phone varchar(30) DEFAULT null,
PRIMARY KEY(id)
);

# DDL topic
create table topic (
id int NOT NULL auto_increment,
title varchar(30) not null,
descrpt text,
created datetime not null,
author_id int DEFAULT null,
PRIMARY KEY(id)
);

# DDL author
create table author( 
id int not null auto_increment, 
name varchar(20) not null, 
profile varchar(200) default null, 
primary key(id));



# topic data insert
insert topic values(1,'MySQL','MySQL is Database Name.','2023-09-20',1);
insert topic values(2,'Node.js','Node.js is runtime of javascript','2023-09-20',1);
insert topic values(3,'HTML','HTML is Hyper Text Markup Language','2023-09-20',1);
insert topic values(4,'CSS','CSS is used to decorate HTML Page.','2023-09-20',1);
insert topic values(5,'express','express is the framework for web service.','2023-09-20',1);

# author data insert
insert author values(1,'Mark','Home Protector');
insert author values(2,'Kai','Zombie');
insert author values(3,'Hae-won','Suit man');
insert author values(4,'Mi-Yeon','Police',);
insert author values(5,'Jae-Sung','Programmer');

# customer data insert
insert customer values(1,'김군','경기도 남양주시 호평동 동원아파트','1997-05-24','010-117-3247');
insert customer values(2,'박군','경기도 남양주시 평내동 한신아파트','2001-09-20','010-1545-5647');
insert customer values(3,'나군','경기도 남양주시 호평동 파라곤','2000-04-28','010-1175-5687');
insert customer values(4,'이양','경기도 남양주시 평내동 금강아파트','1998-01-20','010-1529-5947');
insert customer values(5,'우군','경기도 남양주시 호평동 대주아파트','1999-07-05','010-1145-5617');
