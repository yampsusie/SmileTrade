// 简单的路由功能
function navigate(page) {
    const main = document.querySelector('main');
    switch(page) {
        case 'home':
            main.innerHTML = '<h1 class="text-center">欢迎来到简洁购物网站</h1>';
            break;
        case 'products':
            main.innerHTML = '<h2>产品列表</h2><div id="product-list" class="row"></div>';
            loadProducts();
            break;
        case 'cart':
            main.innerHTML = '<h2>购物车</h2><div id="cart-items"></div>';
            loadCart();
            break;
        case 'account':
            main.innerHTML = `
                <h2>账户</h2>
                <div id="account-info"></div>
                <form id="login-form" class="mt-3">
                    <input type="email" id="email" placeholder="邮箱" required class="form-control mb-2">
                    <input type="password" id="password" placeholder="密码" required class="form-control mb-2">
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            `;
            setupLoginForm();
            break;
    }
}

// 加载产品列表
function loadProducts() {
    // 模拟从API获取产品数据
    const products = [
        { id: 1, name: '产品1', price: 99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: '产品2', price: 199, image: 'https://via.placeholder.com/150' },
        { id: 3, name: '产品3', price: 299, image: 'https://via.placeholder.com/150' }
    ];

    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4 mb-3';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">价格: ¥${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary">加入购物车</button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

// 加入购物车
function addToCart(productId) {
    // 这里应该调用后端API将产品添加到购物车
    console.log(`将产品 ${productId} 加入购物车`);
    alert('产品已加入购物车！');
}

// 加载购物车
function loadCart() {
    // 模拟从API获取购物车数据
    const cartItems = [
        { id: 1, name: '产品1', price: 99, quantity: 2 },
        { id: 2, name: '产品2', price: 199, quantity: 1 }
    ];

    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '<ul class="list-group">' + 
        cartItems.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} - ¥${item.price} x ${item.quantity}
                <span class="badge bg-primary rounded-pill">¥${item.price * item.quantity}</span>
            </li>
        `).join('') + '</ul>';

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartItemsElement.innerHTML += `<p class="mt-3">总计: ¥${total}</p>`;
}

// 设置登录表单
function setupLoginForm() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // 这里应该调用后端API进行登录验证
        console.log('登录:', email, password);
        alert('登录成功！');
        loadAccountInfo(email);
    });
}

// 加载账户信息
function loadAccountInfo(email) {
    const accountInfo = document.getElementById('account-info');
    accountInfo.innerHTML = `
        <h3>欢迎, ${email}</h3>
        <p>这里是您的账户信息</p>
    `;
}

// 初始化
window.onhashchange = () => navigate(window.location.hash.slice(1) || 'home');
navigate('home');
