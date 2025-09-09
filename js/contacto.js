document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Validar correo simple
    const EMAIL_REGEX = /^[\w.+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!EMAIL_REGEX.test(correo)) {
      alert("Correo no válido (solo @duoc.cl, @profesor.duoc.cl o @gmail.com)");
      return;
    }

    alert("✅ Mensaje enviado con éxito. ¡Gracias por contactarnos!");
    form.reset();
  });
});
