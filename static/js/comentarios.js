let comButt = document.querySelectorAll('.btn-comentar')
let formCA = document.querySelectorAll('.form-comentario-actividad')
let verCom = document.querySelectorAll('.btn-ver-comentarios')

function comButtFunc(e){
    const actividadId=e.target.dataset.actividadId;
    const formulario=document.querySelector(`.form-comentario[data-actividad-id="${actividadId}"]`)
    if(formulario.style.display=='none'){
        formulario.style.display = 'table-row'
    }
    else{
        formulario.style.display = 'none'
    }
}

function formCAFunc(e){
    e.preventDefault();
    const formulario = new FormData(form);
    const errores = form.querySelector('.error-message');       
    fetch('/agregar_comentario', {
        method: 'POST',
        body: formulario
    })
    .then(response => response.json())
    .then(result => {
        if (result.status != 'ok') {
            errores.textContent = result.errors.join(', ');
        } else {
            form.reset();
            form.closest('.form-comentario').style.display = 'none';
        }
    })
    .catch(() => {
        errores.textContent = 'Error de conexión';
    });
}

function verComFunc(e){
    const actividadId = e.target.dataset.actividadId;
    const container = document.querySelector(`.comentarios-container[data-actividad-id="${actividadId}"]`);
    const comentarios = document.getElementById(`comentarios-${actividadId}`);
    const visible = container.style.display !== 'none';     
    if (!visible) {
        container.style.display = 'table-row';        
        fetch(`/obtener_comentarios/${actividadId}`)
            .then(response => response.json())
            .then(result => {
                if (result.status != 'ok') {
                    comentarios.innerHTML = '<p>Error al cargar comentarios.</p>';
                } else {
                    if (result.comentarios.length > 0) {
                        let html = '<h3>Comentarios:</h3><ul>';
                        result.comentarios.forEach(comentario => {
                            html += `
                                <li>
                                    <strong>${comentario.nombre}</strong> (${comentario.fecha}):<br>
                                    ${comentario.texto}
                                </li>
                            `;
                        });
                        html += '</ul>';
                        comentarios.innerHTML = html;
                    } else {
                        comentarios.innerHTML = '<p>No hay comentarios aún.</p>';
                    }
                }
            })
            .catch(() => {
                comentarios.innerHTML = '<p>Error de conexión.</p>';
            });
    } else {
        container.style.display = 'none';
    }
}

comButt.forEach(button => {button.addEventListener('click', comButtFunc)})
formCA.forEach(form => {form.addEventListener('submit', formCAFunc)})
verCom.forEach(button => {button.addEventListener('click', verComFunc)})