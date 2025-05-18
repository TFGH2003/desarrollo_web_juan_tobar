let agregar_actividad = document.getElementById("AgAct")
let estadisticas = document.getElementById("Stats")
let lista_actividades = document.getElementById("ActList")

agregar_actividad.addEventListener("click", function() {
    window.location.href = "/agregar_actividad";
});
estadisticas.addEventListener("click", function() {
    window.location.href = "/estadisticas";
});
lista_actividades.addEventListener("click", function() {
    window.location.href = "/lista_actividades";
});