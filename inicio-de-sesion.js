document.addEventListener('DOMContentLoaded', () => {
  const btnAbrir = document.getElementById('btn-iniciar-sesion');
  const ventana = document.getElementById('window');
  const btnCerrar = document.getElementById('btn-cerrar');
  const btnConfirmar = document.getElementById('btn-confirmar');
  const mensaje = document.getElementById('mensaje-login');

  const inputUsuario = document.getElementById('usuario');
  const inputTipo = document.getElementById('tipo');
  const inputCedula = document.getElementById('cedula');
  const inputContraseña = document.getElementById('contraseña');

  btnAbrir.addEventListener('click', () => {
    ventana.style.display = 'block';
    mensaje.textContent = '';
  });

  btnCerrar.addEventListener('click', () => {
    ventana.style.display = 'none';
    limpiarCampos();
  });

  btnConfirmar.addEventListener('click', () => {
    // Credenciales válidas de prueba
    const usuarioValido = "daniel";
    const tipoValido = "CC";
    const cedulaValida = "12345678";
    const contraseñaValida = "clave123";

    // Datos ingresados
    const usuario = inputUsuario.value.trim();
    const tipo = inputTipo.value;
    const cedula = inputCedula.value.trim();
    const contraseña = inputContraseña.value;
    
    if (usuario === usuarioValido && tipo === tipoValido && cedula === cedulaValida && contraseña === contraseñaValida) {
      sessionStorage.setItem("usuario", usuario);
      mensaje.style.color = "green";
      mensaje.textContent = "Inicio de sesión exitoso.";
    
      setTimeout(() => {
        ventana.style.display = 'none';
        setTimeout(() => {
          window.location.href = 'html.html';
        }, 1000);
      }, 1000);
    }
    
  });

  function limpiarCampos() {
    inputUsuario.value = '';
    inputCedula.value = '';
    inputContraseña.value = '';
    mensaje.textContent = '';
  }
});


