let productsMap = new Map();
let cart = new Map();

//stye
function changeBeforeStyle(selector, property, value) {
    // Create a new style element
    const style = document.createElement('style');
    style.type = 'text/css';
    
    // Set the content for the style
    style.innerHTML = `${selector}::before { ${property}: ${value}; }`;
    
    // Append the style to the head of the document
    document.head.appendChild(style);
}
// Create Cart Confirmed
function createTotalPriceContainer() {
    // Create the main total price container div
    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.className = 'total-confirmed-cart-price-container';

    // Create and append the total order span
    const totalOrder = document.createElement('span');
    totalOrder.className = 'total-order';
    totalOrder.textContent = 'Total Order';
    totalPriceContainer.appendChild(totalOrder);

    // Create and append the total price span
    const totalPrice = document.createElement('span');
    totalPrice.className = 'total-price';
    totalPrice.textContent = `$${GetTotalCartPrice().toFixed(2)}`;
    totalPriceContainer.appendChild(totalPrice);

    // Append the total price container div to the body or any specific container
    return totalPriceContainer;
}
function createOrderConfirmed(cartItem) {
    // Create the main order confirmed div
    const orderConfirmed = document.createElement('div');
    orderConfirmed.className = 'order-confirmed';

    // Create and append the image
    const img = document.createElement('img');
    img.src = 'assets/images/icon-order-confirmed.svg';
    img.alt = '';
    orderConfirmed.appendChild(img);

    // Create and append the header
    const header = document.createElement('h1');
    header.textContent = 'Order Confirmed';
    orderConfirmed.appendChild(header);

    // Create and append the paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = 'We hope you enjoy your food';
    orderConfirmed.appendChild(paragraph);

    // Create the confirmed cart div
    const confirmedCart = document.createElement('div');
    confirmedCart.className = 'confirmed-cart';

    // Create the product cart div
    const productCart = document.createElement('div');
    productCart.className = 'product-cart';

    // Create and append the product image
    const productImg = document.createElement('img');
    productImg.src = cartItem.thumbnail;
    productImg.alt = '';
    productCart.appendChild(productImg);

    // Create and append the cart details div
    const cartDetails = document.createElement('div');
    cartDetails.className = 'cart-details';

    // Create and append the product name
    const productName = document.createElement('h5');
    productName.className = 'cart-name';
    productName.textContent = cartItem.name;
    cartDetails.appendChild(productName);

    // Create and append the details div
    const details = document.createElement('div');
    details.className = 'details';

    // Create and append the quantity
    const quantity = document.createElement('span');
    quantity.className = 'quantity';
    quantity.textContent = `x${cartItem.quantity}`;
    details.appendChild(quantity);

    // Create and append the product total price
    const totalPrice = document.createElement('span');
    totalPrice.className = 'product-total-price';
    totalPrice.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
    details.appendChild(totalPrice);

    // Append the details to cart details
    cartDetails.appendChild(details);

    // Append the cart details to product cart
    productCart.appendChild(cartDetails);

    // Append the product cart to confirmed cart
    confirmedCart.appendChild(productCart);

    // Append confirmed cart to the main order confirmed div
    orderConfirmed.appendChild(confirmedCart);

    orderConfirmed.append(createTotalPriceContainer());
    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'Start New Order';
    button.addEventListener("click", () => {
        changeBeforeStyle(".page", "display", `none`);
        orderConfirmed.remove();
        // Reload the current page
        location.reload();
    })
    orderConfirmed.appendChild(button);

    // Append the order confirmed div to the body or any specific container
    document.querySelector(".cart-container").appendChild(orderConfirmed);
}
function appendconfirmedProduct(cartItem) {
    // Create the main product cart div
    const productCart = document.createElement('div');
    productCart.className = 'product-cart';

    // Create and append the product image
    const img = document.createElement('img');
    img.src = cartItem.thumbnail;
    img.alt = '';
    productCart.appendChild(img);

    // Create the cart details div
    const cartDetails = document.createElement('div');
    cartDetails.className = 'cart-details';

    // Create and append the product name
    const productName = document.createElement('h5');
    productName.className = 'cart-name';
    productName.textContent = cartItem.name;
    cartDetails.appendChild(productName);

    // Create and append the details div
    const details = document.createElement('div');
    details.className = 'details';

    // Create and append the quantity
    const quantity = document.createElement('span');
    quantity.className = 'quantity';
    quantity.textContent = `x${cartItem.quantity}`;
    details.appendChild(quantity);

    // Create and append the product total price
    const totalPrice = document.createElement('span');
    totalPrice.className = 'product-total-price';
    totalPrice.textContent = `$${cartItem.totalPrice.toFixed(2)}`;
    details.appendChild(totalPrice);

    // Append the details to cart details
    cartDetails.appendChild(details);

    // Append cart details to the main product cart div
    productCart.appendChild(cartDetails);

    // Append the product cart div to the body or any specific container
    document.querySelector(".confirmed-cart").appendChild(productCart);
}
function generateConfirmedCart(){
    changeBeforeStyle(".page", "content", `""`)
    let counter = 0;
    for (const [key, val] of cart) {
        if(counter === 0){
            createOrderConfirmed(val);
        }else{
            appendconfirmedProduct(val);
        }
        counter++;
    }
}
// Creating Carts

function AddToCart(productID){
    for (const [key, value] of productsMap) {
        if(value.Id === productID){
            let newCart = {
                Id: value.Id,
                name: value.name,
                price: value.price,
                totalPrice: value.price,
                quantity: 1,
                thumbnail: value.image.thumbnail
            }
            cart.set(`${cart.size}`, newCart);
        }
    }
}
function findCartById(Id){
    for (const [key, value] of cart) {
        if(value.Id === Id)
            return value;
    }
}
function GetTotalCartPrice(){
    let totalPrice = 0;
    for (const [key, val] of cart) {
        totalPrice += val.totalPrice;
    }
    return totalPrice;
}
function getLastElementInCart(){
    let lastCartItem;
    for (const [key, val] of cart) {
        lastCartItem = val;
    }
    return lastCartItem;
}
function removeCartItem(Id){
    document.getElementById(`cart-${Id}`).remove();
}
function removeCartFromMap(Id){
    let keyToDelete;
    for (const [key, value] of cart) {
        if(value.Id === Id){
            keyToDelete = key;
            break;
        }
    }

    if(cart.delete(keyToDelete))
        console.log("Cart Item Deleted");
    else
    console.log("Failed To Delete Cart Item");
}
function hideOrDisplayEmptyCart(){
    const emptyCart = document.querySelector(".empty-cart");
    if(cart.size > 0){
        emptyCart.style.display = "none";
    }else{
        document.querySelector(".cart").remove();
        emptyCart.style.display = "block";
    }
}
function updatePriceElementsAndTotalOrders(){
    if(cart.size > 0){
        console.log("updated")
        const cartHeader = document.querySelector('.cart-header');
        cartHeader.textContent = `Your Cart (${cart.size})`;
    
        const totalPrice = document.querySelector('.total-price');
        totalPrice.textContent = `$${GetTotalCartPrice().toFixed(2)}`;
    }
}
function updateProductTotalPriceAndQuantityElement(newquantity, totalPrice, Id){
    if(cart.size > 0){
        const quantity = document.getElementById(`quantity-${Id}`);
        quantity.textContent = `x${newquantity}`;

        const productTotalPrice = document.getElementById(`total-Price-${Id}`);
        productTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }
}
function createCart(cartItem) {
    // Create main cart div
    const cartDiv = document.createElement('div');
    cartDiv.className = 'cart';

    // Create cart header
    const cartHeader = document.createElement('h4');
    cartHeader.className = 'cart-header';
    cartHeader.textContent = `Your Cart (${cart.size})`;
    cartDiv.appendChild(cartHeader);

    // Create products container
    const productsContainer = document.createElement('div');
    productsContainer.className = 'products-carts';

    // Create product cart
    const productCart = document.createElement('div');
    productCart.className = 'product-cart';
    productCart.id = `cart-${cartItem.Id}`;

    // Create product name
    const productName = document.createElement('h5');
    productName.className = 'cart-name';
    productName.textContent = `${cartItem.name}`;
    productCart.appendChild(productName);

    // Create cart details
    const cartDetails = document.createElement('div');
    cartDetails.className = 'cart-details';

    // Create details container
    const details = document.createElement('div');
    details.className = 'details';

    // Create quantity, price, and total price elements
    const quantity = document.createElement('span');
    quantity.className = 'quantity';
    quantity.id = `quantity-${cartItem.Id}`;
    quantity.textContent = `x${cartItem.quantity}`;
    
    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = `$${cartItem.price.toFixed(2)}`;
    
    const productTotalPrice = document.createElement('span');
    productTotalPrice.className = 'product-total-price';
    productTotalPrice.id = `total-Price-${cartItem.Id}`;
    productTotalPrice.textContent = `$${cartItem.totalPrice.toFixed(2)}`;

    // Append details to the details container
    details.appendChild(quantity);
    details.appendChild(productPrice);
    details.appendChild(productTotalPrice);

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-from-cart';

    removeButton.addEventListener("click", () => {
        removeCartItem(cartItem.Id);
        removeCartFromMap(cartItem.Id);
        updatePriceElementsAndTotalOrders();
        hideOrDisplayEmptyCart();
    });

    // Append details and button to cart details
    cartDetails.appendChild(details);
    cartDetails.appendChild(removeButton);
    productCart.appendChild(cartDetails);
    productsContainer.appendChild(productCart);
    cartDiv.appendChild(productsContainer);

    // Create total price container
    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.className = 'total-price-container';

    const totalOrder = document.createElement('span');
    totalOrder.className = 'total-order';
    totalOrder.textContent = 'Total Order';
    
    const totalPrice = document.createElement('span');
    totalPrice.className = 'total-price';
    totalPrice.textContent = `$${GetTotalCartPrice().toFixed(2)}`;

    // Append total order and price to the container
    totalPriceContainer.appendChild(totalOrder);
    totalPriceContainer.appendChild(totalPrice);
    cartDiv.appendChild(totalPriceContainer);

    // Create carbun neutral section
    const carbunNeutral = document.createElement('div');
    carbunNeutral.className = 'carbun-neutral';

    const carbonNeutralImage = document.createElement('img');
    carbonNeutralImage.src = 'assets/images/icon-carbon-neutral.svg';
    carbonNeutralImage.alt = '';

    const carbonNeutralText = document.createElement('p');
    carbonNeutralText.innerHTML = 'This is <span>carbun-neutral</span> delivery';

    carbunNeutral.appendChild(carbonNeutralImage);
    carbunNeutral.appendChild(carbonNeutralText);
    cartDiv.appendChild(carbunNeutral);

    // Create confirm order button
    const confirmButton = document.createElement('button');
    confirmButton.className = 'confirm-order';
    confirmButton.textContent = 'Confirm Order';
    confirmButton.addEventListener("click", () => {
        generateConfirmedCart();
    })
    cartDiv.appendChild(confirmButton);

    // Append the cart div to the body (or any other container)
    document.querySelector(".cart-container").appendChild(cartDiv);
}
function AppendCart(cartItem) {
    // Create the main product cart div
    const productCart = document.createElement('div');
    productCart.className = 'product-cart';
    productCart.id = `cart-${cartItem.Id}`;

    // Create product name element
    const cartName = document.createElement('h5');
    cartName.className = 'cart-name';
    cartName.textContent = cartItem.name; // Set the product name
    productCart.appendChild(cartName);

    // Create cart details container
    const cartDetails = document.createElement('div');
    cartDetails.className = 'cart-details';

    // Create details container
    const details = document.createElement('div');
    details.className = 'details';

    // Create quantity, price, and total price elements
    const quantityElement = document.createElement('span');
    quantityElement.className = 'quantity';
    quantityElement.id = `quantity-${cartItem.Id}`;
    quantityElement.textContent = `x${cartItem.quantity}`; // Set the quantity

    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = `$${cartItem.price.toFixed(2)}`; // Set the product price

    const productTotalPrice = document.createElement('span');
    productTotalPrice.className = 'product-total-price';
    productTotalPrice.id = `total-Price-${cartItem.Id}`;
    productTotalPrice.textContent = `$${cartItem.totalPrice.toFixed(2)}`; // Set the total price (same as product price here)

    // Append details to the details container
    details.appendChild(quantityElement);
    details.appendChild(productPrice);
    details.appendChild(productTotalPrice);

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-from-cart';

    removeButton.addEventListener("click",() => {
        removeCartItem(cartItem.Id);
        removeCartFromMap(cartItem.Id);
        updatePriceElementsAndTotalOrders();
        hideOrDisplayEmptyCart();
    })

    // Append details and button to cart details
    cartDetails.appendChild(details);
    cartDetails.appendChild(removeButton);
    productCart.appendChild(cartDetails);

    document.querySelector(".products-carts").appendChild(productCart);
}


// create Products
async function getDataFromJson(url) {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return new Map(Object.entries(data));
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}
function displayIncreaseDecreaseButtons(addToCartButton, IncreaseDecreaseButtonsDiv, AddCartBool){
    if(AddCartBool){
        addToCartButton.style.display = "none";
        IncreaseDecreaseButtonsDiv.style.display = "flex";
    }else{
        addToCartButton.style.display = "flex";
        IncreaseDecreaseButtonsDiv.style.display = "none";
    }
}
function createProductElement(imageSrc, productName, category, price, ID) {
    // Create the main product div
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    // Create the image and add-to-cart container
    const containerDiv = document.createElement('div');
    containerDiv.className = 'image-add-to-cart-container';

    // Create the product thumbnail image
    const img = document.createElement('img');
    img.className = 'product-thumbnail';
    img.src = imageSrc;
    img.alt = '';

    // Create the add to cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'add-to-cart';
    addToCartButton.textContent = 'Add To Cart';
    addToCartButton.setAttribute("data-Id", ID);

    // Create the increase/decrease cart buttons container
    const cartButtonsDiv = document.createElement('div');
    cartButtonsDiv.className = 'increase-decrease-cart';

    // Create the increase button
    const increaseButton = document.createElement('button');
    increaseButton.className = 'increase';
    increaseButton.textContent = '';
    increaseButton.setAttribute("data-Id", ID);

    // Create the decrease button
    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'decrease';
    decreaseButton.textContent = '';
    decreaseButton.setAttribute("data-Id", ID);

    // Event listener for adding to cart
    addToCartButton.addEventListener('click', () => {
        // Here you can implement your cart logic
        AddToCart(ID);
        displayIncreaseDecreaseButtons(addToCartButton, cartButtonsDiv, true);
        if(cart.size === 1){
            // Create The Cart Element
            hideOrDisplayEmptyCart();
            createCart(getLastElementInCart());
        }else{
            // Append The Cart Element
            AppendCart(getLastElementInCart());
            updatePriceElementsAndTotalOrders();
        }
        
    });

    // Event listener for increasing quantity
    increaseButton.addEventListener('click', () => {
        let cartItem = findCartById(ID);
        cartItem.quantity++;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        updateProductTotalPriceAndQuantityElement(cartItem.quantity,cartItem.totalPrice, cartItem.Id);
        updatePriceElementsAndTotalOrders();
    });

    // Event listener for decreasing quantity
    decreaseButton.addEventListener('click', () => {
        let cartItem = findCartById(ID);
        if(cartItem.quantity  === 1){
            removeCartFromMap(cartItem.Id);
            removeCartItem(cartItem.Id);
            displayIncreaseDecreaseButtons(addToCartButton, cartButtonsDiv, false);
            hideOrDisplayEmptyCart();
        }else{
            cartItem.quantity-=1;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
            updateProductTotalPriceAndQuantityElement(cartItem.quantity,cartItem.totalPrice, cartItem.Id);
        }
        updatePriceElementsAndTotalOrders();
    });

    // Append elements to the cart buttons div
    cartButtonsDiv.appendChild(increaseButton);
    cartButtonsDiv.appendChild(decreaseButton);

    // Append all components to the container
    containerDiv.appendChild(img);
    containerDiv.appendChild(addToCartButton);
    containerDiv.appendChild(cartButtonsDiv);

    // Create the text div
    const textDiv = document.createElement('div');
    textDiv.className = 'text';

    // Create product name span
    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = productName;

    // Create category span
    const categorySpan = document.createElement('span');
    categorySpan.className = 'categury';
    categorySpan.textContent = category;

    // Create price span
    const priceSpan = document.createElement('span');
    priceSpan.className = 'price';
    priceSpan.textContent = "$" + price;

    // Append text spans to the text div
    textDiv.appendChild(nameSpan);
    textDiv.appendChild(categorySpan);
    textDiv.appendChild(priceSpan);

    // Append the container and text div to the product div
    productDiv.appendChild(containerDiv);
    productDiv.appendChild(textDiv);

    return productDiv;
}
function createProductsAndAppendToWrapper(data){
    let productsWrapperElement = document.querySelector(".wrapper")
    data.forEach(element => {
        productsWrapperElement.appendChild(createProductElement(element.image.thumbnail, element.name, element.category, element.price, element.Id));
    });
}
function createProducts(){
    getDataFromJson("data.json").then((resultMap) => {
        //console.log(resultMap)
        productsMap = new Map(resultMap);
    }).then(() => {
        createProductsAndAppendToWrapper(productsMap)
    });
}

//// Starter
createProducts();