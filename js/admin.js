document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const tabla = document.getElementById("tablaProductos").querySelector("tbody");

  function getProductos() {
    return JSON.parse(localStorage.getItem("productos") || "[]");
  }

  function setProductos(lista) {
    localStorage.setItem("productos", JSON.stringify(lista));
    renderProductos();
  }

  function renderProductos() {
    const productos = getProductos();
    tabla.innerHTML = productos.map((p, i) => `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td>${p.categoria}</td>
        <td><button onclick="eliminarProducto(${i})">❌</button></td>
      </tr>
    `).join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const categoria = document.getElementById("categoria").value;

    if (!codigo || !nombre || isNaN(precio) || isNaN(stock) || !categoria) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const productos = getProductos();
    productos.push({ codigo, nombre, precio, stock, categoria });
    setProductos(productos);

    form.reset();
  });

  window.eliminarProducto = (index) => {
    const productos = getProductos();
    productos.splice(index, 1);
    setProductos(productos);
  };

  renderProductos();
});
