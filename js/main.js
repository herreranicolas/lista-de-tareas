class Tarea {
  constructor(textoTarea, tareaCompleta = false) {
    this.textoTarea = textoTarea;
    this.tareaCompleta = tareaCompleta;
    this.idTarea;
  }
}

let form = document.getElementById("formTarea");
let inputTarea = document.getElementById("inputTarea");
let btnAgregarTarea = document.getElementById("btnAgregarTarea");
let contenedorTareas = document.getElementById("contenedorTareas");
let listadoDeTareas = JSON.parse(localStorage.getItem("tareas")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTarea();
});

function agregarTarea() {
  let nuevaTarea = new Tarea(inputTarea.value.trim());
  if (nuevaTarea.textoTarea !== "" && !listadoDeTareas.includes(nuevaTarea)) {
    listadoDeTareas.push(nuevaTarea);
    // guardar en local storage
    localStorage.setItem("tareas", JSON.stringify(listadoDeTareas));
  } else if (listadoDeTareas.includes(nuevaTarea)) {
    Swal.fire({
      icon: "error",
      iconColor: "#6e786c",
      title: "Oops...Lo siento",
      text: "La tarea que deseas agregar ya existe.",
      background: "#cbf1c4",
      color: "#6e786c",
      confirmButtonColor: "#6e786c",
    });
  } else {
    Swal.fire({
      icon: "error",
      iconColor: "#6e786c",
      title: "Oops...Lo siento",
      text: "La tarea no puede estar vacía.",
      background: "#cbf1c4",
      color: "#6e786c",
      confirmButtonColor: "#6e786c",
    });
  }
  mostrarTareas();
  form.reset();
}

function mostrarTareas() {
  if (listadoDeTareas.length === 0) {
    contenedorTareas.innerHTML = `<p class="lead text-center m-1">No tienes tareas pendientes</p>`;
    contenedorTareas.classList.add("justify-content-center");
  } else {
    contenedorTareas.innerHTML = "";
    contenedorTareas.classList.remove("justify-content-center");
    listadoDeTareas.map((tarea, idTarea) => {
      contenedorTareas.innerHTML += `
      <article class="col">
        <div class="card shadow-sm">
          <div class="card-body">
              ${
                tarea.tareaCompleta
                  ? `<textarea readonly class="form-control-plaintext text-decoration-line-through" type="text" id="inputEditarTarea${(tarea.idTarea =
                      idTarea)}" autocomplete="off">${
                      tarea.textoTarea
                    }</textarea>`
                  : `<textarea readonly class="form-control-plaintext" type="text" id="inputEditarTarea${(tarea.idTarea =
                      idTarea)}" autocomplete="off" maxlength="50">${
                      tarea.textoTarea
                    }</textarea>`
              }
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn"
                id="btnCompletarTarea${(tarea.idTarea = idTarea)}"
                onclick="completarTarea(${(tarea.idTarea = idTarea)})">${
        tarea.tareaCompleta
          ? `<i class="bi bi-x-circle-fill"></i></button>`
          : `<i class="bi bi-check-circle"></i></button> <button type="button" class="btn" id="btnEditarTarea${(tarea.idTarea =
              idTarea)}"
                          onclick="editarTarea(${(tarea.idTarea =
                            idTarea)})"><i class="bi bi-pencil-square"></i></button>`
      }
                <button type="button" class="btn"
                id="btnBorrarTarea${(tarea.idTarea =
                  idTarea)}" onclick="borrarTarea(${(tarea.idTarea =
        idTarea)})"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </article>
      `;
      let inputEditarTarea = document.getElementById(
        `inputEditarTarea${(tarea.idTarea = idTarea)}`
      );
      if (inputEditarTarea.innerHTML.length < 25) {
        inputEditarTarea.style.height = "1.75rem";
      }
    });
  }
}

function borrarTarea(idTarea) {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "¡No podrás revertir este cambio!",
    icon: "warning",
    iconColor: "#6e786c",
    showCancelButton: true,
    confirmButtonColor: "#6e786c",
    cancelButtonColor: "#6e786c",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      listadoDeTareas = listadoDeTareas.filter(
        (tarea, index) => index !== idTarea
      );
      localStorage.setItem("tareas", JSON.stringify(listadoDeTareas));
      mostrarTareas();
      Swal.fire({
        icon: "success",
        iconColor: "#6e786c",
        title: "¡Realizado!",
        text: "Eliminaste la tarea.",
        background: "#cbf1c4",
        color: "#6e786c",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

function editarTarea(idTarea) {
  let btnEditarTarea = document.getElementById(`btnEditarTarea${idTarea}`);
  let inputEditarTarea = document.getElementById(`inputEditarTarea${idTarea}`);
  let btnCompletarTarea = document.getElementById(
    `btnCompletarTarea${idTarea}`
  );
  let btnBorrarTarea = document.getElementById(`btnBorrarTarea${idTarea}`);
  let grupoDeBotones = document.querySelectorAll(".btn");
  inputEditarTarea.removeAttribute("readonly");
  let end = inputEditarTarea.value.length;
  inputEditarTarea.setSelectionRange(end, end);
  inputEditarTarea.focus();
  btnEditarTarea.innerHTML = "Editar tarea";
  btnCompletarTarea.disabled = true;
  btnBorrarTarea.disabled = true;
  btnCompletarTarea.style.display = "none";
  btnBorrarTarea.style.display = "none";
  grupoDeBotones.forEach((button) => {
    if (button.id !== `btnEditarTarea${idTarea}`) {
      button.disabled = true;
    }
  });
  inputEditarTarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnEditarTarea.click();
    }
  });

  btnEditarTarea.addEventListener("click", () => {
    let tareaEditada = inputEditarTarea.value;
    tareaEditada = tareaEditada.trim();
    if (tareaEditada !== "") {
      btnCompletarTarea.disabled = false;
      btnBorrarTarea.disabled = false;
      btnCompletarTarea.style.display = "initial";
      btnBorrarTarea.style.display = "initial";
      btnEditarTarea.setAttribute("readonly", "readonly");
      btnEditarTarea.innerHTML = `<i class="bi bi-pencil-square"></i>`;
      listadoDeTareas[idTarea].textoTarea = tareaEditada;
      localStorage.setItem("tareas", JSON.stringify(listadoDeTareas))
      inputEditarTarea.blur();
      btnAgregarTarea.disabled = false;
      mostrarTareas();
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "#6e786c",
        title: "Oops...Lo siento",
        text: "La tarea no puede estar vacía.",
        background: "#cbf1c4",
        color: "#6e786c",
        confirmButtonColor: "#6e786c",
      });
    }
  });
}

function completarTarea(idTarea) {
  let btnEditarTarea = document.getElementById(`btnEditarTarea${idTarea}`);
  let btnCompletarTarea = document.getElementById(
    `btnCompletarTarea${idTarea}`
  );
  let inputEditarTarea = document.getElementById(`inputEditarTarea${idTarea}`);
  if (btnCompletarTarea.innerHTML !== `<i class="bi bi-x-circle-fill"></i>`) {
    inputEditarTarea.classList.add("text-decoration-line-through");
    btnCompletarTarea.innerHTML = "";
    btnCompletarTarea.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
    btnEditarTarea.disabled = true;
    btnEditarTarea.style.display = "none";
    listadoDeTareas[idTarea].tareaCompleta = true;
    localStorage.setItem("tareas", JSON.stringify(listadoDeTareas));
    Swal.fire({
      icon: "success",
      iconColor: "#6e786c",
      title: "¡Felicidades!",
      text: "Completaste la tarea.",
      background: "#cbf1c4",
      color: "#6e786c",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    inputEditarTarea.classList.remove("text-decoration-line-through");
    listadoDeTareas[idTarea].tareaCompleta = false;
    localStorage.setItem("tareas", JSON.stringify(listadoDeTareas));
    btnCompletarTarea.innerHTML = `<i class="bi bi-check-circle"></i>`;
  }
  mostrarTareas();
}

mostrarTareas()