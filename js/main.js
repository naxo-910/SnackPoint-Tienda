document.addEventListener('DOMContentLoaded', () => {

    const cartIcon = document.getElementById('cart-link');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.getElementById('close-cart-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    };

    const updateCartUI = () => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotalElement.textContent = totalPrice.toLocaleString('es-CL');
    };

    const renderCartItems = () => {
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'El carrito está vacío.';
            cartItemsList.appendChild(emptyMessage);
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    <button class="remove-item-btn" data-index="${index}">Eliminar</button>
                `;
                cartItemsList.appendChild(li);
            });
        }
    };

    const addItemToCart = (productName, productPrice) => {
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        
        saveCart();
    };

    const removeItemFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        renderCartItems();
    };

    document.querySelectorAll('.btn-carrito').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.producto-card');
            const productName = card.getAttribute('data-name');
            const productPrice = parseFloat(card.getAttribute('data-price'));
            addItemToCart(productName, productPrice);
        });
    });

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        renderCartItems();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const index = e.target.getAttribute('data-index');
            removeItemFromCart(index);
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('¡Pedido realizado con éxito!');
        cart = [];
        saveCart();
        cartModal.style.display = 'none';
    });

    updateCartUI();
});
