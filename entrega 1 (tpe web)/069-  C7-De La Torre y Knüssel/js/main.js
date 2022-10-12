"use strict"
let form = document.querySelector('#form');
form.addEventListener('submit', funcionDevalidar) ;

/*function agregar(e){
    e.preventDefault();


    //para agarrar todos los datos del form
    let formData = new FormData(form);

    let email= formData.get('email');
    let nombre= formData.get('nombre');
    let password = formData.get('password');

    console.log(nombre, email, password);
}
*/

/*let btn = document.querySelector ('#btn-enviar');
btn.addEventListener('click', funcionDevalidar);*/
let button = document.querySelector("#btn-enviar")
button.addEventListener ("click", funcionDevalidar);
let captcha = document.querySelector("#textBox")


function funcionDevalidar(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let email= formData.get('email');
    let nombre= formData.get('nombre');
    let password = formData.get('password');

    console.log(nombre, email, password);

    const valorCorrecto = 'ABCD';
    let textBox = captcha.value

    if (textBox == valorCorrecto) {
       alert ("captcha correcto");       
    }
    
    else {
        alert ("captcha incorrecto, ingrese de nuevo");
    }     
    
}