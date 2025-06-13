// ======================
// Inicialización DOM
// ======================
document.addEventListener('DOMContentLoaded', () => {

  // ======================
  // Elementos Login
  // ======================
  const btnAbrirLogin = document.getElementById('btn-iniciar-sesion');
  const ventanaLogin = document.getElementById('window');
  const btnCerrarLogin = document.getElementById('btn-cerrar');
  const btnConfirmarLogin = document.getElementById('btn-confirmar');
  const mensajeLogin = document.getElementById('mensaje-login');
  const linkRegistrarDesdeLogin = document.getElementById('link-a-registrar');

  const inputUsuario = document.getElementById('usuario');
  const inputTipo = document.getElementById('tipo');
  const inputCedula = document.getElementById('cedula');
  const inputContraseña = document.getElementById('contraseña');

  // ======================
  // Elementos Registro
  // ======================
  const ventanaRegis = document.getElementById('window-regis');
  const btnAbrirRegis = document.getElementById('btn-registrarse');
  const btnCerrarRegistro = document.getElementById('btn-cerrar-registro');
  const btnRegistrar = document.getElementById('registrarse');

  // ======================
  // Eventos Login
  // ======================
  btnAbrirLogin.addEventListener('click', () => {
    ventanaLogin.style.display = 'block';
    mensajeLogin.textContent = '';
  });

  btnCerrarLogin.addEventListener('click', () => {
    ventanaLogin.style.display = 'none';
    limpiarCamposLogin();
  });

  linkRegistrarDesdeLogin.addEventListener('click', (e) => {
    e.preventDefault();
    ventanaLogin.style.display = 'none';
    ventanaRegis.style.display = 'block';
  });

  btnConfirmarLogin.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const tipo = inputTipo.value;
    const cedula = inputCedula.value.trim();
    const contraseña = inputContraseña.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(u =>
      u.nombre === usuario &&
      u.tipo === tipo &&
      u.cedula === cedula &&
      u.contraseña === contraseña
    );

    if (encontrado) {
      mensajeLogin.style.color = "green";
      mensajeLogin.textContent = "Inicio de sesión exitoso.";
      sessionStorage.setItem("usuario", usuario);
      setTimeout(() => {
        ventanaLogin.style.display = 'none';
        window.location.href = 'html.html';
      }, 1000);
    } else {
      mensajeLogin.style.color = "red";
      mensajeLogin.textContent = "Credenciales incorrectas. Intente nuevamente.";
    }
  });

  // ======================
  // Eventos Registro
  // ======================
  btnAbrirRegis.addEventListener('click', () => {
    ventanaRegis.style.display = 'block';
  });

  btnCerrarRegistro.addEventListener('click', () => {
    ventanaRegis.style.display = 'none';
    limpiarCamposRegistro();
  });

  btnRegistrar.addEventListener('click', () => {
    const nuevoUsuario = {
      tipo: document.getElementById('tipo-regis').value,
      cedula: document.getElementById('cedula-regis').value.trim(),
      nombre: document.getElementById('usuario-regis').value.trim(),
      genero: document.getElementById('genero-regis').value,
      telefono: document.getElementById('telefono-regis').value.trim(),
      correo: document.getElementById('correo-regis').value.trim(),
      direccion: document.getElementById('direccion-regis').value.trim(),
      ciudad: document.getElementById('ciudad-regis').value.trim(),
      contraseña: document.getElementById('contraseña-regis').value
    };

    if (!nuevoUsuario.tipo || !nuevoUsuario.cedula || !nuevoUsuario.nombre || !nuevoUsuario.contraseña) {
      alert("Por favor complete todos los campos requeridos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Registro exitoso.");
    ventanaRegis.style.display = 'none';
    limpiarCamposRegistro();
  });

  // ======================
  // Funciones Auxiliares
  // ======================
  function limpiarCamposLogin() {
    inputUsuario.value = '';
    inputTipo.selectedIndex = 0;
    inputCedula.value = '';
    inputContraseña.value = '';
    mensajeLogin.textContent = '';
  }

  function limpiarCamposRegistro() {
    document.getElementById('tipo-regis').selectedIndex = 0;
    document.getElementById('cedula-regis').value = '';
    document.getElementById('usuario-regis').value = '';
    document.getElementById('genero-regis').selectedIndex = 0;
    document.getElementById('telefono-regis').value = '';
    document.getElementById('correo-regis').value = '';
    document.getElementById('direccion-regis').value = '';
    document.getElementById('ciudad-regis').value = '';
    document.getElementById('contraseña-regis').value = '';
  }

});
