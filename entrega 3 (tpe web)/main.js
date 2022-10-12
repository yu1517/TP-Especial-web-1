"use strict"

//interaccion con la barra de menu/
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}



//captcha/
document.querySelector("#btn-enviar").addEventListener("click", verificarCaptcha);
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//genera un string random, con las letras que figuran arriba en characters, con el length le damos la longitud que queremos que muestre el captcha/
function generateString(length) {
    let result = ' '; //declaro la variable result en vacio, para que despues la pise con los caracteres que me da/
    const charactersLength = characters.length;//genera una constante y le da la longitud de caracters en base al length/
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); //el math randon genera variables del 0 al 1, multiplica con la cantidad de chars length que le damos y al dar un nro con coma le ponemos el floor para que tome el piso, ese numero es la posicion de la letra que toma y este proceso lo repite length veces (en este caso 4)/
    }

    return result;//devuelve los 4 chars elegidos en el for/
}
let valorCorrecto = generateString(4);
let captcha = document.querySelector("#captcha");
//let textBox = captcha.value;
captcha.textContent = valorCorrecto;

function verificarCaptcha() {
    let textBox = document.querySelector("#ingreso").value;

    console.log(textBox, valorCorrecto);

    if (textBox.trim() === valorCorrecto.trim()) { //los 3 = compara de forma estricta la variable y el trim elimina los espacios en blaco, elimina  lo que esta de mas/
        alert("captcha correcto");

    }

    else {
        alert("captcha incorrecto, por favor ingrese de nuevo");
    }
}


/formulario/
let formSubmit = document.querySelector("#form_tabla_dinamica");
formSubmit.addEventListener("submit", function (e) {
    e.preventDefault();
    agregar();
});

//tabla con api
const url = 'https://62c483917d83a75e39fb9ae1.mockapi.io/api/v1/locales';
let id = 0;
async function mostrar() {
    let tabla = document.querySelector("#tabla");
    tabla.innerHTML = " ";
    try {
        let respuesta = await fetch(url);
        let locales = await respuesta.json();

        console.log("respuesta ", respuesta);
        if (respuesta.ok) {
            for (let negocio of locales) {
                let Nombre = negocio.Nombre;
                let Calle = negocio.Calle;
                let Altura = negocio.Altura;
                let Telefono = negocio.Telefono;
                let Redes = negocio.Redes;
                let TipoNegocio = negocio.TipoNegocio
                id = negocio.id;

                tabla.innerHTML += `
                <tr id= "tr-${id}">
                
                    <td>${Nombre}</td>    
                    <td>${Calle}</td>
                    <td>${Altura}</td>
                    <td>${Telefono}</td>
                    <td>${Redes}</td>
                    <td>${TipoNegocio}</td>
                    <td class="tdApi">
                        <img src="images/editar.png" id="${id}" class= "btnApi-editar">
                    </td>
                    <td class="tdApi">
                        <img src="images/eliminar.png" id="${id}" class="btnApi-eliminar">
                    </td>
                </tr> `
                let btnModificar = document.querySelectorAll(".btnApi-editar");
                for (let btn of btnModificar) {
                    btn.addEventListener("click", function (e) {
                        let idRow = e.target.id;
                        modificarApi(idRow);
                    });
                }
                let btnBorrar = document.querySelectorAll(".btnApi-eliminar");
                for (let btn of btnBorrar) {
                    btn.addEventListener("click", function (e) {
                        let idRow = e.target.id;
                        eliminarApi(idRow);
                    })
                }
            }


        }
    } catch (error) {
        console.log(error);
    }
}

//form 2(para modificar, los traemos del dom para modificarlos)
let nombreModificado = document.querySelector("#NombreMod");
let calleModificado = document.querySelector("#CalleMod");
let alturaModificado = document.querySelector("#AlturaMod");
let telefonoModificado = document.querySelector("#TelefonoMod");
let redesModificado = document.querySelector("#Red_socialMod");
let tiponegocioModificado = document.querySelector("#Tipo_negocioMod");
let btnEditar = document.querySelector('#btnModificar');

async function modificarApi(id) {
    let response = await fetch(`${url}/${id}`);
    let json = await response.json();//se pegan los valores a los imput cn el fetch
    nombreModificado.value = json.Nombre;
    calleModificado.value = json.Calle;
    alturaModificado.value = json.Altura;
    telefonoModificado.value = json.Telefono;
    redesModificado.value = json.Redes;
    tiponegocioModificado.value = json.TipoNegocio;
    btnEditar.addEventListener('click', editar) //al crear el eventlistener , y volver a editar, volvia a hacer dos event, y creaba dos put y dos get x eso el remove
    function editar() {
        let json = {
            Nombre: nombreModificado.value,
            Calle: calleModificado.value,
            Altura: alturaModificado.value,
            Telefono: telefonoModificado.value,
            Redes: redesModificado.value,
            TipoNegocio: tiponegocioModificado.value
        }
        insertarMod(id, json);
        btnEditar.removeEventListener('click', editar);//una vez editado remueve el click del boton y no se copia mas de una vez (suma los editados)
    }
}




async function insertarMod(id, json) { //este es el que modifica y sobreescribe los valores en el json

    try {
        let respuesta = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify(json),
        });
        if (respuesta.ok) {
            console.log("Modificado");
            mostrar();
        }
    }
    catch (error) {
        console.log(error);
    }
}


async function agregar() {
    try {
        let nombre = document.querySelector("#Nombre").value;
        let calle = document.querySelector("#Calle").value;
        let altura = document.querySelector("#Altura").value;
        let telefono = document.querySelector("#Telefono").value;
        let redes = document.querySelector("#Red_social").value;
        let tiponegocio = document.querySelector("#Tipo_negocio").value;

        let agregarLocal = {
            Nombre: nombre,
            Calle: calle,
            Altura: altura,
            Telefono: telefono,
            Redes: redes,
            TipoNegocio: tiponegocio
        };



        let respuesta = await fetch(url, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(agregarLocal),
        });
        if (respuesta.ok) {
            console.log(agregarLocal);
            mostrar();
        }

    }
    catch (error) {
        console.log(error);
    }
}

async function eliminarApi(idToDelete) {
    console.log("hola", idToDelete);
    try {
        let respuesta = await fetch(`${url}/${idToDelete}`, {
            "method": "DELETE"
        });
        if (respuesta.ok) {
            mostrar();

        }

    }
    catch (error) {
        console.log(error);
    }
}

mostrar();