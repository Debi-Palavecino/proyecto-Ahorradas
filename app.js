
window.onload=()=>{
  mostrarCategorias(categorias)
  mostrarOpcionesDeCategorias(categorias)
  const operaciones = JSON.parse(localStorage.getItem("operaciones"))||[];
  pintarOperaciones(operaciones)
}
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
const main = $("#main")
const modalCategoria = $("#modalCategoria");
const botonModalCategoriaAbrir = $("#botonModalCategoria");

const abrirModalCategoria = () => {
  if(modalCategoria.classList.contains("hidden")&& main.classList.contains("flex")){
  modalCategoria.classList.remove("hidden");
    modalCategoria.classList.add("flex");
    main.classList.remove("flex");
    main.classList.add("hidden");
  }
}
botonModalCategoriaAbrir.addEventListener("click", abrirModalCategoria);


const botonAñadirCategoria = $("#boton-añadir-categoria")
const inputCategoria = $("#input-categoria")
const contenedorCategorias = $(".contenedor-categorias")
const categorias= JSON.parse(localStorage.getItem("categorias"))||[];


const guardarCategoria =()=>{
  localStorage.setItem("categorias", JSON.stringify(categorias))
}

const mostrarCategorias = (categorias,id)=>{
  contenedorCategorias.innerHTML = categorias.map((categoria,index) => `
  <div class="flex flex-row justify-around">
   <p id="${index}">${categoria}</p>
    <button id="${id}" class="boton-eliminar bg-red-100">Eliminar</button> 
    <button > Editar </button> </div>
  `).join("")

//const botonesEliminarCategoria = $$(".boton-eliminar") 
//botonesEliminarCategoria.forEach((boton) => {
//  boton.addEventListener("click", () => {
    
   
//  })
//})
}
const agregarCategoria = () => {
  const nuevaCategoria = inputCategoria.value
  if(nuevaCategoria){
    categorias.push(nuevaCategoria)
    inputCategoria.value = ""
    mostrarCategorias()
    guardarCategoria()
    mostrarOpcionesDeCategorias()
  }
}
const inicio = $("#inicio")
const cerrarModalCategoria=()=>{
  if(modalCategoria.classList.contains("flex")&& main.classList.contains("hidden")){
    modalCategoria.classList.remove("flex");
    modalCategoria.classList.add("hidden");
    main.classList.remove("hidden");
    main.classList.add("flex");
  }
}
inicio.addEventListener("click", cerrarModalCategoria)
botonAñadirCategoria.addEventListener("click", agregarCategoria)

const selectDeCategorias =$("#selectDeCategoriasFiltro")
const selectDeCategoriasAgregar=$("#selectDeCategoriasAgregarOperacion")

const mostrarOpcionesDeCategorias = (categorias)=>{
  if(!categorias || categorias.length === 0){
    return
  }
  const opciones = categorias.map((categoria, index) => `
  <option value="${index}">${categoria}</option>`).join("")
  selectDeCategorias.innerHTML = opciones
  selectDeCategoriasAgregar.innerHTML = opciones
}








//Nuevas Operaciones 
const operaciones = JSON.parse(localStorage.getItem("operaciones"))||[];
const guardarOperaciones =()=>{
  localStorage.setItem("operaciones", JSON.stringify(operaciones))
};
guardarOperaciones()
const botonNuevaOperacion = $("#botonAgregarNuevaOperacion")
const modalNuevaOperacion =$("#modalNuevaOperacion")
const mostrarOperacionesEnHTML = $("#mostrarOperaciones")
const mostrarImagen = $("#mostrarImagen")
const nuevaOperacion= $("#nuevaOperacion")
const pintarOperaciones = (id)=>{
  mostrarOperacionesEnHTML.innerHTML = operaciones.map((operacion, index) => 
  `<div class="flex flex-row justify-around">
    <p>${operacion.descripcion}</p>
    <p>${operacion.monto}</p>
    <p>${operacion.categoria}</p>
    <p>${operacion.fecha}</p>
    <button id="${operacion.id}" class="boton-eliminar-operacion">Eliminar</button>
    <button >Editar</button>
    </div>`).join("")
    const botonesEliminarOperacion = $$(".boton-eliminar-operacion")
  botonesEliminarOperacion.forEach((boton)=>{
    boton.addEventListener("click", ()=>{
      console.log(boton.id,"hola")
    eliminarOperacion(id)

  })
})
}
function eliminarOperacion (id){
  operaciones = operaciones.filter((operacion)=>operacion.id !== id)
  guardarOperaciones()
  pintarOperaciones(operaciones)

}
const abrirModalNuevaOperacion = ()=>{
  if(modalNuevaOperacion.classList.contains("hidden")&& main.classList.contains("flex")){
    modalNuevaOperacion.classList.remove("hidden");
    modalNuevaOperacion.classList.add("flex");
    main.classList.remove("flex");
    main.classList.add("hidden");
  }
  mostrarOpcionesDeCategorias()
}
botonNuevaOperacion.addEventListener("click", abrirModalNuevaOperacion)



const inputDescripcion= $("#descripcion")
const inputMonto = $("#montoDeOperacion")
const inputFecha = $("#fechaDeOperacion")
const inputTipo = $("#tipoDeOperacion")
const selectCategoria = $("#selectDeCategoriasAgregarOperacion")

const cargarOperacion =(e)=>{
  e.preventDefault()
  const nuevaOperacion = {
    id: crypto.randomUUID(),
    descripcion:inputDescripcion.value,
    monto: inputMonto.value,
    tipo:inputTipo.value,
    categoria: selectCategoria.value,
    fecha: inputFecha.value,
  }
  operaciones.push(nuevaOperacion)
  guardarOperaciones()
  mostrarOperacionesEnHTML.classList.remove("hidden")
  mostrarOperacionesEnHTML.classList.add("flex")
   main.classList.remove("hidden")
  main.classList.add("flex")
  pintarOperaciones(operaciones)
}


mostrarCategorias(categorias)

nuevaOperacion.addEventListener("click", cargarOperacion)  


const agruparPorCategoria = () => {
  mostrarOperacionesEnHTML.innerHTML=""
  const agrupadosPorCategoria = operaciones.filter(operacion => operacion.categorias === selectCategoria.value);
  pintarOperaciones(agrupadosPorCategoria)
}
selectCategoria.addEventListener("change", agruparPorCategoria)



//<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>    fecha.format('DD/MM/YYYY')
