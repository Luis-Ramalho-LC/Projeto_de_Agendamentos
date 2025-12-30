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
          events: 'eventos.json'
        })
        calendar.render()
      })