const redes = {"TikTok":["wa"],"Twitter":["wa"],"WhatsApp":["wa"],"Instagram":["wa"],"Telegram":["wa"],"Otro":["wa"]}
const temas = {"Música":["wa"], "Deporte":["wa"], "Ciencias":["wa"], "Religión":["wa"], "Política":["wa"], "Tecnología":["wa"], "Juegos":["wa"], "Baile":["wa"], "Comida":["wa"], "Otro":["wa"]}
const region_comuna = {
    "Región de Tarapacá": ["Camiña","Huara","Pozo Almonte","Iquique","Pica","Colchane","Alto Hospicio"],

    "Región de Antofagasta": ["Tocopilla","Maria Elena","Ollague","Calama","San Pedro Atacama","Sierra Gorda","Mejillones","Antofagasta","Taltal"],

    "Región de Atacama": ["Diego de Almagro","Chañaral","Caldera","Copiapo","Tierra Amarilla","Huasco","Freirina","Vallenar","Alto del Carmen"],

    "Región de Coquimbo ": ["La Higuera","La Serena","Vicuña","Paihuano","Coquimbo","Andacollo","Rio Hurtado","Ovalle","Monte Patria","Punitaqui","Combarbala","Mincha","Illapel","Salamanca",
"Los Vilos"],

    "Región de Valparaíso": ["Petorca","Cabildo","Papudo","La Ligua","Zapallar","Putaendo","Santa Maria","San Felipe","Pencahue","Catemu","Llay Llay","Nogales","La Calera","Hijuelas","La Cruz",
"Quillota","Olmue","Limache","Los Andes","Rinconada","Calle Larga","San Esteban","Puchuncavi","Quintero","Viña del Mar","Villa Alemana","Quilpue","Valparaiso","Juan Fernandez","Casablanca",
"Concon","Isla de Pascua","Algarrobo","El Quisco","El Tabo","Cartagena","San Antonio","Santo Domingo"],

    "Región del Libertador Bernardo Ohiggins": ["Mostazal","Codegua","Graneros","Machali","Rancagua","Olivar","Doñihue","Requinoa","Coinco","Coltauco","Quinta Tilcoco","Las Cabras","Rengo",
"Peumo","Pichidegua","Malloa","San Vicente","Navidad","La Estrella","Marchigue","Pichilemu","Litueche","Paredones","San Fernando","Peralillo","Placilla","Chimbarongo","Palmilla","Nancagua",
"Santa Cruz","Pumanque","Chepica","Lolol"],

    "Región del Maule": ["Teno","Romeral","Rauco","Curico","Sagrada Familia","Hualañe","Vichuquen","Molina","Licanten","Rio Claro","Curepto","Pelarco","Talca","Pencahue","San Clemente",
"Constitucion","Maule","Empedrado","San Rafael","San Javier","Colbun","Villa Alegre","Yerbas Buenas","Linares","Longavi","Retiro","Parral","Chanco","Pelluhue","Cauquenes"],

    "Región del Biobío": ["Tome","Florida","Penco","Talcahuano","Concepcion","Hualqui","Coronel","Lota","Santa Juana","Chiguayante","San Pedro de la Paz","Hualpen","Cabrero","Yumbel","Tucapel",
"Antuco","San Rosendo","Laja","Quilleco","Los Angeles","Nacimiento","Negrete","Santa Barbara","Quilaco","Mulchen","Alto Bio Bio","Arauco","Curanilahue","Los Alamos","Lebu","Cañete","Contulmo",
"Tirua"],

    "Región de La Araucanía": ["Renaico","Angol","Collipulli","Los Sauces","Puren","Ercilla","Lumaco","Victoria","Traiguen","Curacautin","Lonquimay","Perquenco","Galvarino","Lautaro","Vilcun",
"Temuco","Carahue","Melipeuco","Nueva Imperial","Puerto Saavedra","Cunco","Freire","Pitrufquen","Teodoro Schmidt","Gorbea","Pucon","Villarrica","Tolten","Curarrehue","Loncoche","Padre Las Casas",
"Cholchol"],

    "Región de Los Lagos": ["San Pablo","San Juan","Osorno","Puyehue","Rio Negro","Purranque","Puerto Octay","Frutillar","Fresia","Llanquihue","Puerto Varas","Los Muermos","Puerto Montt",
"Maullin","Calbuco","Cochamo","Ancud","Quemchi","Dalcahue","Curaco de Velez","Castro","Chonchi","Queilen","Quellon","Quinchao","Puqueldon","Chaiten","Futaleufu","Palena","Hualaihue"],

    "Región Aisén del General Carlos Ibáñez del Campo": ["Guaitecas","Cisnes","Aysen","Coyhaique","Lago Verde","Rio Ibañez","Chile Chico","Cochrane","Tortel","O'Higins"],

    "Región de Magallanes y la Antártica Chilena": ["Torres del Paine","Puerto Natales","Laguna Blanca","San Gregorio","Rio Verde","Punta Arenas","Porvenir","Primavera","Timaukel","Antartica"],

    "Región Metropolitana de Santiago ": ["Tiltil","Colina","Lampa","Conchali","Quilicura","Renca","Las Condes","Pudahuel","Quinta Normal","Providencia","Santiago","La Reina","Ñuñoa","San Miguel",
"Maipu","La Cisterna","La Florida","La Granja","Independencia","Huechuraba","Recoleta","Vitacura","Lo Barrenechea","Macul","Peñalolen","San Joaquin","La Pintana","San Ramon","El Bosque","Pedro Aguirre Cerda",
"Lo Espejo","Estacion Central","Cerrillos","Lo Prado","Cerro Navia","San Jose de Maipo","Puente Alto","Pirque","San Bernardo","Calera de Tango","Buin","Paine","Peñaflor","Talagante","El Monte","Isla de Maipo",
"Curacavi","Maria Pinto","Melipilla","San Pedro","Alhue","Padre Hurtado"],

    "Región de Los Ríos": ["Lanco","Mariquina","Panguipulli","Mafil","Valdivia","Los Lagos","Corral","Paillaco","Futrono","Lago Ranco","La Union","Rio Bueno"],

    "Región Arica y Parinacota": ["Gral. Lagos","Putre","Arica","Camarones"],

    "Región del Ñuble": ["Cobquecura","Ñiquen","San Fabian","San Carlos","Quirihue","Ninhue","Trehuaco","San Nicolas","Coihueco","Chillan","Portezuelo","Pinto","Coelemu","Bulnes","San Ignacio",
"Ranquil","Quillon","El Carmen","Pemuco","Yungay","Chillan Viejo"]
};

let agregar_actividad = document.getElementById("AgAct")
let lista_actividades = document.getElementById("ActList")
let formulario_atras = document.getElementById("FormBack")
let estadistica_butt = document.getElementById("Stats")
let list_back = document.getElementById("back_list")

let boton_enviar_formulario=document.getElementById("enviar_formulario")
let boton_volver_al_formulario=document.getElementById("volver_al_formulario")

let boton_formulario_portada=document.getElementById("formulario_valido_portada")

let detalle_back_1 = document.getElementById("Back_det_1")
let detalle_back_2 = document.getElementById("Back_det_2")
let detalle_back_3 = document.getElementById("Back_det_3")
let detalle_back_4 = document.getElementById("Back_det_4")
let detalle_back_5 = document.getElementById("Back_det_5")

let detalle_portada = document.getElementById("portada")
let stats_portada=document.getElementById("portada_stats")

let boton_enviar=document.getElementById("enviar")

//Seleccion-------------------------------------------------------------
const poblarTemas = () => {
    let temaSelect = document.getElementById("tema");
    for (const tema in temas) {
        let option = document.createElement("option");
        option.value = tema;
        option.text = tema;
        temaSelect.appendChild(option);
    }
  };

const poblarRegiones = () => {
    let regionSelect = document.getElementById("region");
    for (const region in region_comuna) {
        let option = document.createElement("option");
        option.value = region;
        option.text = region;
        regionSelect.appendChild(option);
    }
  };
  const poblarContactos = () => {
    let contactoSelect = document.getElementById("contacto");
    for (const contacto in redes) {
        let option = document.createElement("option");
        option.value = contacto;
        option.text = contacto;
        contactoSelect.appendChild(option);
    }
  };
  
  const updateComuna = () => {
    let regionSelect = document.getElementById("region");
    let comunaSelect = document.getElementById("comuna");
    let selectedRegion = regionSelect.value;
    
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
    
    if (region_comuna[selectedRegion]) {
        region_comuna[selectedRegion].forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna;
            option.text = comuna;
            comunaSelect.appendChild(option);
        });
    }
    changeArguments();
  };
  function changeContacto() {
    const temaSelect = document.getElementById("contacto");
    const reasonLabel = document.querySelector("label[for='url']");
    const reasonTextarea = document.getElementById("new_url");
    const reasonLabel_1 = document.querySelector("label[for='especificar_contacto']");
    const reasonTextarea_1 = document.getElementById("new_contacto");
    if (temaSelect.value) {
        reasonLabel.style.display = "block";
        reasonTextarea.style.display = "block";
        reasonLabel_1.style.display = "none";
        reasonTextarea_1.style.display = "none";
        if(temaSelect.value=="Otro"){
            reasonLabel_1.style.display = "block";
            reasonTextarea_1.style.display = "block";
        }
    } else {
        reasonLabel.style.display = "none";
        reasonTextarea.style.display = "none";
        reasonLabel_1.style.display = "none";
        reasonTextarea_1.style.display = "none";
    }
  }
  function changeArguments() {
    const temaSelect = document.getElementById("tema");
    const reasonLabel = document.querySelector("label[for='especificar']");
    const reasonTextarea = document.getElementById("new_tema");
    if (temaSelect.value == "Otro") {
        reasonLabel.style.display = "block";
        reasonTextarea.style.display = "block";
    } else {
        reasonLabel.style.display = "none";
        reasonTextarea.style.display = "none";
    }
  }



//Validacion------------------------------------------------------------
const validateRegion = (region) => {
    if(!region) return false;
    else return true;
}
const validateComuna = (comuna) => {
    if(!comuna) return false;
    else return true;
}
const validateNombre = (nombre) => {
    if(!nombre) return false;
    let lengthValid = nombre.trim().length >= 3;
    return lengthValid;
}
const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15;
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
    return lengthValid && formatValid;
};
const validateNumero = (numero) => {
    if (numero){
        let lengthValid = numero.length >= 8;
        let re = /^[0-9]+$/;
        let formatValid = re.test(numero);
        return lengthValid && formatValid;
    }
    else return true
}
const validateContacto = (contacto) => {
    if(contacto){
        let myForm = document.forms["myForm"];
        let url=myForm["new_url"].value;
        let new_con=myForm["new_contacto"].value;
        if(contacto=="Otro"){
            if(!new_con) return false;
        }
        let lengthValid = url.trim().length >= 4;
        let lengthValid_1 = url.trim().length <= 50;
        return lengthValid && lengthValid_1;
    }
    return true
}
const validateInicio = (inicio) => {
    if(!inicio) return false;
    return true
}
const validateFinal = (inicio,final) => {
    if(!inicio || !final) return false;
    const fecha_1= new Date(inicio)
    const fecha_2= new Date(final)
    const diferenciaMs = fecha_2 - fecha_1;
    const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
    if(diferenciaHoras<3){
        return false
    }
    return true
}
const validateTema = (tema) => {
    if(!tema) return false;
    else{
        if(tema=="Otro"){
            let myForm = document.forms["myForm"];
            let otro_tema = myForm["new_tema"].value;
            if(!otro_tema) return false;
            let lengthValid = otro_tema.trim().length >= 3;
            let lengthValid_1 = otro_tema.trim().length <= 15;
            return lengthValid && lengthValid_1;
        }
    }
    return true;
}
const validateFoto = (foto) => {
    if (!foto) return false;
    return true
}

const validateForm = () => {
    let myForm = document.forms["myForm"];
    let region = myForm["region"].value;
    let comuna = myForm["comuna"].value;
    let nombre = myForm["nombre"].value;
    let email = myForm["email"].value;
    let numero = myForm["numero"].value;
    let contacto = myForm["contacto"].value;
    let inicio = myForm["inicio"].value;
    let final = myForm["final"].value;
    let tema = myForm["tema"].value;
    let foto = myForm["foto"].value;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
      invalidInputs.push(inputName);
      isValid &&= false;
    };

    if (!validateRegion(region)) {
        setInvalidInput("Region");
    }
    if (!validateRegion(comuna)) {
        setInvalidInput("Comuna");
    }
    if (!validateNombre(nombre)) {
        setInvalidInput("Nombre");
    }
    if (!validateEmail(email)) {
      setInvalidInput("Email");
    }
    if (!validateNumero(numero)) {
        setInvalidInput("Número");
    }
    if (!validateContacto(contacto)) {
        setInvalidInput("Contacto");
    }
    if (!validateInicio(inicio)) {
        setInvalidInput("Inicio");
    }
    if (!validateFinal(inicio,final)) {
        setInvalidInput("Final");
    }
    if (!validateTema(tema)) {
        setInvalidInput("Tema");
    }
    if (!validateFoto(foto)) {
        setInvalidInput("Foto");
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let formContainer = document.querySelector(".formulario");
  
    if (!isValid) {
      validationListElem.textContent = "";
      for (input of invalidInputs) {
        let listElement = document.createElement("li");
        listElement.innerText = input;
        validationListElem.append(listElement);
      }
      validationMessageElem.innerText = "Los siguientes campos son inválidos:";
      validationBox.style.backgroundColor = "#ffdddd";
      validationBox.style.borderLeftColor = "#f44336";
      validationBox.hidden = false;
    } else {
        ocultar_formulario();
        mostrar_formulario_valido();
    }
  };


//Botones---------------------------------------------------------------
const mostrar_formulario = () => {
    let form = document.getElementById("formulario");
    let ovrl =document.getElementById("overlay")
    form.style.display = "block";
    ovrl.style.display="block"
}

const ocultar_formulario = () => {
    let form = document.getElementById("formulario");
    let ovrl =document.getElementById("overlay")
    form.style.display = "";
    ovrl.style.display="";
}

const mostrar_lista = () => {
    let form = document.getElementById("lista");
    let ovrl =document.getElementById("overlay")
    form.style.display = "block";
    ovrl.style.display="block"
}

const ocultar_lista = () => {
    let form = document.getElementById("lista");
    let ovrl =document.getElementById("overlay");
    form.style.display = "";
    ovrl.style.display="";
}

const mostrar_estadisticas = () => {
    let form = document.getElementById("estadisticas");
    let ovrl =document.getElementById("overlay")
    form.style.display = "block";
    ovrl.style.display="block";
}
const ocultar_estadisticas =()=>{
    let form = document.getElementById("estadisticas");
    let ovrl =document.getElementById("overlay")
    form.style.display = "";
    ovrl.style.display="";
}

const mostrar_detalle = (fila) => {
    let form = document.getElementById("lista");
    form.style.display = "";
    const id = fila.getAttribute("id");
    const detalle = document.getElementById("detalle_" + id);
    if (detalle) {
        detalle.style.display = "block";
    }
}
const ocultar_detalle = () => {
    let detalles = document.querySelectorAll(".detalle");
    detalles.forEach(div => div.style.display = "none");
}
const volver_portada = () => {
    ocultar_detalle();
    let ovrl =document.getElementById("overlay")
    ovrl.style.display="";
}
const agrandar_imagen = (img) => {
    let imagenes = document.querySelectorAll(".clickable_image");
    imagenes.forEach(imagen => imagen.style.width = "320px");
    imagenes.forEach(imagen => imagen.style.height = "240px");
    img.style.width="800px";
    img.style.height="600px";
}
const mostrar_formulario_valido = () => {
    let form = document.getElementById("formulario_valido");
    let ovrl =document.getElementById("overlay")
    form.style.display = "block";
    ovrl.style.display="block"
}

const ocultar_formulario_valido = () => {
    let form = document.getElementById("formulario_valido");
    let ovrl =document.getElementById("overlay")
    form.style.display = "";
    ovrl.style.display="";
}
const mostrar_formulario_enviado = () => {
    let form = document.getElementById("formulario_enviado");
    let ovrl =document.getElementById("overlay")
    form.style.display = "block";
    ovrl.style.display="block"
}

const ocultar_formulario_enviado = () => {
    let form = document.getElementById("formulario_enviado");
    let ovrl =document.getElementById("overlay")
    form.style.display = "";
    ovrl.style.display="";
}
const reiniciar_formulario=()=>{
    document.getElementById("form").reset();
}

boton_enviar.addEventListener("click", validateForm)

lista_actividades.addEventListener("click", mostrar_lista)
agregar_actividad.addEventListener("click", mostrar_formulario)
formulario_atras.addEventListener("click", ocultar_formulario)
formulario_atras.addEventListener("click", reiniciar_formulario)

detalle_back_1.addEventListener("click",mostrar_lista)
detalle_back_1.addEventListener("click",ocultar_detalle)
detalle_back_2.addEventListener("click",mostrar_lista)
detalle_back_2.addEventListener("click",ocultar_detalle)
detalle_back_3.addEventListener("click",mostrar_lista)
detalle_back_3.addEventListener("click",ocultar_detalle)
detalle_back_4.addEventListener("click",mostrar_lista)
detalle_back_4.addEventListener("click",ocultar_detalle)
detalle_back_5.addEventListener("click",mostrar_lista)
detalle_back_5.addEventListener("click",ocultar_detalle)

detalle_portada.addEventListener("click",volver_portada)

list_back.addEventListener("click",ocultar_lista)

stats_portada.addEventListener("click",ocultar_estadisticas)
estadistica_butt.addEventListener("click", mostrar_estadisticas)

let filas = document.querySelectorAll("tr.expandible")
filas.forEach(fila => {fila.addEventListener("click", function(){mostrar_detalle(this)})})

let img_buttons = document.querySelectorAll("img.clickable_image")
img_buttons.forEach(img_button => {img_button.addEventListener("click", function(){agrandar_imagen(this)})})

document.getElementById("region").addEventListener("change", updateComuna);
document.getElementById("tema").addEventListener("change", changeArguments);
document.getElementById("contacto").addEventListener("change", changeContacto);

boton_enviar_formulario.addEventListener("click", ocultar_formulario_valido)
boton_enviar_formulario.addEventListener("click", mostrar_formulario_enviado)
boton_volver_al_formulario.addEventListener("click", ocultar_formulario_valido)
boton_volver_al_formulario.addEventListener("click", mostrar_formulario)
boton_formulario_portada.addEventListener("click", ocultar_formulario_enviado)
boton_formulario_portada.addEventListener("click", reiniciar_formulario)

window.onload = () => {
    poblarRegiones();
    poblarTemas();
    poblarContactos();
    changeArguments();
    changeContacto();
  };