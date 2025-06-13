// Objeto de cuenta del usuario activo
let cuenta = {
  numero: generarNumeroCuenta(),
  saldo: 0,
  fecha: new Date().toLocaleDateString()
};

// Lista de transacciones
let transacciones = [];

// Al cargar, mostrar datos básicos si hay sesión
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("usuario")) {
    document.getElementById("cuenta").textContent = cuenta.numero;
    document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
    document.getElementById("fecha").textContent = cuenta.fecha;
  }
});

// ================ Funciones generales ================

// Mostrar sección y ocultar las demás
function mostrarOpcion(id) {
  const secciones = document.querySelectorAll(".contenido");
  secciones.forEach(sec => sec.classList.add("oculto"));
  document.getElementById(id === "resumen" ? "resumen" : id).classList.remove("oculto");

  if (id === "reporte") mostrarReporte();
  if (id === "certificado") mostrarCertificado();
  if (id === "resumen") mostrarResumenTransacciones();
  if (id === "cerrar") cerrarSesion();
}

// Actualizar saldo en pantalla
function actualizarSaldo() {
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
}

// Generar número de cuenta aleatorio
function generarNumeroCuenta() {
  return "AC" + Math.floor(100000000 + Math.random() * 900000000);
}

// Generar una referencia aleatoria única
function generarReferencia() {
  return "REF" + Math.floor(100000 + Math.random() * 900000);
}

// Registrar una transacción
function registrarTransaccion(fecha, referencia, tipo, descripcion, valor) {
  transacciones.push({ fecha, referencia, tipo, descripcion, valor });
}

// ================ Consignación ================

function realizarConsignacion() {
  const monto = parseFloat(document.getElementById("montoConsignar").value);
  if (isNaN(monto) || monto <= 0) {
    alert("Ingrese un monto válido.");
    return;
  }

  cuenta.saldo += monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const ref = generarReferencia();
  registrarTransaccion(fecha, ref, "Consignación", "Depósito en cuenta", monto);

  document.getElementById("detalleConsignacion").textContent =
    `Consignaste $${monto.toLocaleString()} el ${fecha} con referencia ${ref}.`;
  document.getElementById("resumenConsignacion").classList.remove("oculto");
}

// ================ Retiro ================

function realizarRetiro() {
  const monto = parseFloat(document.getElementById("montoRetiro").value);
  if (isNaN(monto) || monto <= 0) {
    alert("Ingrese un monto válido.");
    return;
  }

  if (monto > cuenta.saldo) {
    alert("Fondos insuficientes.");
    return;
  }

  cuenta.saldo -= monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const ref = generarReferencia();
  registrarTransaccion(fecha, ref, "Retiro", "Extracción de efectivo", monto);

  alert(`Retiro de $${monto.toLocaleString()} realizado con éxito.`);
}

// ================ Reporte ================

function mostrarReporte() {
  document.getElementById("reporteCuenta").textContent = cuenta.numero;
  document.getElementById("reporteSaldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("reporteFecha").textContent = cuenta.fecha;
}

// ================ Pago de Servicios ================

function realizarPagoServicio() {
  const tipo = document.getElementById("servicio").value;
  const monto = parseFloat(document.getElementById("valorServicio").value);

  if (isNaN(monto) || monto <= 0) {
    alert("Ingrese un valor válido.");
    return;
  }

  if (monto > cuenta.saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  cuenta.saldo -= monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const ref = generarReferencia();
  registrarTransaccion(fecha, ref, "Pago de servicio", tipo, monto);

  document.getElementById("detallePagoServicio").textContent =
    `Pagaste $${monto.toLocaleString()} por ${tipo} el ${fecha} con referencia ${ref}.`;
  document.getElementById("resumenPagoServicio").classList.remove("oculto");
}

// ================ Certificado ================

function mostrarCertificado() {
  document.getElementById("certCuenta").textContent = cuenta.numero;
  document.getElementById("certSaldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("certFecha").textContent = cuenta.fecha;
  document.getElementById("certEmision").textContent = new Date().toLocaleDateString();
}

// ================ Resumen Transacciones ================

function mostrarResumenTransacciones() {
  const cuerpo = document.getElementById("cuerpoTablaTransacciones");
  cuerpo.innerHTML = "";

  transacciones.forEach(tx => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${tx.fecha}</td>
      <td>${tx.referencia}</td>
      <td>${tx.tipo}</td>
      <td>${tx.descripcion}</td>
      <td>$${tx.valor.toLocaleString()}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

// ================ Cerrar sesión ================

function cerrarSesion() {
  sessionStorage.removeItem("usuario");

  // Ocultar dashboard, mostrar pantalla de despedida unos segundos
  document.getElementById("dashboard").classList.add("oculto");
  document.getElementById("cerrarSesion").classList.remove("oculto");

  setTimeout(() => {
    document.getElementById("cerrarSesion").classList.add("oculto");
    document.getElementById("inicio").classList.remove("oculto");
  }, 2500);
}

