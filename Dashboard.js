const transacciones = [];

// Simulación de datos iniciales
const cuenta = {
  numero: "1234567890",
  saldo: 325000,
  fechaCreacion: "2023-10-12"
};

// Mostrar el resumen al cargar
window.onload = () => {
  document.getElementById("cuenta").textContent = cuenta.numero;
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
  document.getElementById("fecha").textContent = cuenta.fechaCreacion;
};

// Función para manejar el menú
function mostrarOpcion(opcion) {
  // Oculta todas las secciones
  document.getElementById("contenido").style.display = "none";
  document.getElementById("consignacion").style.display = "none";
  document.getElementById("resumenTransacciones").style.display = "none";

  // Muestra la opción seleccionada
  switch (opcion) {
    case 'consignacion':
      document.getElementById("consignacion").style.display = "block";
      break;

    case 'resumen':
      document.getElementById("resumenTransacciones").style.display = "block";
      mostrarResumenTransacciones();
      break;

    case 'deposito':
    case 'retiro':
    case 'reporte':
      const contenedor = document.getElementById("contenido");
      contenedor.style.display = "block";

      if (opcion === 'deposito') {
        contenedor.innerHTML = `
          <h3>Depositar dinero</h3>
          <input type="number" id="deposito" placeholder="Monto a depositar">
          <button onclick="realizarDeposito()">Confirmar</button>
        `;
      } else if (opcion === 'retiro') {
        contenedor.innerHTML = `
          <h3>Retirar dinero</h3>
          <input type="number" id="retiro" placeholder="Monto a retirar">
          <button onclick="realizarRetiro()">Confirmar</button>
        `;
      } else if (opcion === 'reporte') {
        contenedor.innerHTML = `
          <h3>Reporte de cuenta</h3>
          <p><strong>Número:</strong> ${cuenta.numero}</p>
          <p><strong>Saldo:</strong> $${cuenta.saldo.toLocaleString()}</p>
          <p><strong>Fecha de creación:</strong> ${cuenta.fechaCreacion}</p>
        `;
      }
      break;
  }
}

// Función para actualizar saldo en pantalla
function actualizarSaldo() {
  document.getElementById("saldo").textContent = cuenta.saldo.toLocaleString();
}

// Función para generar referencia única
function generarReferencia() {
  return 'REF' + Math.floor(100000 + Math.random() * 900000);
}

// Función para registrar transacciones
function registrarTransaccion(fecha, referencia, tipo, descripcion, valor) {
  transacciones.unshift({ fecha, referencia, tipo, descripcion, valor });
  if (transacciones.length > 10) transacciones.pop();
}

// Función para realizar depósito
function realizarDeposito() {
  const monto = parseFloat(document.getElementById("deposito").value);
  if (isNaN(monto) || monto <= 0) return alert("Monto inválido");
  cuenta.saldo += monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  registrarTransaccion(fecha, referencia, "Depósito", "Depósito realizado en línea", monto);

  alert(`Se depositaron $${monto.toLocaleString()} correctamente.`);
}

// Función para realizar retiro
function realizarRetiro() {
  const monto = parseFloat(document.getElementById("retiro").value);
  if (isNaN(monto) || monto <= 0) return alert("Monto inválido");
  if (monto > cuenta.saldo) return alert("Saldo insuficiente");

  cuenta.saldo -= monto;
  actualizarSaldo();

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  registrarTransaccion(fecha, referencia, "Retiro", "Retiro realizado desde cuenta", monto);

  alert(`Se retiraron $${monto.toLocaleString()} correctamente.`);
}

// Función para realizar consignación
function realizarConsignacion() {
  const monto = parseFloat(document.getElementById("montoConsignar").value);
  const cuentaUsuario = document.getElementById("cuentaUsuario").innerText;
  const nombre = document.getElementById("nombreUsuario").innerText;

  if (isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  const fecha = new Date().toLocaleString();
  const referencia = generarReferencia();
  const tipo = "Consignación";
  const descripcion = "Consignación por canal electrónico";

  cuenta.saldo += monto;
  actualizarSaldo();

  registrarTransaccion(fecha, referencia, tipo, descripcion, monto);

  const resumen = `
    Fecha: ${fecha}<br>
    Referencia: ${referencia}<br>
    Tipo: ${tipo}<br>
    Descripción: ${descripcion}<br>
    Valor: $${monto.toLocaleString()}
  `;

  document.getElementById("detalleConsignacion").innerHTML = resumen;
  document.getElementById("resumenConsignacion").style.display = "block";

  alert("Consignación realizada exitosamente.");
}

// Mostrar resumen de las transacciones
function mostrarResumenTransacciones() {
  const cuerpo = document.getElementById("cuerpoTablaTransacciones");
  cuerpo.innerHTML = "";

  if (transacciones.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="5">No hay transacciones registradas.</td></tr>`;
    return;
  }

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

  