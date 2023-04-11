let form = document.getElementById("formTarea");
let inputTarea = document.getElementById("inputTarea");
let btnAgregarTarea = document.getElementById("btnAgregarTarea");
let contenedorTareas = document.getElementById("contenedorTareas");
let inputEditarTarea = document.getElementById("inputEditarTarea");
let listaDeTareas = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

btnAgregarTarea.addEventListener("click", agregarTarea);

function agregarTarea() {
  let tarea = inputTarea.value;
  tarea = tarea.trim();
  if (tarea !== "" && !listaDeTareas.includes(tarea)) {
    listaDeTareas.push(tarea);
  } else if (listaDeTareas.includes(tarea)) {
    Swal.fire({
      icon: "error",
      title: "Oops...Lo siento",
      text: "La tarea que deseas agregar ya existe.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...Lo siento",
      text: "La tarea no puede estar vacía.",
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
      (tarea, indiceTarea) =>
        (contenedorTareas.innerHTML += `
      <article class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <input readonly class="form-control-plaintext" type="text" value="${tarea}" id="inputEditarTarea${indiceTarea}" autocomplete="off"></input>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-danger" onclick="borrarTarea(${indiceTarea})"><i class="bi bi-trash"></i></button>
                <button type="button" class="btn btn-warning" id="btnEditarTarea${indiceTarea}"
                onclick="editarTarea(${indiceTarea})"><i class="bi bi-pencil-square"></i></button>
              </div>
            </div>
          </div>
        </div>
      </article>
  `)
    );
  }
}

function borrarTarea(indiceTarea) {
  listaDeTareas = listaDeTareas.filter((tarea, index) => index !== indiceTarea);
  mostrarTareas();
}

function editarTarea(indiceTarea) {
  let btnEditarTarea = document.getElementById(`btnEditarTarea${indiceTarea}`);
  let inputEditarTarea = document.getElementById(
    `inputEditarTarea${indiceTarea}`
  );
  inputEditarTarea.removeAttribute("readonly");
  inputEditarTarea.focus();
  btnEditarTarea.innerHTML = "Guardar tarea";
  btnEditarTarea.addEventListener("click", () => {
    let tareaEditada = inputEditarTarea.value;
    if (tareaEditada !== "") {
      btnEditarTarea.setAttribute("readonly", "readonly");
      btnEditarTarea.innerHTML = `<i class="bi bi-pencil-square"></i>`;
      listaDeTareas[indiceTarea] = tareaEditada;
      inputEditarTarea.blur();
      mostrarTareas();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...Lo siento",
        text: "La tarea no puede estar vacía.",
      });
    }
  });
}
