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
  if (tarea !== "") {
    listaDeTareas.push(tarea);
    console.log(`Se agrego la tarea ${tarea}`);
  } else {
    alert("La tarea no puede estar vacia.")
  }
  console.log(listaDeTareas);
}

