let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    updateCart();
    saveCartToLocalStorage();
}

function removeFromCart(itemName) {
    const index = cart.findIndex(item => item.name === itemName);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
        saveCartToLocalStorage();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Clear existing items
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-name">${item.name} (${item.quantity})</span>
            <span class="item-price">₹${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItems.appendChild(li);
    });
    
    cartTotal.textContent = total.toFixed(2); // Ensure two decimal places
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Handle Proceed to Checkout button click
document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'payment.html';
});

// Initialize cart on page load
updateCart();

document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Set the delivery time (e.g., 30 minutes from now)
    const deliveryDate = new Date();
    deliveryDate.setMinutes(deliveryDate.getMinutes() + 30);
    localStorage.setItem('deliveryTime', deliveryDate.toISOString());
    
    window.location.href = 'payment.html';
});

