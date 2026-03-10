const APIServicoUrl = 'http://localhost:3000/servicos';
const APIEventosURL = 'http://localhost:3000/eventos';

fetch(APIEventosURL)
.then(response => response.json())
.then(dadosDaAPI =>{
        var calendarEl = document.getElementById('calendar')
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'listDay',
          locale: 'pt-br',
          headerToolbar: {
            left: 'prev,next',
            center: 0,
            right: 'title'
          },
          events: dadosDaAPI
        })
        calendar.render()
})

fetch(APIServicoUrl, { method: 'GET' })
.then(function(resposta){ resposta.json()
  .then(function(verServicos){ verServicos.forEach(function(servico){
    document.getElementById("TiposDeServiços").innerHTML += 
     `<div class='card m-2'>
        <div class='card-header'>Nome do Serviço: ${servico.nomeDoServico}</div>
          <div class='card-body'>
            <h5 class='card-title'>Tempo Gasto: ${servico.tempoGastoServico} Minutos</h5>
            <p class='card-text'>Preço: ${servico.precoDoServico} R$</p>
            <button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modal${servico.id}">Atualizar</button>
            <button class='btn btn-danger' id="${servico.id}" onclick="deletarServico(this.id)">Deletar</button>
          </div>
      </div>
      
      <div class="modal fade" id="modal${servico.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Alterações no Serviço</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Nome</span>
                <input id="atualizarNomeServico${servico.id}" type="text" class="form-control" aria-label="Sizing example input" value="${servico.nomeDoServico}" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Tempo Gasto</span>
                <input id="atualizarTempoGasto${servico.id}" type="number" class="form-control" aria-label="Sizing example input" value="${servico.tempoGastoServico}" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">R$</span>
                <input id="atualizarPreco${servico.id}" type="number" class="form-control" value="${servico.precoDoServico}" aria-label="Amount (to the nearest dollar)">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-success" id="${servico.id}" onclick="atualizarServico(this.id)">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
      `
  })
 }) 
})

function salvarNovoServico(){
  var servicoInfo = [];
  const nomeDoServico = document.getElementById("nomeServico").value;
  const tempoGastoServico = document.getElementById("tempoGasto").value;
  const precoDoServico = document.getElementById("preco").value;

  if(!nomeDoServico == '' && !tempoGastoServico == '' && !precoDoServico == ''){
    servicoInfo = {nomeDoServico, tempoGastoServico, precoDoServico};
    fetch(APIServicoUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicoInfo)
    })
  }else
    alert("Preencha todos os campos!")
}

function atualizarServico(id){
  var servicoAtualizado = []
  const nomeDoServico = document.getElementById(`atualizarNomeServico${id}`).value
  const tempoGastoServico = document.getElementById(`atualizarTempoGasto${id}`).value
  const precoDoServico = document.getElementById(`atualizarPreco${id}`).value
  
  servicoAtualizado = {id, nomeDoServico, tempoGastoServico, precoDoServico}
  
  fetch(`${APIServicoUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicoAtualizado)
  })
}

function deletarServico(id){
  fetch(`${APIServicoUrl}/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })
}

document.onload = (preencherDropDownDeServicos())
function preencherDropDownDeServicos(){
  fetch(APIServicoUrl, {method: 'GET'})
  .then(function(resposta){resposta.json()
    .then(function(verServicos) {verServicos.forEach(function(servico){
        document.getElementById('SelecaoDeServico').innerHTML += `
          <option value="${servico.nomeDoServico}">${servico.nomeDoServico}</option>
        `
      })
    })
  })
}

fetch(APIEventosURL, {method: 'GET'})
.then(response => response.json())
.then(infoAgendamentos => {
  infoAgendamentos.forEach(function(agendamentos){
    document.getElementById('mostrarAgendamentos').innerHTML += `
      <div class='card m-2'>
        <div class='card-header'>Nome do Cliente: ${agendamentos.title}</div>
          <div class='card-body'>
            <h5 class='card-title'>Horário De Começo: ${agendamentos.start}</h5>
            <p class='card-text'>Horário Final: ${agendamentos.end}</p>
            <p class='card-text'>Tipo do Serviço: ${agendamentos.tipoDoServicoAgendado}</p>
            <button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modal${agendamentos.id}">Atualizar</button>
            <button class='btn btn-danger' id="${agendamentos.id}" onclick="deletarAgendamento(this.id)">Deletar</button>
          </div>
      </div>

      <div class="modal fade" id="modal${agendamentos.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Alterações no Serviço</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Nome</span>
                <input id="atualizarNomeAgendamentos${agendamentos.id}" type="text" class="form-control" aria-label="Sizing example input" value="${agendamentos.title}" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Começo</span>
                <input id="atualizarComeco${agendamentos.id}" type="text" class="form-control" aria-label="Sizing example input" value="${agendamentos.start}" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Fim</span>
                <input id="atualizarFim${agendamentos.id}" type="text" class="form-control" value="${agendamentos.end}">
              </div>
              <div>
                <select name="TipoDeServico" id="TipoDeServico"></select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-success" id="${agendamentos.id}" onclick="atualizarAgendamento(this.id)">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    `
  })
})

function salvarNovoAgendamento(){
  var novoServicoInfo = []
  let end = ''
  const title = document.getElementById('inputNomeCliente').value
  const tipoDoServicoAgendado = document.getElementById('SelecaoDeServico').value
  let start = document.getElementById('inputData').value
  const horarioInicioDoAgendamento = document.getElementById('inputHorario').value
  const horarioFimDoAgendamento = document.getElementById('inputFimHorario').value
  if(horarioFimDoAgendamento != '' && horarioInicioDoAgendamento != ''){
    end = start + "T" + horarioFimDoAgendamento + ":00"
    start = start + "T" + horarioInicioDoAgendamento + ":00"
  }

  novoServicoInfo = {title, tipoDoServicoAgendado, start, end}
  fetch(APIEventosURL, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(novoServicoInfo)
  })
}

function atualizarAgendamento(id){
  var agendamentoAtualizado = []
  const title = document.getElementById(`atualizarNomeAgendamentos${id}`).value
  const start = document.getElementById(`atualizarComeco${id}`).value
  const end = document.getElementById(`atualizarFim${id}`).value
  
  agendamentoAtualizado = {id, title, start, end}

  fetch(`${APIEventosURL}/${id}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(agendamentoAtualizado)
  })
}

function deletarAgendamento(id){
  fetch(`${APIEventosURL}/${id}`, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  })
  
}