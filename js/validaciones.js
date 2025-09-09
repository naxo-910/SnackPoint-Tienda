
const EMAIL_REGEX = /^[\w.+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const ADMIN_EMAIL = "jo.lebuy@duocuc.cl";
const ADMIN_PASS = "123456";
const usuariosNormales = [
    { correo: "usuario1@duocuc.cl", pass: "123" },
    { correo: "usuario2@gmail.com", pass: "123" },
    { correo: "profesor1@profesor.duoc.cl", pass: "123" }
];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inicio-secion");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita enviar el formulario automáticamente

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!correo || !password) {
            alert("Por favor completa todos los campos. Regístrate si no tienes cuenta.");
            return;
        }

        if (!EMAIL_REGEX.test(correo)) {
            alert("Correo no válido. Debe ser duoc.cl, profesor.duoc.cl o gmail.com");
            return;
        }

        if (correo === ADMIN_EMAIL && password === ADMIN_PASS) {
            console.log("Admin validado, redirigiendo...");
            window.location.href = "admin/admin.html";
            return;
        }
        // Validar usuarios normales
        const usuarioValido = usuariosNormales.find(u => u.correo === correo && u.pass === password);
        if (usuarioValido) {
            alert("¡Bienvenido usuario!");
            window.location.href = "productos.html"; 
        }
        alert("Correo o contraseña incorrectos. Regístrate si no tienes cuenta.");
    });

});