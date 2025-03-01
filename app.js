
window.onload=()=>{
  const operaciones = JSON.parse(localStorage.getItem("operaciones"))||[];
  pintarOperaciones(operaciones)
  actualizarCategoria(categoriasDelLocalStorage)
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


const botonAñadirCategoria = $("#boton-añadir-categoria")
const inputNuevaCategoria = $("#input-categoria")
const contenedorCategorias = $(".contenedor-categorias")
const selectFiltroCategoria =$("#selectDeCategoriasFiltro")
const selectDeCategoriasAgregarOperacion=$("#selectDeCategoriasAgregarOperacion")

let categoriasDelLocalStorage = JSON.parse(localStorage.getItem("categorias")) || [{categoria:"Todos", id:"1"}]

const guardarCategoriasEnLocalStorage = ()=>{
  localStorage.setItem("categorias", JSON.stringify(categoriasDelLocalStorage))
}

const agregarNuevaCategoria = ()=>{
  const nuevaCategoria = inputNuevaCategoria.value.trim()
   const categoriaAlLocal = {
    categoria: nuevaCategoria,
    id:crypto.randomUUID()
   }
   console.log(categoriaAlLocal)
   categoriasDelLocalStorage.push(categoriaAlLocal)
   guardarCategoriasEnLocalStorage()
   actualizarCategoria(categoriasDelLocalStorage)
   mostrarCategorias(categoriasDelLocalStorage)
   inputNuevaCategoria.value = ""
}
botonAñadirCategoria.addEventListener("click",agregarNuevaCategoria)

const actualizarCategoria = (categorias)=>{
  selectFiltroCategoria.innerHTML=""
  selectDeCategoriasAgregarOperacion.innerHTML=""
  const opcionParaSelectFiltroAgregar = categorias.map(categoria=>
    `<option value="${categoria.categoria}">${categoria.categoria}</option>`).join("")
    selectFiltroCategoria.innerHTML = opcionParaSelectFiltroAgregar
    selectDeCategoriasAgregarOperacion.innerHTML= opcionParaSelectFiltroAgregar
}
const mostrarCategorias = (categorias)=>{
  contenedorCategorias.innerHTML=""
  const categoriasHTML = categorias.map(categoria=>{
    contenedorCategorias.innerHTML= `<div class="categoria" id="${categoria.id}">${categoria.categoria} 
    <button id="${categoria.id}"> eliminar </button>
    <button id="${categoria.id}">editar <button>
    </div>`
  }).join("")
  contenedorCategorias.innerHTML= categoriasHTML
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
const pintarOperaciones = (operacionPorPintar)=>{
  mostrarOperacionesEnHTML.innerHTML = operacionPorPintar.map((operacion) => 
  `<div class="flex flex-row justify-around">
    <p>${operacion.descripcion}</p>
    <p>${operacion.categoria}</p>
    <p>${operacion.monto}</p>
    <p>${operacion.fecha}</p>
    <button id="${operacion.id}" class="boton-eliminar-operacion">Eliminar</button>
    <button >Editar</button>
    </div>`).join("")
    const botonesEliminarOperacion = $$(".boton-eliminar-operacion")
  botonesEliminarOperacion.forEach((boton)=>{
    boton.addEventListener("click", (e)=>{
      console.log(e)
    eliminarOperacion(boton.id)

  })
})
}
function eliminarOperacion (id){
  const index = operaciones.findIndex((operacion) => operacion.id === id);
  if (index !== -1) {
    operaciones.splice(index, 1); 
  }
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

const cargarOperacion =(e)=>{
  e.preventDefault()
  const nuevaOperacion = {
    id: crypto.randomUUID(),
    descripcion:inputDescripcion.value,
    monto: Number(inputMonto.value),
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


//mostrarCategorias(categorias)

nuevaOperacion.addEventListener("click", cargarOperacion)  

//..... filtros
 //const selectFiltroCategoria =$("#selectDeCategoriasFiltro")
const agruparPorCategoria = () => {
  console.log("hola")
  console.log(selectFiltroCategoria.value)
  console.log(operaciones)
  mostrarOperacionesEnHTML.innerHTML=""
  const agrupadosPorCategoria = operaciones.filter(operacion => operacion.categoria === selectFiltroCategoria.value);
  console.log(agrupadosPorCategoria)

  pintarOperaciones(agrupadosPorCategoria)
}
selectFiltroCategoria.addEventListener("change", agruparPorCategoria)


//<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>    fecha.format('DD/MM/YYYY')
