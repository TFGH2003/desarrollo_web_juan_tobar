Detalles...

Para la tabla de las actividades no se replicó la database de las tareas anteriores, simplemente se hizo una que cummpliera con la tarea.
También se hizo una tabla para las notas que tiene relación con la tabla de actividades pero no viceversa.

Este cambio se hizo en pos de agregar un botón que permitiera añadir actividades a la tabla sin necesidad de complicar tanto el código.
Las actividades agregadas por el boton "Agregar actividad predeterminada" tienen como atributos "awa" para los strings, la fecha actual
para las fechas y un índice que crece conforme se agregan actividades.

Como la relación es unidireccional se me complicó el uso de fragmentos, por eso todo el html está en un solo archivo, dentro de este se separan
las actividades con th:each.

El botón de evaluar presente en cada fila de la tabla lanza un recuadro al presionarlo, este recuadro presenta un selector con notas del 1 al 7,
no se implementó un imput personalizado, luego hay botones para guardar o cancelar la entrega de la evaluación seleccionada. Hay atrapadores de
errores implementados pero al hacer uso de un selector en vez de un input no debería haber problemas.

No se hizo uso de links con css's prehechos (Me gusta como se ve sin diseño)

Para iniciar la aplicación primero hay que descargar MySql y agregarlo al path, luego hay que crear al usuario cc5002 si no está creado, finalmente
hay que crear la database tarea2 y simplemente precionar play desde uno de los archivos .java de la tarea.
