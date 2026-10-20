    
        // Store cart products here
        let cart = {};

        // Select HTML elements
        const cartCount = document.getElementById("cartCount");
        const cartItems = document.getElementById("cartItems");
        const cartTotal = document.getElementById("cartTotal");

        // Add product to cart
        document.querySelectorAll(".add-btn").forEach(function(button) {
            button.addEventListener("click", function() {
                const id = button.dataset.id;
                const name = button.dataset.name;
                const price = Number(button.dataset.price);

                if (cart[id]) {
                    cart[id].quantity++;
                } else {
                    cart[id] = {
                        name: name,
                        price: price,
                        quantity: 1
                    };
                }

                updateCart();
            });
        });

        // Increase or decrease quantity
        function changeQuantity(id, amount) {
            cart[id].quantity += amount;

            if (cart[id].quantity <= 0) {
                delete cart[id];
            }

            updateCart();
        }

        // Update cart count, items and total
        function updateCart() {
            let count = 0;
            let total = 0;
            let html = "";

            for (const id in cart) {
                const product = cart[id];

                count += product.quantity;
                total += product.price * product.quantity;

                html += `
                    <div class="d-flex justify-content-between
                                align-items-center border-bottom py-3 gap-2">
                        <div>
                            <strong>${product.name}</strong>
                            <div>Rs. ${product.price} each</div>
                        </div>

                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary"
                                onclick="changeQuantity('${id}', -1)">−</button>

                            <span>${product.quantity}</span>

                            <button class="btn btn-sm btn-outline-secondary"
                                onclick="changeQuantity('${id}', 1)">+</button>
                        </div>
                    </div>
                `;
            }

            cartCount.textContent = count;
            cartTotal.textContent = total.toLocaleString("en-PK");
            cartItems.innerHTML = html || "<p>Your cart is empty.</p>";
        }

        // Empty the cart
        document.getElementById("clearCart").addEventListener("click", function() {
            cart = {};
            updateCart();
        });
    