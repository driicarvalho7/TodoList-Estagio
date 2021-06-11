
async function connect(){
    //verificando se a variavel global esta conectada ao Banco de dados
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    //importando mysql2 e conectando ao banco de dados
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/BD_Tarefas");
    console.log("Conectado no BD");

    //criando variavel global
    global.connection = connection;
    return connection;
}

//criando função que exibe dados da tabela
async function MostrarTaefas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tbl_tarefas'); //selecionando apenas a linha de char
    return rows;
}

//criando função que insere dados na tabela do banco
async function InserirTarefa(Tarefa){
    const conn = await connect();
    const sql = 'INSERT INTO tbl_tarefas(id,tarefa,tdata,thora) VALUES (?,?,?,?)'; // (?) usada para o array detectar onde entrar
    const values = [Tarefa.id, Tarefa.tarefa, Tarefa.tdata, Tarefa.thora]; //array que insere os dados na devida coluna
    return await conn.query(sql, values);
}

//criando função que atualiza os dados da tabela
async function UpdateTarefa(id, Tarefa){
    const conn = await connect();
    const sql = 'UPDATE tbl_tarefas SET tarefa=?, tdata=?, thora=? WHERE id=?';
    const values = [Tarefa.tarefa, Tarefa.tdata, Tarefa.thora, id];
    return await conn.query(sql, values);
}

//criando função que deleta os dados da tabela
async function DeleteTarefa(id){
    const conn = await connect();
    const sql = 'DELETE FROM tbl_tarefas WHERE id=?';
    return await conn.query(sql, [id]);
}

//exportando as funções criadas em Database.js
module.exports = {MostrarTaefas, InserirTarefa, UpdateTarefa, DeleteTarefa}; 
