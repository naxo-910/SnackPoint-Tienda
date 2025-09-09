const form = document.getElementById('formRegistro');

const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const password = document.getElementById('password');

const errores = document.querySelectorAll('.error');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validarCampos();
});


function validarCampos() {
    
    errores.forEach(error => error.textContent = '');

    let esValido = true;

    if (nombre.value.trim() === '') {
        errores[0].textContent = 'El nombre es obligatorio.';
        esValido = false;
    }
    if (apellido.value.trim() === '') {
        errores[1].textContent = 'El apellido es obligatorio.';
        esValido = false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value)) {
        errores[2].textContent = 'Ingrese un correo válido.';
        esValido = false;
    }

    if (password.value.length < 4 || password.value.length > 10) {
        errores[3].textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
        esValido = false;
    }

    if (esValido) {
        alert('¡Registro exitoso!');
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("inicio-secion");

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación de correo
    if (!EMAIL_REGEX.test(correo)) {
      alert("Correo no válido. Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    // Validación de contraseña
    if (password.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    // Simulación de login correcto
    alert("Inicio de sesión exitoso ✅");
    window.location.href = "index.html"; // redirigir al home
  });
});
