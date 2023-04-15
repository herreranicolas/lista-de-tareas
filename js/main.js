let form = document.getElementById("formTarea");
let inputTarea = document.getElementById("inputTarea");
let btnAgregarTarea = document.getElementById("btnAgregarTarea");
let contenedorTareas = document.getElementById("contenedorTareas");
let listaDeTareas = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTarea();
});

function agregarTarea() {
  let tarea = inputTarea.value;
  tarea = tarea.trim();
  if (tarea !== "" && !listaDeTareas.includes(tarea)) {
    listaDeTareas.push(tarea);
  } else if (listaDeTareas.includes(tarea)) {
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
  if (listaDeTareas.length === 0) {
    contenedorTareas.innerHTML = `<p class="lead text-center m-1">No tienes tareas pendientes</p>`;
    contenedorTareas.classList.add("justify-content-center");
  } else {
    contenedorTareas.innerHTML = "";
    contenedorTareas.classList.remove("justify-content-center");
    listaDeTareas.forEach(
      (tarea, indiceTarea) =>{
        contenedorTareas.innerHTML += `
      <article class="col">
        <div class="card shadow-sm">
          <div class="card-body">
          <textarea
                readonly
                class="form-control-plaintext"
                type="text"
                id="inputEditarTarea${indiceTarea}"
                autocomplete="off"
              >${tarea}</textarea>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn"
                id="btnCompletarTarea${indiceTarea}"
                onclick="completarTarea(${indiceTarea})"><i class="bi bi-check-circle"></i></button>
                <button type="button" class="btn" id="btnEditarTarea${indiceTarea}"
                onclick="editarTarea(${indiceTarea})"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn"
                id="btnBorrarTarea${indiceTarea}" onclick="borrarTarea(${indiceTarea})"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </article>
  `;
      }
    );
  }
}

function borrarTarea(indiceTarea) {
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
      listaDeTareas = listaDeTareas.filter(
        (tarea, index) => index !== indiceTarea
      );
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

function editarTarea(indiceTarea) {
  let btnEditarTarea = document.getElementById(`btnEditarTarea${indiceTarea}`);
  let inputEditarTarea = document.getElementById(
    `inputEditarTarea${indiceTarea}`
  );
  let btnCompletarTarea = document.getElementById(
    `btnCompletarTarea${indiceTarea}`
  );
  let btnBorrarTarea = document.getElementById(`btnBorrarTarea${indiceTarea}`);
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
    if (button.id !== `btnEditarTarea${indiceTarea}`) {
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
    tareaEditada = tareaEditada.trim()
    if (tareaEditada !== "") {
      btnCompletarTarea.disabled = false;
      btnBorrarTarea.disabled = false;
      btnCompletarTarea.style.display = "initial";
      btnBorrarTarea.style.display = "initial";
      btnEditarTarea.setAttribute("readonly", "readonly");
      btnEditarTarea.innerHTML = `<i class="bi bi-pencil-square"></i>`;
      listaDeTareas[indiceTarea] = tareaEditada;
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

function completarTarea(indiceTarea) {
  let btnEditarTarea = document.getElementById(`btnEditarTarea${indiceTarea}`);
  let btnCompletarTarea = document.getElementById(
    `btnCompletarTarea${indiceTarea}`
  );
  let inputEditarTarea = document.getElementById(
    `inputEditarTarea${indiceTarea}`
  );
  if (btnCompletarTarea.innerHTML !== `<i class="bi bi-x-circle-fill"></i>`) {
    inputEditarTarea.classList.add("text-decoration-line-through");
    btnCompletarTarea.innerHTML = "";
    btnCompletarTarea.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
    btnEditarTarea.disabled = true;
    btnEditarTarea.style.display = "none";
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
    btnEditarTarea.disabled = false;
    btnEditarTarea.style.display = "initial";
    btnCompletarTarea.innerHTML = `<i class="bi bi-check-circle"></i>`;
  }
}
