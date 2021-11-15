'use strict';
const getDb = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDb = (db) => localStorage.setItem('todoList', JSON.stringify(db));
function criarItem(texto, marcacao, indice) {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `<input type="checkbox" ${marcacao} data-indice=${indice}>
    <div>${texto}</div>
    <input type="button" value="X" data-indice=${indice}>`;
    document.getElementById('todoList').appendChild(item);
}
function limpaAtividades() {
    const lista = document.getElementById('todoList');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}
function telaRender() {
    limpaAtividades();
    const db = getDb();
    db.forEach((item, indice) => criarItem(item.atividade, item.marcacao, indice));
}
function adicionarItem(event) {
    const tecla = event.key;
    if (tecla === 'Enter') {
        const db = getDb();
        db.push({'atividade': event.target.value, 'marcacao': ''});
        setDb(db);
        telaRender();
        event.target.value = '';
    }
}
function removerItem(indice) {
    const db = getDb();
    db.splice(indice, 1);
    setDb(db);
    telaRender();
}
function atualizarItem(indice) {
    const db = getDb();
    db[indice].marcacao = db[indice].marcacao === '' ? 'checked' : '';
    setDb(db);
    telaRender();
}
function clickItem(event){
    const elemento = event.target;
    if(elemento.type === 'button'){
        removerItem(elemento.dataset.indice);
    }else if(elemento.type === 'checkbox'){
        atualizarItem (elemento.dataset.indice);
    }
}
telaRender();
document.getElementById('novoItem').addEventListener('keypress', adicionarItem);
document.getElementById('todoList').addEventListener('click', clickItem);