// ======================= Variables =======================

// Obtener cuenta desde localStorage o crear nueva
let cuenta = JSON.parse(localStorage.getItem("cuenta")) || {
  numero: generarNumeroCuenta(),
  saldo: 0,
  fecha: new Date().toLocaleDateString()
};

// Obtener transacciones existentes
let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

// ======================= Inicialización =======================

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("usuario")) {
    document.getElementById("cuenta").textContent = cuenta.numero;
    document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
    document.getElementById("fecha").textContent = cuenta.fecha;
  }
});

// ======================= Funciones generales =======================

function mostrarOpcion(id) {
  const secciones = document.querySelectorAll(".contenido");
  secciones.forEach(sec => sec.classList.add("oculto"));
  document.getElementById(id === "resumen" ? "resumen" : id).classList.remove("oculto");

  if (id === "reporte") mostrarReporte();
  if (id === "certificado") mostrarCertificado();
  if (id === "resumen") mostrarResumenTransacciones();
  if (id === "cerrar") cerrarSesion();
}

function actualizarSaldo() {
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
  guardarCuenta();
}

function generarNumeroCuenta() {
  return "AC" + Math.floor(100000000 + Math.random() * 900000000);
}

function generarReferencia() {
  return "REF" + Math.floor(100000 + Math.random() * 900000);
}

function registrarTransaccion(fecha, referencia, tipo, descripcion, valor) {
  transacciones.push({ fecha, referencia, tipo, descripcion, valor });
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

function guardarCuenta() {
  localStorage.setItem("cuenta", JSON.stringify(cuenta));
}

// ======================= Consignación =======================

function realizarConsignacion() {
  const montoInput = document.getElementById("montoConsignar");
  const resumen = document.getElementById("resumenConsignacion");
  const detalle = document.getElementById("detalleConsignacion");

  const monto = parseFloat(montoInput.value);
  if (isNaN(monto) || monto <= 0) {
    alert("Por favor ingrese un monto válido mayor a 0.");
    return;
  }

  if (!cuenta || typeof cuenta.saldo !== "number") {
    alert("Error: la cuenta no está definida correctamente.");
    return;
  }

  cuenta.saldo += monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString("es-CO");
  const ref = generarReferencia();

  registrarTransaccion(fecha, ref, "Consignación", "Depósito en cuenta", monto);

  detalle.textContent = `Consignaste $${monto.toLocaleString("es-CO")} el ${fecha} con referencia ${ref}.`;
  resumen.classList.remove("oculto");

  montoInput.value = "";
}


// ======================= Retiro =======================

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

// ======================= Pago de servicios =======================

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

// ======================= Certificado =======================

function mostrarCertificado() {
  document.getElementById("certCuenta").textContent = cuenta.numero;
  document.getElementById("certSaldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("certFecha").textContent = cuenta.fecha;
  document.getElementById("certEmision").textContent = new Date().toLocaleDateString();
}

// ======================= Reporte =======================

function mostrarReporte() {
  document.getElementById("reporteCuenta").textContent = cuenta.numero;
  document.getElementById("reporteSaldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("reporteFecha").textContent = cuenta.fecha;
}

// ======================= Resumen de transacciones =======================

function mostrarResumenTransacciones() {
  const cuerpo = document.getElementById("cuerpoTablaTransacciones");
  if (!cuerpo) return;

  cuerpo.innerHTML = "";

  let transacciones = [];

  try {
    transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  } catch (error) {
    console.error("Error al cargar transacciones desde localStorage:", error);
    return;
  }

  if (!Array.isArray(transacciones) || transacciones.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML = `<td colspan="5">No hay transacciones registradas.</td>`;
    cuerpo.appendChild(filaVacia);
    return;
  }

  transacciones.forEach(tx => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${tx.fecha ?? "Fecha no disponible"}</td>
      <td>${tx.referencia ?? "N/A"}</td>
      <td>${tx.tipo ?? "Desconocido"}</td>
      <td>${tx.descripcion ?? "-"}</td>
      <td>$${(Number(tx.valor) || 0).toLocaleString("es-CO")}</td>
    `;
    cuerpo.appendChild(fila);
  });
}



// ======================= Cerrar sesión =======================

function cerrarSesion() {
  sessionStorage.removeItem("usuario");

  document.getElementById("dashboard").classList.add("oculto");
  document.getElementById("cerrarSesion").classList.remove("oculto");

  setTimeout(() => {
    document.getElementById("cerrarSesion").classList.add("oculto");
    document.getElementById("inicio").classList.remove("oculto");
  }, 2500);
}




