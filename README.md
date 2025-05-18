Detalles........

Creo que no se hacen las validaciones en el formulario

La forma de saber si el formulario fue aceptado es porque retorna a la portada, si no retorna entonces no fue aceptado

Hay cosas implementadas, como el uso de multiples fotos, que no se pueden usar

Hice modificaciones en tarea2.sql, no funcionaban las tildes y hice que comuna fuera un char en vez de un id

El listado de actividades tiene hasta 100 actividades, no todas

Los ids no son al azar, son progresivos

region-comuna.sql no fue usado

Para iniciar la base de datos hay que entrar en mysql con "mysql -u cc5002 -p" con el password "programacionweb"
luego usar "CREATE DATABASE tarea2; EXIT;" y finalmente "mysql -u cc5002 -p tarea2 < database/tarea2.sql" con la password anterior

Las imágenes no se pueden ampliar en el listado de actividades

Región y contacto no fueron agregados al listado de actividades (Me compliqué)

La base de datos no tiene datos default, por eso está vacía al principio