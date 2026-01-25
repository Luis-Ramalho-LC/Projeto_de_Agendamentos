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
      "Tipo de Serviço: " + servico.nomeDoServico +
      "<br>Tempo Gasto: " + servico.tempoGastoServico + " Minutos" +
      "<br> Preço do Serviço: " + servico.precoDoServico + " R$"
  })
 }) 
})

function salvarNovoServico(){
  var servico = [];
  const nomeDoServico = document.getElementById("nomeServico").value;
  const tempoGastoServico = document.getElementById("tempoGasto").value;
  const precoDoServico = document.getElementById("preco").value;
  servico = {nomeDoServico, tempoGastoServico, precoDoServico};

  fetch(APIServicoUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servico)
  })
}
