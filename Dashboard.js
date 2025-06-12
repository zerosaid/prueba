const transacciones = [];

let contadorOperaciones = 0;

function verificarCargoPorUso() {
  contadorOperaciones++;
  if (contadorOperaciones % 5 === 0) {
    const valorCargo = 1200;

    if (cuenta.saldo >= valorCargo) {
      cuenta.saldo -= valorCargo;
      actualizarSaldo();

      const fecha = new Date().toLocaleString();
      const referencia = generarReferencia();
      registrarTransaccion(fecha, referencia, "Cargo", "Cargo por uso del sistema", valorCargo);

      alert("Se aplicó un cargo automático de $1.200 por uso del sistema.");
    } else {
      alert("No se pudo aplicar el cargo por uso del sistema: saldo insuficiente.");
    }
  }
}

// Datos iniciales de la cuenta
const cuenta = {
  numero: "1234567890",
  saldo: 325000,
  fechaCreacion: "2023-10-12",
};

// Mostrar datos básicos al cargar la página
window.onload = () => {
  document.getElementById("cuenta").textContent = cuenta.numero;
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("fecha").textContent = cuenta.fechaCreacion;
};

// Función para mostrar opciones del menú
function mostrarOpcion(opcion) {
  const secciones = document.querySelectorAll(".contenido");
  secciones.forEach((seccion) => (seccion.style.display = "none"));

  switch (opcion) {
    case "consignacion":
      document.getElementById("consignacion").style.display = "block";
      break;

    case "retiro":
      document.getElementById("retiro").style.display = "block";
      break;

    case "resumen":
      document.getElementById("resumenTransacciones").style.display = "block";
      mostrarResumenTransacciones();
      break;

    case "reporte":
      document.getElementById("reporte").style.display = "block";
      document.getElementById("reporteCuenta").textContent = cuenta.numero;
      document.getElementById("reporteSaldo").textContent =
        cuenta.saldo.toLocaleString();
      document.getElementById("reporteFecha").textContent =
        cuenta.fechaCreacion;
      break;

    case "deposito":
      const contenedor = document.getElementById("contenido");
      contenedor.style.display = "block";
      contenedor.innerHTML = `
        <h2>Depósito de Dinero</h2>
        <label for="deposito">Cantidad a depositar:</label>
        <input type="number" id="deposito" min="1" required>
        <br><br>
        <button onclick="realizarDeposito()">Confirmar depósito</button>
      `;
      break;

    case "servicios":
      document.getElementById("servicios").style.display = "block";
      break;

    case "certificado":
      document.getElementById("certificado").style.display = "block";
      document.getElementById("certCuenta").textContent = cuenta.numero;
      document.getElementById("certSaldo").textContent =
        cuenta.saldo.toLocaleString();
      document.getElementById("certFecha").textContent = cuenta.fechaCreacion;
      document.getElementById("certEmision").textContent =
        new Date().toLocaleString();
      break;

    case "cerrar":
      // Oculta todas las secciones
      const secciones = document.querySelectorAll(".contenido");
      secciones.forEach((seccion) => (seccion.style.display = "none"));

      // Limpia transacciones si deseas borrar el historial temporal
      transacciones.length = 0;

      // Muestra mensaje final
      document.getElementById("cerrarSesion").style.display = "block";

      // Opcional: Redirigir después de unos segundos
      // setTimeout(() => location.reload(), 4000);
      break;

    default:
      alert("Opción no válida.");
  }
}

// Actualizar el saldo en pantalla
function actualizarSaldo() {
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
}

// Generar una referencia aleatoria única
function generarReferencia() {
  return "REF" + Math.floor(100000 + Math.random() * 900000);
}

// Registrar una transacción
function registrarTransaccion(fecha, referencia, tipo, descripcion, valor) {
  transacciones.unshift({ fecha, referencia, tipo, descripcion, valor });
  if (transacciones.length > 10) transacciones.pop(); // Máximo 10 transacciones
}

// Realizar un depósito
function realizarDeposito() {
  const input = document.getElementById("deposito");
  const monto = parseFloat(input?.value);
  if (!input || isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  cuenta.saldo += monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  registrarTransaccion(
    fecha,
    referencia,
    "Depósito",
    "Depósito realizado en línea",
    monto
  );

  verificarCargoPorUso(); // 👈 se aplica validación del cobro

  alert(`Depósito exitoso por $${monto.toLocaleString()}`);
  input.value = ""; // Limpia el campo
}

// Realizar un retiro
function realizarRetiro() {
  const input = document.getElementById("montoRetiro");
  const monto = parseFloat(input?.value);
  if (!input || isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  if (monto > cuenta.saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  cuenta.saldo -= monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  registrarTransaccion(
    fecha,
    referencia,
    "Retiro",
    "Retiro desde cuenta",
    monto
  );

  verificarCargoPorUso(); // 👈 se aplica validación del cobro

  alert(`Retiro exitoso por $${monto.toLocaleString()}`);
  input.value = "";
}

// Realizar una consignación
function realizarConsignacion() {
  const input = document.getElementById("montoConsignar");
  const monto = parseFloat(input?.value);
  const cuentaUsuario = document.getElementById("cuentaUsuario")?.innerText;
  const nombre = document.getElementById("nombreUsuario")?.innerText;

  if (!input || isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  cuenta.saldo += monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  const tipo = "Consignación";
  const descripcion = "Consignación por canal electrónico";

  registrarTransaccion(fecha, referencia, tipo, descripcion, monto);

  verificarCargoPorUso(); // 👈 se aplica validación del cobro

  document.getElementById("detalleConsignacion").innerHTML = `
    Fecha: ${fecha}<br>
    Referencia: ${referencia}<br>
    Tipo: ${tipo}<br>
    Descripción: ${descripcion}<br>
    Valor: $${monto.toLocaleString()}
  `;
  document.getElementById("resumenConsignacion").style.display = "block";

  alert("Consignación realizada exitosamente.");
  input.value = "";
}

// Mostrar el resumen de transacciones
function mostrarResumenTransacciones() {
  const cuerpo = document.getElementById("cuerpoTablaTransacciones");
  cuerpo.innerHTML = "";

  if (transacciones.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="5">No hay transacciones registradas.</td></tr>`;
    return;
  }

  transacciones.forEach((tx) => {
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

// Realizar un pago de servicio público
function realizarPagoServicio() {
  const tipo = document.getElementById("servicio").value;
  const monto = parseFloat(document.getElementById("valorServicio").value);

  if (isNaN(monto) || monto <= 0) {
    return alert("Por favor ingresa un monto válido.");
  }

  if (monto > cuenta.saldo) {
    return alert("Saldo insuficiente para realizar el pago.");
  }

  cuenta.saldo -= monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  const descripcion = `Pago de servicio: ${tipo}`;

  registrarTransaccion(
    fecha,
    referencia,
    "Servicio público",
    descripcion,
    monto
  );

  verificarCargoPorUso(); // 👈 se aplica validación del cobro

  const resumen = `
    Fecha: ${fecha}<br>
    Referencia: ${referencia}<br>
    Servicio: ${tipo}<br>
    Valor pagado: $${monto.toLocaleString()}
  `;

  document.getElementById("detallePagoServicio").innerHTML = resumen;
  document.getElementById("resumenPagoServicio").style.display = "block";

  alert("Pago realizado exitosamente.");
}
