let actividadActualId = null;
const popup = document.getElementById('notaPopup');
const notaInput = document.getElementById('notaInput');
const guardarBtn = document.getElementById('guardarNotaBtn');
const cancelarBtn = document.getElementById('cancelarNotaBtn');
document.querySelectorAll('.evaluar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        actividadActualId = this.getAttribute('data-actividad-id');
        notaInput.value = '';
        popup.style.display = 'block';
    });
});

guardarBtn.addEventListener('click', function() {
    const nota = parseFloat(notaInput.value);
    enviarNota(actividadActualId, nota);
    popup.style.display = 'none';
});

cancelarBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

function enviarNota(actividadId, nota) {
    fetch(`/actividades/${actividadId}/agregar-nota?nota=${nota}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const celdaPromedio = document.querySelector(`.promedio-cell[data-actividad-id="${actividadId}"]`);
            celdaPromedio.textContent = data.promedio.toFixed(2);
        } else {
            alert('Error al guardar la nota');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar la nota');
    });
}