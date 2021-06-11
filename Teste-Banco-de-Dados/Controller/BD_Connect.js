
(async () => {
    
    //criando conexão com o banco
    const bd = require("../Model/Database");
    console.log('começou!');

    //inserrindo dados dentro da tabela
    console.log('INSERT INTO tbl_tarefas');
    const result = await bd.InserirTarefa({id: "003", tarefa: "Comprar pão", tdata: "2021-06-13", thora: "07:20"});
    console.log(result);

    //puxando função que possui os dados das tabelas 
    console.log('SELECT * FROM tbl_tarefas');
    const tarefas = await bd.MostrarTaefas();
    console.log(tarefas);

    //atualizando dados dentro da tabela
    console.log('UPDATE tbl_tarefas');
    const result1 = await bd.UpdateTarefa(3, {id: "003", tarefa: "Joga poker", tdata: "2021-12-20", thora: "23:30"});
    console.log(result1);

    //deletando dados dentro da tabela
    console.log('DELETE FROM tbl_tarefas');
    const result2 = await bd.DeleteTarefa(2);
    console.log(result2);
    
    console.log('SELECT * FROM tbl_tarefas'); 
}) ();