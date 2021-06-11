create database BD_Tarefas;
use BD_Tarefas;

create table tbl_tarefas (
	id int(3) primary key,
	tarefa varchar(50),
    tdata date,
    thora time
);

insert into tbl_tarefas values ('001', 'Jogar Bola', '2021-06-10', '20:24');

select * from tbl_tarefas;
