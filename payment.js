document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Retrieved cart:', cart); // Debugging output

    const paymentItems = document.getElementById('payment-items');
    const paymentTotal = document.getElementById('payment-total');
    let total = 0;

    paymentItems.innerHTML = '';

    cart.forEach(item => {
        console.log('Processing item:', item); // Debugging output
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-name">${item.name} (x${item.quantity})</span>
            <span class="item-price">₹${itemTotal.toFixed(2)}</span>
        `;
        paymentItems.appendChild(li);
    });

    paymentTotal.textContent = total.toFixed(2);
    console.log('Total amount:', total.toFixed(2)); // Debugging output

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty!';
        paymentItems.appendChild(emptyMessage);
    }

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedMethod = document.querySelector('.selected-payment span')?.textContent;

        if (!selectedMethod) {
            alert('Please select a payment method before proceeding.');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty! Please add items to your cart before proceeding to payment.');
            return;
        }

        // Prompt user for table number
        const tableNumber = prompt('Please enter your table number:');
        if (!tableNumber || isNaN(tableNumber) || tableNumber.trim() === '') {
            alert('Invalid table number. Please enter a valid number.');
            return;
        }

        // Store order details and table number
        const orderDetails = {
            tableNumber: tableNumber,
            cart: cart,
            total: total.toFixed(2),
            paymentMethod: selectedMethod
        };

        // Store order details in local storage
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        alert('Payment confirmed! Your table number is ' + tableNumber);

        // Clear the cart
        localStorage.removeItem('cart');

        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    });

    // Add event listeners to payment option buttons
    document.querySelectorAll('.payment-option').forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove the selected class from all buttons
            document.querySelectorAll('.payment-option').forEach(btn => {
                btn.classList.remove('selected-payment');
            });

            // Add the selected class to the clicked button
            event.currentTarget.classList.add('selected-payment');

            // Store selected payment method in localStorage or proceed with payment logic
            const selectedMethod = event.currentTarget.querySelector('span').textContent;
            localStorage.setItem('selectedPaymentMethod', selectedMethod);
        });
    });
});
