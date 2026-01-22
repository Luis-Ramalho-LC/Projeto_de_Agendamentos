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
          events: 'agendamentos.json'
        })
        calendar.render()
      })

fetch('servicos.json', { method: 'GET' })
.then(function(resposta){ resposta.json()
  .then(function(verServicos){ verServicos.forEach(function(servico){
    document.getElementById("TiposDeServiços").innerHTML += "<div>" + servico.nome
  })
 }) 
})

fetch('servicos.json', {
  method: "POST",
  body: JSON.stringify(novoServico)
})
