        const products = [
            {
                id: 1,
                name: "Silk Saree with Zari Work",
                price: 2499,
                originalPrice: 4999,
                rating: "★★★★☆",
                image: "https://embroidery.odoo.com/web/image/1338-7d679800/7.webp"
            },
            {
                id: 2,
                name: "Handmade Embroidered Cushion",
                price: 599,
                originalPrice: 1200,
                rating: "★★★★★",
                image: "https://embroidery.odoo.com/web/image/1330-6ff02a22/2.webp"
            },
            {
                id: 3,
                name: "Cotton Kurti with Aari Work",
                price: 1299,
                originalPrice: 1899,
                rating: "★★★★☆",
                image: "https://embroidery.odoo.com/web/image/1333-f93aabbd/3.webp"
            },
            {
                id: 4,
                name: "Jaipur Block Print Tablecloth",
                price: 899,
                originalPrice: 1500,
                rating: "★★★★★",
                image: "https://embroidery.odoo.com/web/image/1334-5e9f40ea/4.webp"
            },
            {
                id: 5,
                name: "Vintage Embroidered Tote Bag",
                price: 1450,
                originalPrice: 2100,
                rating: "★★★★☆",
                image: "https://embroidery.odoo.com/web/image/1339-9a961d43/8.webp"
            },
            {
                id: 6,
                name: "Wall Hanging with Mirror Work",
                price: 799,
                originalPrice: 1200,
                rating: "★★★☆☆",
                image: "https://embroidery.odoo.com/web/image/1340-4e6f65b7/9.webp"
            }
        ];

        let cart = [];

        const productList = document.getElementById('product-list');

        function renderProducts() {
            productList.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="rating">${product.rating}</div>
                        <div class="price">
                            ₹${product.price} 
                            <span>₹${product.originalPrice}</span>
                        </div>
                        <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCart();
            document.getElementById('cart-modal').classList.add('active');
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }

        function updateQuantity(id, change) {
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(id);
                } else {
                    updateCart();
                }
            }
        }

        function updateCart() {
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').innerText = totalCount;

            const cartItemsContainer = document.getElementById('cart-items');
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:20px; color:#666;">Your cart is empty.</p>';
            } else {
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div style="flex-grow:1">
                            <h4 style="font-size:14px; margin-bottom:5px;">${item.name}</h4>
                            <p style="font-weight:bold; margin-bottom:5px;">₹${item.price}</p>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <button onclick="updateQuantity(${item.id}, -1)" style="padding:2px 8px;">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)" style="padding:2px 8px;">+</button>
                                <span style="margin-left:auto; color:red; cursor:pointer; font-size:12px;" onclick="removeFromCart(${item.id})">Remove</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('total-price').innerText = '₹' + totalPrice.toLocaleString('en-IN');
        }

        function toggleCart() {
            document.getElementById('cart-modal').classList.toggle('active');
        }

        renderProducts();