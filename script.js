const products = [
    { id: 1, name: 'BENGBENG', price: 3000, img: 'img/BENGBENG.jpeg'},
    { id: 2, name: 'SIIP', price: 1000, img: 'img/SIIP.jpeg'},
    { id: 3, name: 'SARIGANDUM', price: 2000, img: 'img/SARIGANDUM.jpeg'},
    { id: 4, name: 'SELAIOLAI', price: 2000, img: 'img/SELAIOLAI.jpeg'},
    { id: 5, name: 'POPCRON', price: 1000, img: 'img/POPCRON.jpeg'}
];

let cart = [];

function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product'); // ✅ bukan 'products'
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId); // ✅ betul
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja Anda Rp ${total}. Masukan jumlah pembayaran:`);

    if (payment === null) return; // user tekan Cancel

    if (Number(payment) >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}


document.getElementById('checkout-btn').addEventListener('click', checkout);

displayProducts();
