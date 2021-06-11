function PegarDados() {
    //criando variaveis que puxam os elementos DOM
    var tarefa = document.getElementById('Tarefa').value;
    var data = document.getElementById('Data').value;
    var hora = document.getElementById('Hora').value;
    var res = document.getElementById('res');

    res.innerHTML += `<p> ${tarefa}    ${data}    ${hora} <p>`;
    
}