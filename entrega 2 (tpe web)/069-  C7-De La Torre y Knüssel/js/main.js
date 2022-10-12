
"use strict"
/*interaccion con la barra de menu*/
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}

/*captcha*/
document.querySelector("#btn-enviar").addEventListener("click", verificarCaptcha);
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/*genera un string random, con las letras que figuran arriba en characters, con el length le damos la longitud que queremos que muestre el captcha*/
function generateString(length) {
    let result = ' '; /*declaro la variable result en vacio, para que despues la pise con los caracteres que me da*/
    const charactersLength = characters.length;/*genera una constante y le da la longitud de caracters en base al length*/
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); /*el math randon genera variables del 0 al 1, multiplica con la cantidad de chars length que le damos y al dar un nro con coma le ponemos el floor para que tome el piso, ese numero es la posicion de la letra que toma y este proceso lo repite length veces (en este caso 4)*/
    }

    return result;/*devuelve los 4 chars elegidos en el for*/
}
let valorCorrecto = generateString(4);
let captcha = document.querySelector("#captcha");
//let textBox = captcha.value;
captcha.textContent = valorCorrecto;

function verificarCaptcha() {
    let textBox = document.querySelector("#ingreso").value;

    console.log(textBox, valorCorrecto);

    if (textBox.trim() === valorCorrecto.trim()) { /*los 3 = compara de forma estricta la variable y el trim elimina los espacios en blaco, elimina  lo que esta de mas*/
        alert("captcha correcto");

    }

    else {
        alert("captcha incorrecto, por favor ingrese de nuevo");
    }
}


/*formulario*/

let negocios = [];
let btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", agregar);
btnAdd.addEventListener('click', limpiar_input);
let btnQuitar = document.querySelector("#btnQuitar");
btnQuitar.addEventListener("click", eliminar);
let btnAddx3 = document.querySelector("#btnAddx3");
btnAddx3.addEventListener("click", agregarx3);
btnAddx3.addEventListener('click', limpiar_input);

function agregar() {
    //cargar variables
    let datos_form = {
        "nombre": document.querySelector("#Nombre").value,
        "calle": document.querySelector("#Calle").value,
        "altura": document.querySelector("#Altura").value,
        "telefono": document.querySelector("#Telefono").value,
        "red_social": document.querySelector("#Red_social").value,
        "tipoDeNegocio": document.querySelector("#Tipo_negocio").value
    }
    //cargar en la tabla
    negocios.push(datos_form);

    let tabla_negocios = document.querySelector("#tabla");
    tabla_negocios.innerHTML += "<tr>" + "<td>" + datos_form.nombre + "</td>" + "<td>" + datos_form.calle + "</td>" + "<td>" + datos_form.altura + "</td>" + "<td>" + datos_form.telefono + "</td>" + " <td>" + datos_form.red_social + "</td>" + "<td>" + datos_form.tipoDeNegocio + "</td>" + "</tr>";
}

function agregarx3() {
    const max = 3;
    for (let i = 0; i < max; i++) {
        agregar();
    }
}

function limpiar_input() {
    document.querySelector("#Nombre").value = "";
    document.querySelector("#Calle").value = "";
    document.querySelector("#Altura").value = "";
    document.querySelector("#Telefono").value = "";
    document.querySelector("#Red_social").value = "";
    document.querySelector("#Tipo_negocio").value = "";
}

function eliminar() {
    let tabla_productos = document.querySelector("#tabla");
    tabla_productos.innerHTML = "";
}

