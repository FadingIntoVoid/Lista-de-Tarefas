const inputTarefa = document.getElementById('tarefa-input');
const btnAdd = document.getElementById('btnAdd');
const filtro = document.getElementById('filtro');
const listaTarefas = document.getElementById('lista-tarefas');

btnAdd.addEventListener('click', function() {
    if (inputTarefa.value.trim() !== '') {
        const novaTarefa = {
            texto: inputTarefa.value,
            concluida: false
        };

        tarefas.push(novaTarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        renderizarTarefa(novaTarefa, tarefas.length - 1);

        
        inputTarefa.value = '';
    }
});

filtro.addEventListener('change', function() {
    const filtroSelecionado = this.value;
    const tarefas = listaTarefas.children;

    for (let tarefa of tarefas) {
        if (filtroSelecionado === 'Todas') {
            tarefa.style.display = '';
        };

        if (filtroSelecionado === 'Pendentes') {
            if (tarefa.classList.contains('concluida')) {
                tarefa.style.display = 'none';
            } else {
                tarefa.style.display = '';
            }
        };

        if (filtroSelecionado === 'Concluídas') {
            if (tarefa.classList.contains('concluida')) {
                tarefa.style.display = '';
            } else {
                tarefa.style.display = 'none';
            }
        };
    };
});

let tarefas = [];

function renderizarTarefa(tarefa, index) {
    const li = document.createElement('li');
    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarefa.texto;
    spanTexto.classList.add('tarefa-texto');

    if (tarefa.concluida) {
        li.classList.add('concluida');
    };

    li.appendChild(spanTexto);

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = 'Concluir';
    btnConcluir.classList.add('btn-concluir');

    btnConcluir.addEventListener('click', function () {
        li.classList.toggle('concluida');
        const indexReal = Array.from(listaTarefas.children).indexOf(li);
        tarefas[indexReal].concluida = li.classList.contains('concluida');
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('btn-remover');

    btnRemover.addEventListener('click', function () {
        const indexReal = Array.from(listaTarefas.children).indexOf(li);
        tarefas.splice(indexReal, 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        li.remove();
    });

    const containerBotoes = document.createElement('div');
    containerBotoes.classList.add('botoes');

    containerBotoes.appendChild(btnConcluir);
    containerBotoes.appendChild(btnRemover);
    li.appendChild(containerBotoes);

    listaTarefas.appendChild(li);
};

const toggle = document.getElementById('modo-escuro-toggle');
const statusTexto = document.getElementById('modo-escuro-status');

if (localStorage.getItem('modoEscuro') === 'true') {
  document.body.classList.add('escuro');
  toggle.checked = true;
  statusTexto.textContent = 'Modo Escuro: Ativado';
} else {
    statusTexto.textContent = 'Modo Escuro: Desativado';
}

toggle.addEventListener('change', () => {
    const ativado = toggle.checked;
  document.body.classList.toggle('escuro', ativado);
  localStorage.setItem('modoEscuro', ativado);
  statusTexto.textContent = ativado ? 'Modo Escuro: Ativado' : 'Modo Escuro: Desativado';
});

const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));

if (tarefasSalvas) {
  tarefas = tarefasSalvas;
  tarefas.forEach((tarefa, index) => {
    renderizarTarefa(tarefa, index);
  });
}