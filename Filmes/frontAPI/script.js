
const form = document.querySelector('#filmeForm')
const tituloInput = document.querySelector('#tituloInput')
const diretorInput = document.querySelector('#diretorInput')
const ano_lancamentoInput = document.querySelector('#ano_lancamentoInput')
const generoInput = document.querySelector('#generoInput')
const URL = 'http://localhost:8000/Filme.php'

const tableBody = document.querySelector('#filmeTable')


function carregarFilme() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(filmes => {
            tableBody.innerHTML = ''

            for (let i = 0; i < filmes.length; i++) {
                const tr = document.createElement('tr')
                const filme = filmes[i]
                tr.innerHTML = `
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>${filme.genero}</td>
                    <td>
                        <button data-id="${filme.id}" onclick="atualizarFilme(${filme.id})">Editar</button>
                        <button onclick="excluirFilme(${filme.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um Filme
function adicionarFilme(e) {

    e.preventDefault()

    const titulo = tituloInput.value
    const diretor = diretorInput.value
    const ano_lancamento = ano_lancamentoInput.value
    const genero = generoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&diretor=${encodeURIComponent(diretor)}&ano_lancamento=${encodeURIComponent(ano_lancamento)}&genero=${encodeURIComponent(genero)}`
    })
        .then(response => {
            if (response.ok) {
                carregarFilme()
                tituloInput.value = ''
                diretorInput.value = ''
                ano_lancamentoInput.value = ''
                generoInput.value = ''
            } else {
                console.error('Erro ao add filme')
                alert('Erro ao add filme')
            }
        })
}

//Função para editar
function atualizarFilme(id){
    const novoTitulo = prompt("Digite o novo titulo")
    const novoDiretor = prompt("Digite o novo diretor")
    const novoAno = prompt("Digite o novo ano")
    const novoGenero = prompt("Digte o novo genero")

    if (novoTitulo && novoAno && novoDiretor && novoGenero){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `titulo=${encodeURIComponent(novoTitulo)}&diretor=${encodeURIComponent(novoDiretor)}&ano_lancamento=${encodeURIComponent(novoAno)}&genero=${encodeURIComponent(novoGenero)}`
        })
            .then(response => {
                if(response.ok){
                    carregarFilme()
                } else {
                    console.error('Erro ao att filme')
                    alert('erro ao att filme')
                }
            })
    }
}

//função para excluir
function excluirFilme(id){
    if(confirm('Deseja excluir esse filme?')){
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
        .then(response=> {
            if(response.ok) {
                carregarFilme()
            } else {
                console.error('erro ao excluir filme')
                alert('Erro ao excluir filme')
            }
        })
    }
}





form.addEventListener('submit', adicionarFilme)

carregarFilme()

