
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
const modalEditarOperacion = $("#ModalEdicionOperacion")
const inputEditarOperacionDescripcion =$("#inputEditarOperacion")
const inputEditarMontoOperacion =$("#inputEditarMonto")
const inputEditarCategoriaOperacion =$("#selectEditarCategoria")
const inputEditarTipoOperacion =$("#EditOperationTipo")
const inputEditarFechaOperacion =$("#inputEditarFecha")
const buttonEditaroperacion = $("#EditarOperacion")
const buttonCancelarOperacion =$("#cancelarEdicionDeOperacion")

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
  inputEditarCategoriaOperacion.innerHTML=""
  const opcionParaSelectFiltroAgregar = categorias.map(categoria=>
    `<option value="${categoria.categoria}">${categoria.categoria}</option>`).join("")
    selectFiltroCategoria.innerHTML = opcionParaSelectFiltroAgregar
    selectDeCategoriasAgregarOperacion.innerHTML= opcionParaSelectFiltroAgregar
    inputEditarCategoriaOperacion.innerHTML=opcionParaSelectFiltroAgregar
}
/*encuentra categoria para editar*/ 
const modalEdicionDeCategoria = $("#modalEditarCategoria")
const inputEditarCategoria = $("#inputEditarCategoria")
const botonActualizarCategoria =$("#ActualizarCategoria")
const abrirModalEdicion = (id) => {
  let categoriaParaEditar = categoriasDelLocalStorage.find(categoria => categoria.id == id); 

  if (categoriaParaEditar) {  
      inputEditarCategoria.value = categoriaParaEditar.categoria;
      inputEditarCategoria.dataset.id = id; 
      modalEdicionDeCategoria.classList.remove("hidden");
      modalEdicionDeCategoria.classList.add("flex");
      modalCategoria.classList.remove("flex");
      modalCategoria.classList.add("hidden");
  } else {
      console.error("Categoría no encontrada");
  }
};

botonActualizarCategoria.addEventListener("click", () => {
  const nuevaCategoria = inputEditarCategoria.value.trim(); 
  const categoriaId = inputEditarCategoria.dataset.id;  

  if (nuevaCategoria && categoriaId) {
      const index = categoriasDelLocalStorage.findIndex(categoria => categoria.id == categoriaId); // Comparación flexible
      if (index !== -1) {
          categoriasDelLocalStorage[index].categoria = nuevaCategoria;
          guardarCategoriasEnLocalStorage();

          mostrarCategorias(categoriasDelLocalStorage); 
      } else {
          console.error("No se encontró la categoría para actualizar.");
      }

      // Cerrar el modal de edición y reabrir el principal
      modalEdicionDeCategoria.classList.remove("flex");
      modalEdicionDeCategoria.classList.add("hidden");
      modalCategoria.classList.remove("hidden");
      modalCategoria.classList.add("flex");
  }
});

actualizarCategoria(categoriasDelLocalStorage)
const mostrarCategorias = (categorias)=>{
  contenedorCategorias.innerHTML=""
  const categoriasFiltradas = categorias.filter(categoria => categoria.categoria !== "Todos")
  const categoriasHTML = categoriasFiltradas.map(categoria => `
    <div class="categoria  flex justify-between text-center w-[20rem] h-[2.5rem] bg-blue-100 m-2 rounded-md" id="${categoria.id}">
     <div class="text-left">
     <p> ${categoria.categoria}</p>
     </div>
      <div class="align-right justify-around"> 
      <button class="btn-eliminar bg-red-100 h-[2.5rem] w-[5rem] border-solid" data-id="${categoria.id}">Eliminar</button>
      <button class="btn-editar bg-green-300 h-[2.5rem] w-[5rem] border-solid" data-id="${categoria.id}">Editar</button>
      </div>
    </div>
  `).join("");
  contenedorCategorias.innerHTML = categoriasHTML;
  const botonesEliminarCategoria = $$(".btn-eliminar")
  botonesEliminarCategoria.forEach((boton)=>{
    boton.addEventListener("click",(e)=>{
      console.log("hiciste click")
      eliminarCategoria(boton.dataset.id)

    })
  })
 const botonesEditarCategoria = $$(".btn-editar")
 botonesEditarCategoria.forEach((boton)=>{
   boton.addEventListener("click",()=>{
      const categoriaPorEditar =  boton.dataset.id
      console.log(categoriaPorEditar)
      abrirModalEdicion(categoriaPorEditar) 
     })
   })
}
 function eliminarCategoria (id){
  const index = categoriasDelLocalStorage.findIndex((categoria) => categoria.id === id);
  if (index !== -1) {
    categoriasDelLocalStorage.splice(index, 1); 
  }
  guardarCategoriasEnLocalStorage()
  mostrarCategorias(categoriasDelLocalStorage)
 }
mostrarCategorias(categoriasDelLocalStorage)
// //funciones editar y eliminar 

// //elementos de modal editar operacion 


const abrirModalEditarOperacion = (id)=>{
  modalEditarOperacion.classList.remove("hidden")
  modalEditarOperacion.classList.add("flex")
  main.classList.remove("flex")
  main.classList.add("hidden")
  let operacionParaEditar = operaciones.find(operacion => operacion.id == id);
  if(operacionParaEditar){
    inputEditarOperacionDescripcion.value = operacionParaEditar.descripcion
    inputEditarMontoOperacion.value = operacionParaEditar.monto
    categoriasParaEditarSelect(categoriasDelLocalStorage)
    inputEditarCategoriaOperacion.value=operacionParaEditar.categoria
    inputEditarTipoOperacion.value=operacionParaEditar.tipo
    inputEditarFechaOperacion.value = operacionParaEditar.fecha
    inputEditarOperacionDescripcion.dataset.id=id

  }
}
const categoriasParaEditarSelect = (categorias) => {
  inputEditarCategoriaOperacion.innerHTML = "";
  const opcionesParaSelectOperacionesEditar = categorias.map(categoria => 
      `<option value="${categoria.categoria}">${categoria.categoria}</option>`
  ).join("");
  inputEditarCategoriaOperacion.innerHTML = opcionesParaSelectOperacionesEditar;
};
const actualizarOperacionEditada =()=>{
  const nuevaDescripcion = inputEditarOperacionDescripcion.value;
  const nuevoMonto = inputEditarMontoOperacion.value;
  const nuevoTipo = inputEditarTipoOperacion.value;
  const nuevaCategoria = inputEditarCategoriaOperacion.value;
  const nuevaFecha = inputEditarFechaOperacion.value; 
  const operacionID = inputEditarOperacionDescripcion.dataset.id;
  
  const index = operaciones.findIndex(operacion => operacion.id == operacionID);
  
  if (index !== -1) {
    operaciones[index].descripcion = nuevaDescripcion;
    operaciones[index].monto = Number(nuevoMonto); 
    operaciones[index].tipo = nuevoTipo;
    operaciones[index].categoria = nuevaCategoria;
    operaciones[index].fecha = nuevaFecha;
  } else {
    console.error("No se encontró la operación con ID:", operacionID);
  }
  
  guardarOperaciones();
  pintarOperaciones(operaciones);
  
  modalEditarOperacion.classList.remove("flex");
  modalEditarOperacion.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("flex");
}
buttonEditaroperacion.addEventListener("click",actualizarOperacionEditada)


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
    <div class="flex justify-around rounded-md">
    <button id="${operacion.id}" class="boton-eliminar-operacion bg-green-200 h-[1.5rem] w-[7rem]  ">Eliminar</button>
    <button class="btn-editarOperacion " data-id="${operacion.id}">Editar</button>
    </div>
    </div>`).join("")
    const botonesEliminarOperacion = $$(".boton-eliminar-operacion")
      botonesEliminarOperacion.forEach((boton)=>{
      boton.addEventListener("click", ()=>{
      eliminarOperacion(boton.id)
    
  })
})
const botonesEditarOperacion = $$(".btn-editarOperacion")
botonesEditarOperacion.forEach((boton)=>{
  boton.addEventListener("click", ()=>{
    abrirModalEditarOperacion(boton.dataset.id)
  })
})
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

// --------------------- funciones de nuevas operaciones ---------------------

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
    fecha: dayjs(inputFecha.value).format("DD/MM/YYYY")
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
  cerrarModalOperacion()
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
   inputDescripcion.value=""
   inputMonto.value=""
   inputTipo.value=""
   inputFecha.value=""
   selectDeCategoriasAgregarOperacion.value=""
}
const cerrarModalOperacion = ()=>{
  modalNuevaOperacion.classList.remove("flex");
  modalNuevaOperacion.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("flex");
}

const botonCancelarNuevaOperacion = $("#cancelarNuevaOperacion")
const cancelarNuevaOperacion = (e)=>{
  e.preventDefault()
  modalNuevaOperacion.classList.remove("flex");
  modalNuevaOperacion.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("flex");
}
botonCancelarNuevaOperacion.addEventListener("click",cancelarNuevaOperacion)

nuevaOperacion.addEventListener("click", cargarOperacion)  
//Balance
const parrafoGanancias = $("#parrafoGanancias")
const sumaDeGanancias = ()=>{
  const totalDeGanancias = (operaciones||[]).filter((operacion)=>operacion.tipo==="Ganancia")
  const gananciasAcumuladas =totalDeGanancias.reduce((acc,elem)=>{
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
const sumaDelBalance = ()=>{
  const totalGanancias = sumaDeGanancias()
  const totalGastos = sumarGastos()
  const sumaBalance = totalGanancias- totalGastos
  sumaTotal.innerHTML=`$ ${sumaBalance}`
}
//..... filtros
const botonOcultarMostrarFiltros = $("#seccion-filtros")
const contenedorFiltros = $("#contenedor-filtros")
const mostrarOcultarFiltros = ()=>{
  if(contenedorFiltros.classList.contains("flex")){
    contenedorFiltros.classList.add("hidden")
    contenedorFiltros.classList.remove("flex")
    botonOcultarMostrarFiltros.textContent ="Mostrar Filtros"
  }else{
    contenedorFiltros.classList.remove("hidden")
    contenedorFiltros.classList.add("flex")
    botonOcultarMostrarFiltros.textContent="Ocultar Filtros"
  }
}
botonOcultarMostrarFiltros.addEventListener("click",mostrarOcultarFiltros)

const agruparPorCategoria = () => {

  mostrarOperacionesEnHTML.innerHTML=""
  const operacionesPorCategoriasFiltradas = selectFiltroCategoria.value
  if(operacionesPorCategoriasFiltradas==="Todos"){
    pintarOperaciones(operaciones)
  }else{
  const agrupadosPorCategoria = operaciones.filter(operacion => operacion.categoria === selectFiltroCategoria.value)
  pintarOperaciones(agrupadosPorCategoria)
  }
}

selectFiltroCategoria.addEventListener("change", agruparPorCategoria)
const selectFiltroTipo = $("#select-filtroTipo")


const filtrarTodasLasOperaciones =(e)=>{
  console.log("cambio")
  mostrarOperacionesEnHTML.innerHTML=""
  const filtradosPorTipo = selectFiltroTipo.value
console.log(e.target.value)  
  if(filtradosPorTipo==="Todos"){
    pintarOperaciones(operaciones)
    console.log("todos")
  } else {
    const operacionesFiltradasPorTipo= operaciones.filter((operacion)=>operacion.tipo===filtradosPorTipo)
    console.log("Gasto/Ganancia")
    console.log(operacionesFiltradasPorTipo)
    pintarOperaciones(operacionesFiltradasPorTipo)
  }
}

selectFiltroTipo.addEventListener("change",filtrarTodasLasOperaciones)
//    ---------------------Orden Por------------
const selectOrdenarOperaciones =$("#orden-tipo")
const ordenarLasOperaciones = ()=>{
  mostrarOperacionesEnHTML.innerHTML=""
  const orden = selectOrdenarOperaciones.value
  console.log(orden)
  if(orden==="a/z"){
    const operacionesOrdenadasAZ =[...operaciones].sort((a,b)=>a.descripcion.localeCompare(b.descripcion))
    pintarOperaciones(operacionesOrdenadasAZ)
  }else if (orden==="z/a"){
    const operacionesOrdenadasZA =[...operaciones].sort((a,b)=>b.descripcion.localeCompare(a.descripcion))
    pintarOperaciones(operacionesOrdenadasZA)
  }else if(orden === "menor"){
    const operacionesDeMenorAMAyor = [...operaciones].sort((a,b)=>a.monto-b.monto)
    pintarOperaciones(operacionesDeMenorAMAyor)
  }else if (orden==="mayor"){
    const operacionesDeMayorAMenor = [...operaciones].sort((a,b)=>b.monto-a.monto)
    pintarOperaciones(operacionesDeMayorAMenor)
  }else if (orden==="antiguos"){
    const ordenarPorOperacionMenosReciente = [...operaciones].sort((a,b)=>dayjs(a.fecha).diff(dayjs(b.fecha)))
    pintarOperaciones(ordenarPorOperacionMenosReciente)
  }else if (orden ==="reciente"){
    const ordenarPorOperacionMasReciente = [...operaciones].sort((a,b)=>dayjs(b.fecha).diff(dayjs(a.fecha)))
    pintarOperaciones(ordenarPorOperacionMasReciente)
  }
}
selectOrdenarOperaciones.addEventListener("change",ordenarLasOperaciones)
// Filtrado por Fecha 
const filtroFecha = $("#filtro-fecha")

const filtrarOperacionesPorFecha = ()=>{
  const fechaFiltrada = filtroFecha.value
  console.log(fechaFiltrada)
  const operacionesFiltradasPorFecha = operaciones.filter((operacion)=>operacion.fecha === fechaFiltrada.value)
  console.log(operacionesFiltradasPorFecha)
  pintarOperaciones(operacionesFiltradasPorFecha)
}
filtroFecha.addEventListener("input",filtrarOperacionesPorFecha)