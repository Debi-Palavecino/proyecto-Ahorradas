
window.onload=()=>{
  const operaciones = JSON.parse(localStorage.getItem("operaciones"))||[];
  if(operaciones.length === 0){
    const mostrarImagen = $("#mostrarImagen")
    mostrarImagen.classList.remove("hidden")
    mostrarImagen.classList.add("flex")
    mostrarOperacionesEnHTML.classList.add("hidden")
    mostrarOperacionesEnHTML.classList.remove("flex")
   }else if (operaciones.length > 0){
     mostrarOperacionesEnHTML.classList.remove("hidden")
     mostrarOperacionesEnHTML.classList.add("flex")
     mostrarImagen.classList.add("hidden")
     mostrarImagen.classList.remove("flex")
   }
  pintarOperaciones(operaciones)
  actualizarCategoria(categoriasDelLocalStorage)
  sumaDeGanancias()
  sumarGastos()
  sumaDelBalance()
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
  console.log("click")
  console.log(modalCategoria)
  if(modalCategoria.classList.contains("hidden")&& main.classList.contains("flex")){
  modalCategoria.classList.remove("hidden");
    modalCategoria.classList.add("flex");
    main.classList.remove("flex");
    main.classList.add("hidden");
  }
}
botonModalCategoriaAbrir.addEventListener("click", abrirModalCategoria);
const inicio = $("#inicio")
const botonInicioBalance = $("#botonInicioBalance")
const botonAnclaInicioBalance = ()=>{
  cerrarModalCategoria()
  // falta funcion cerrarModalReportes
  // falta funcion cerrarOperaciones
}
botonInicioBalance.addEventListener("click",botonAnclaInicioBalance)
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
actualizarCategoria(categoriasDelLocalStorage)
const mostrarCategorias = (categorias)=>{
  contenedorCategorias.innerHTML=""
  const categoriasFiltradas = categorias.filter(categoria => categoria.categoria !== "Todos")
  const categoriasHTML = categoriasFiltradas.map(categoria => `
    <div class="categoria" id="${categoria.id}">
      ${categoria.categoria}
      <button class="btn-eliminar" data-id="${categoria.id}">Eliminar</button>
      <button class="btn-editar" data-id="${categoria.id}">Editar</button>
    </div>
  `).join("");

  // Insertar el HTML generado en el contenedor
  contenedorCategorias.innerHTML = categoriasHTML;
}
mostrarCategorias(categoriasDelLocalStorage)





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
  `<div class="flex flex-row justify-around bg-gray-200 rounded-md h-[3rem] m-3 p-5 align-center text-center">
    <p>${operacion.descripcion}</p>
    <p>${operacion.categoria}</p> 
    <p>${operacion.monto}</p>
    <p>${operacion.fecha}</p>
    <button id="${operacion.id}" class="boton-eliminar-operacion  ">Eliminar</button>
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
  actualizarCategoria(categoriasDelLocalStorage)
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
    categoria:selectDeCategoriasAgregarOperacion.value,
    fecha: dayjs(inputFecha.value).format("YYYY/MM/DD")
  }
  console.log(nuevaOperacion)
  operaciones.push(nuevaOperacion)
  guardarOperaciones()
  mostrarOperacionesEnHTML.classList.remove("hidden")
  mostrarOperacionesEnHTML.classList.add("flex")
   main.classList.remove("hidden")
  main.classList.add("flex")
  pintarOperaciones(operaciones)
  sumaDeGanancias()
  sumarGastos()
  sumaDelBalance()
}

const botonCancelarNuevaOperacion = $("#cancelarNuevaOperacion")
const cancelarNuevaOperacion = (e)=>{
  e.preventDefault()
  console.log("hola")
  modalNuevaOperacion.classList.remove("flex");
  modalNuevaOperacion.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("flex");
}
botonCancelarNuevaOperacion.addEventListener("click",cancelarNuevaOperacion)
//mostrarCategorias(categorias)

nuevaOperacion.addEventListener("click", cargarOperacion)  
//Balance
//gastos 
const parrafoGanancias = $("#parrafoGanancias")
const sumaDeGanancias = ()=>{
  const totalDeGanancias = (operaciones||[]).filter((operacion)=>operacion.tipo==="Ganancia")
  const gananciasAcumuladas =totalDeGanancias.reduce((acc,elem)=>{
    console.log(elem.monto)
    return acc + elem.monto
  },0)
  parrafoGanancias.innerHTML= `+${gananciasAcumuladas}`
  return gananciasAcumuladas
}
const parrafoGastos = $("#parrafoGastos")
const sumarGastos = ()=>{
  const totalDeGastos = (operaciones||[]).filter((operacion)=>operacion.tipo==="Gasto")
  const gastosAcumulados =totalDeGastos.reduce((acc,elem)=>{
    return acc + elem.monto
  },0)
  parrafoGastos.innerHTML = `-${gastosAcumulados}`
  return gastosAcumulados
}
const sumaTotal = $("#sumaTotal")
console.log(sumaTotal)
const sumaDelBalance = ()=>{
  const totalGanancias = sumaDeGanancias()
  const totalGastos = sumarGastos()
  const sumaBalance = totalGanancias- totalGastos
  sumaTotal.innerHTML=`$ ${sumaBalance}`
}
//..... filtros
const botonOcultarMostrarFiltros = $("#seccion-filtros")


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
