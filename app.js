const apiUrl = 'http://localhost:3001/productos';

// Función para obtener los productos desde el JSON
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const productos = response.json();
    return productos;
}

// Función para renderizar las cards
function renderProductCard(product) {
    const cardContainer = document.getElementById('cards-container');

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = product.imagen;
    img.alt = product.nombre;

    const title = document.createElement('p');
    title.classList.add('card-title')
    title.textContent = product.nombre;

    const price = document.createElement('p');
    price.classList.add('card-price')
    price.textContent = `$ ${product.precio}`;

    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('trash-icon');
    deleteIcon.src = 'assets/trash_icon.png'; // Ruta a tu icono de eliminación
    deleteIcon.alt = 'Eliminar';
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = () => deleteProduct(product.id, card);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(deleteButton);

    cardContainer.appendChild(card);
}

// Función para cargar los productos al inicio
async function loadProducts() {
    const products = await fetchProducts();
    products.forEach(product => renderProductCard(product));
}

// Función para manejar el envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const newProduct = {
        nombre,
        precio,
        imagen
    };

    const addedProduct = await addProduct(newProduct);
    renderProductCard(addedProduct); // Renderiza la nueva card
    document.getElementById('product-form').reset();
}

// Función para simular la adición de un producto al JSON server
async function addProduct(product) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return response.json();
}

// Función para eliminar un producto
async function deleteProduct(id, cardElement) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        cardElement.remove();
    }
}

// Evento de botón Enviar
document.getElementById('product-form').addEventListener('submit', handleFormSubmit);

//Cargar productos iniciales
loadProducts();