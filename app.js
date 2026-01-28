const APIServicoUrl = 'http://localhost:3000/servicos';

document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'timeGridDay',
          locale: 'pt-br',
          headerToolbar: {
          left: 'prev,next',
          center: 0,
          right: 'title'
          },
          events: 'http://localhost:3000/agendamentos'
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
            <button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#${servico.id}">Atualizar</button>
            <button class='btn btn-danger'>Deletar</button>
          </div>
      </div>
      
      <div class="modal fade" id="${servico.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
  servicoInfo = {nomeDoServico, tempoGastoServico, precoDoServico};

  fetch(APIServicoUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicoInfo)
  })
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