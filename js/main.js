let form = document.getElementById("formTarea");
let inputTarea = document.getElementById("inputTarea");
let btnAgregarTarea = document.getElementById("btnAgregarTarea");
let contenedorTareas = document.getElementById("contenedorTareas");
let formEditarTarea = document.getElementById("formEditarTarea");
let inputEditarTarea = document.getElementById("inputEditarTarea");
let listaDeTareas = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

formEditarTarea.addEventListener("submit", (e) => {
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
  contenedorTareas.innerHTML = "";
  listaDeTareas.map(
    (tarea, indiceTarea) =>
      (contenedorTareas.innerHTML += `
      <article class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="card-text">${tarea}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-danger" onclick="borrarTarea(${indiceTarea})"><i class="bi bi-trash"></i></button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditarTarea" 
                onclick="editarTarea(${indiceTarea})"><i class="bi bi-pencil-square"></i></button>
              </div>
            </div>
          </div>
        </div>
      </article>
  `)
  );
}

function borrarTarea(indiceTarea) {
  listaDeTareas = listaDeTareas.filter((tarea, index) => index !== indiceTarea);
  mostrarTareas();
}

function editarTarea(indiceTarea) {
  inputEditarTarea.value = listaDeTareas[indiceTarea];
  let btnGuardarTarea = document.getElementById("btnGuardarTarea");
  btnGuardarTarea.addEventListener("click", () => {
    let tareaEditada = inputEditarTarea.value;
    tareaEditada = tareaEditada.trim();
    if (tareaEditada !== "" && !listaDeTareas.includes(tareaEditada)) {
      listaDeTareas[indiceTarea] = tareaEditada;
      mostrarTareas();
    } else if (listaDeTareas.includes(tareaEditada)) {
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
  });
}
