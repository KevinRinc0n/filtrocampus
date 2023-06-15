/*Gestión de clientes: el aplicativo web permitirá registrar los clientes para así obtener los diferentes beneficios que la compañía ofrece por fidelización.*/

let editarIdentificacion = null;

const crearCliente = new Map();
const formularioCliente = document.getElementById('formulario');
const tablaCliente = document.querySelector('#tablaClientes tbody');

const agregarCliente = document.getElementById('btn');
agregarCliente.addEventListener("click", aggCliente);

function aggCliente(event){
    event.preventDefault();
    const identificacion = document.getElementById('numId').value;
    const nombre = document.getElementById('nombres').value;
    const apellido = document.getElementById('apellidos').value;
    const placa = document.getElementById('placa').value;
    const tipo = document.getElementById('tipo').value;
    const telefono = document.getElementById('tel').value;
    const email = document.getElementById('email').value;

    if (editarIdentificacion !== null){
        crearCliente.set(editarIdentificacion,{nombre,apellido,placa,tipo,telefono,email});
        editarIdentificacion = null;
    } else {
      crearCliente.set(identificacion,{nombre,apellido,placa,tipo,telefono,email});
    } 

    actualizar();

    resetClientes();

    actualizarCliente();
};

function actualizar(verClientes = crearCliente) {
    tablaCliente.innerHTML = '';
  
    verClientes.forEach((persona, identificacion) => {
      const fila = document.createElement("tr");
      fila.innerHTML =
        `<td>${identificacion}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.placa}</td>
        <td>${persona.tipo}</td>
        <td>${persona.telefono}</td>
        <td>${persona.email}</td>
        <td><button onClick="eliminarCliente(this)" type="button" class="btn btn-danger">Eliminar</button></td>
        <td><button onClick="modificarCliente(this)" type="button" class="btn btn-warning">Editar</button></td>`
        tablaCliente.appendChild(fila);
    });
  };

function eliminarCliente(button){
    if (confirm('ESTAS SEGURO DE ELIMINAR ESTE CLIENTE?')){
        const fil = button.parentNode.parentNode;
    const identificacion = fil.getElementsByTagName("td")[0].innerText;
    crearCliente.delete(identificacion);
    fil.remove();
    }
    resetClientes();
    actualizarCliente();
};

function modificarCliente(button) {
    const row = button.parentNode.parentNode;
    const identificacion = row.getElementsByTagName("td")[0].innerText;
    const persona = crearCliente.get(identificacion);
  
    document.getElementById("numId").value = identificacion;
    document.getElementById("nombre").value = persona.nombre;
    document.getElementById("apellido").value = persona.apellido;
    document.getElementById("placa").value = persona.placa;
    document.getElementById("tipo").value = persona.tipo;
    document.getElementById("tel").value = persona.telefono;
    document.getElementById("email").value = persona.email;
  
    editarIdentificacion = identificacion;
    actualizarCliente();
  };

function resetClientes(){
  document.getElementById('numId').value = "";
  document.getElementById('nombres').value = "";
  document.getElementById('apellidos').value = "";
  document.getElementById('placa').value = "";
  document.getElementById('tipo').value = "";
  document.getElementById('tel').value = "";
  document.getElementById('email').value = "";
  };

function filterTable() {
  const buscarIgual = document.querySelector("#search").value.toLowerCase();

  const filtrarClientes = new Map([...crearCliente].filter(([identificacion, persona]) => {
    return (
      identificacion.toString().includes(buscarIgual) ||
      persona.nombre.toLowerCase().includes(buscarIgual) ||
      persona.apellido.toLowerCase().includes(buscarIgual)
    );
  }));

  actualizar(filtrarClientes);
};

let clientesBoton = document.getElementById('clientes'); 
    clientesBoton.addEventListener('click', function (a){
        document.getElementById('gestionClientes').style.display = 'block';
        a.preventDefault();
    });

/*Gestión de Servicios: el programa debe permitir gestionar las diferentes ofertas de servicios de spa para autos que ofrece la empresa.*/

const crearSpa = new Map(); 

let contadorId = 1;

const formularioSpa = document.getElementById("formularioSpa");
const boddyTable = document.querySelector("#tablaSpa tbody");

const crearSp = document.getElementById('bton');
crearSp.addEventListener("click", agregarSpa);

function agregarSpa(event) {
  event.preventDefault();

  const identificacionSpa = contadorId++
  const nombreSpa = document.getElementById('nombreSpa').value;
  const descripcionSpa = document.getElementById('descripcionSpa').value;
  const valorSpa = document.getElementById('valorSpa').value;
  const puntosSpa = document.getElementById('puntosSpa').value;

  crearSpa.set(identificacionSpa, { nombreSpa, descripcionSpa, valorSpa, puntosSpa });

  subir();

  reset();

  renderSpa();
};

function subir() {
  boddyTable.innerHTML = '';

  crearSpa.forEach((spa,identificacionSpa) => {
    const linea = document.createElement("tr");
    linea.innerHTML =
      `<td>${identificacionSpa}</td>
      <td>${spa.nombreSpa}</td>
      <td>${spa.descripcionSpa}</td>
      <td>${spa.valorSpa}</td>
      <td>${spa.puntosSpa}</td>
      <td><button onClick="borrar(this)" type="button" class="btn btn-danger">Eliminar</button></td>
      `
    boddyTable.appendChild(linea);
  });
};

function borrar(button) {
  if(confirm('ESTAS SEGURO DE ELIMINAR ESTE SPA?')){
    const roww = button.parentNode.parentNode;
    const identificador = roww.getElementsByTagName("td")[0].innerText;
    crearSpa.delete(identificador);
    roww.remove();
  }
  resetForm();
  renderSpa();
};

function reset() {
  document.getElementById("nombreSpa").value = "";
  document.getElementById("descripcionSpa").value = "";
  document.getElementById("valorSpa").value = "";
  document.getElementById("puntosSpa").value = "";
  document.getElementById("numIdSpa").value = "";
};

/*Compra del Servicio: el aplicativo web deberá permitir registrar la compra de servicios a través de este módulo de la aplicación.*/

function selecCliente() {
  const cliente = document.getElementById('cliente');
  cliente.innerHTML = '';
  crearCliente.forEach((identificacion) => {
    const opciones = document.createElement('option');
    opciones.value = identificacion;
    opciones.innerText = `${identificacion.nombre} ${identificacion.apellido}`;
    cliente.appendChild(opciones);
  });
}

function selecSpa() {
  const selectSpa = document.getElementById('spa');
  selectSpa.innerHTML = '';
  crearSpa.forEach((spa, spaId) => {
    const opcioness = document.createElement('option');
    opcioness.value = spaId;
    opcioness.innerText = `${spa.nombreSpa}`;
    selectSpa.appendChild(opcioness);
  });
}

function mostrarServicio() {
  const clienteId = document.getElementById('cliente').value;
  const spaId = document.getElementById('spa').value;

  const cliente = crearCliente.get(clienteId);
  const spa = crearSpa.get(spaId);

  const subtotal = parseFloat(spa.valorSpa);
  const iva = subtotal * 0.14;
  const descuento = subtotal * 0.06;
  const total = subtotal + iva + descuento;

  const puntosServicio = parseInt(spa.puntosSpa);

  document.getElementById('clienteServis').innerText = `${identificacion.nombre} ${identificacion.apellido}`;
  document.getElementById('servicio').innerText = spa.nombreSpa;
  document.getElementById('valorServicio').innerText = spa.valorSpa;
  document.getElementById('ivaServicio').innerText = iva.toFixed(2);
  document.getElementById('descuentoServicio').innerText = descuento.toFixed(2);
  document.getElementById('valorTotal').innerText = total.toFixed(2);
  document.getElementById('puntosServicio').innerText = puntosServicio;

  const puntosAcumulados = cliente.puntosSpa || 0;
  cliente.puntosSpa = puntosAcumulados + puntosServicio;
}

let servicioBoton = document.getElementById('botonn');
servicioBoton.addEventListener('click', function (e) {
  e.preventDefault();
  mostrarServicio();
});

/*Sistema de fidelización: el aplicativo web debe permitir guardar puntos por cada compra que realicen sus clientes registrados en la plataforma.*/

function tablaClientes() {
  const clientePoints = document.getElementById('puntosBody').value;
    clientePoints.innerHTML =''

  crearCliente.forEach(client =>{
    const fil = document.createElement("tr");

    fil.innerHTML =` 
    <td>${client.nombre} ${client.apellido}</td>
    <td>${client.puntosSpa ? client.puntosSpa : 0}</td>`

    clientePoints,appendChild(fil);
  })
}

document.getElementById('bbotonn').addEventListener('submit',mostrarServicio);

let consultarBoton = document.getElementById('bbotonn');
consultarBoton.addEventListener('click', function (e) {
  e.preventDefault();
  tablaClientes();
});