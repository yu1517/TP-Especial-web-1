"use strict";
document.addEventListener("DOMContentLoaded", obtenerDatos);
const url = "https://62b8baac03c36cb9b7cb1cfd.mockapi.io/api/v1/Productos";
const tbody = document.querySelector("#tbody");
const botonCargar = document.querySelector("#button");
const modificarForm = document.querySelector("#modificarForm");
const cargar = document.querySelector(".cargar");
botonCargar.addEventListener("click", enviarDatos);

//funcion para mostrar la tabla.
async function obtenerDatos() {
  try {
    tbody.innerHTML = "";
    let res = await fetch(url);
    equipos = await res.json();
    for (let team of equipos) {
      let pais = team.pais;
      let equipo = team.equipo;
      let figura = team.figura;

      tbody.innerHTML += `<tr>
      <td>${pais}</td>
      <td>${equipo}</td>
      <td>${figura}</td>
      <td class="tdapi"><button class="editarApi" type="button" data-id="${team.id}"><img src="editar.png"></button></td>
      <td class="tdapi"><button class="eliminarApi" type="button" data-id="${team.id}"><img src="eliminar.png"</button></td>
      </tr>`;
    }
    asociarEventos();
    idBtnEliminar();
  } catch (error) {
    console.log("error");
  }
}
let equipos = [];

function initEditForm(event) {
  modificarForm.classList.remove("modificarForm");
  cargar.classList.add("modificarForm");
  const idSeleccionado = this.dataset.id;
  let equipoSeleccionado = equipos.find(function (team) {
    return team.id == idSeleccionado;
  });
  inputEditId.value = equipoSeleccionado.id;
  inputEditPais.value = equipoSeleccionado.pais;
  inputEditEquipo.value = equipoSeleccionado.equipo;
  inputEditFigura.value = equipoSeleccionado.figura;
}

function asociarEventos() {
  let botonesEditar = document.querySelectorAll(".editarApi");
  for (let btn of botonesEditar) {
    btn.addEventListener("click", initEditForm);
  }
}

let formEdit = document.querySelector("#formEdit");
formEdit.addEventListener("submit", modificar);

async function modificar(event) {
  event.preventDefault();
  // Armar el FormData
  let formData = new FormData(this);
  let newTeam = {
    pais: formData.get("pais"),
    equipo: formData.get("equipo"),
    figura: formData.get("figura"),
  };
  // Hacer el PUT
  let response = null;
  try {
    response = await fetch(url + "/" + formData.get("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeam),
    });
  } catch (ex) {
    console.log(ex);
  }
  if (response == null) {
    return;
  }

  console.log(response.ok);
  modificarForm.classList.add("modificarForm");
  formEdit.reset();
  await enviarDatos();
}

function idBtnEliminar() {
  let eliminar = document.querySelectorAll(".eliminarApi");
  for (let index of eliminar) {
    index.addEventListener("click", function () {
      let id = index.dataset.id;
      eliminarEquipos(id);
    });
  }
}
async function eliminarEquipos(id) {
  try {
    let respuesta = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (respuesta.status == 200) {
      console.log("Datos eliminados correctamente!");
    }
    await obtenerDatos();
  } catch (error) {
    console.log("error! algo no salio bien!");
  }
}

//funcion enviarDatos
async function enviarDatos() {
  let pais = document.querySelector("#pais").value;
  let equipo = document.querySelector("#equipo").value;
  let figura = document.querySelector("#figura").value;
  let item = {
    pais: pais, //cuando indento se me salen las comillas de estos json. no indentar con CTRL S.
    equipo: equipo,
    figura: figura,
  };
  try {
    let respuesta = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    await obtenerDatos();
    if (respuesta.status == 201) {
      console.log("Datos subidos correctamente!");
    }
  } catch (error) {
    console.log("error! algo no salio bien!");
    msg.innerHTML = "error! algo no salio bien!";
  }
}