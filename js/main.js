let form = document.getElementById("formTarea");
let inputTarea = document.getElementById("inputTarea");
let btnAgregarTarea = document.getElementById("btnAgregarTarea");
let contenedorTareas = document.getElementById("contenedorTareas");
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
    alert("La tarea que intentas agregar ya existe.")
  } else {
    alert("La tarea no puede estar vacia.");
  }
  mostrarTareas();
  form.reset()
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
                <button type="button" class="btn btn-sm btn-danger" onclick="borrarTarea(${indiceTarea})">Borrar</button>
                <button type="button" class="btn btn-sm btn-warning">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </article>
  `)
  );
}

function borrarTarea(indiceTarea) {
  listaDeTareas = listaDeTareas.filter((tarea,index)=>index !== indiceTarea)
  mostrarTareas()
}
