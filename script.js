let productssection = document.getElementById("productssection");

async function getProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    displayAllProducts(data); // ✅ Fix: API returns an array directly
  } catch (error) {
    console.log("error while fetching products", error);
  }
}
getProducts();

function displayAllProducts(allProducts) {
  allProducts.map((ele) => {
    let cardContainer = document.createElement("article");
    cardContainer.setAttribute("class", "cardcontainer");

    //! ✅ FIXED: Added backticks around `innerHTML`
    cardContainer.innerHTML = ` 
      <div> 
        <img src="${ele.image}" alt="${ele.title}">
        <h2>${ele.title.slice(0, 60)}...</h2>
      </div>
      <h4>Rs. ${ele.price}</h4>
      <button onclick='handleAddToCart(${JSON.stringify(ele)})'>Add to cart</button>
    `;

    productssection.append(cardContainer);
  });
}

function handleAddToCart(product) {
    // console.log("added to cart", product);

    //  initializing cart variable
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //  finding index of existing product 
    let existingProductIndex = cart.findIndex((ele)=> ele.id === product.id)

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
      
    } else {
      cart.push({...product, quantity:1});
      
    }

    //  store cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // alert message
    alert(`${product.title} added to the cart`);


    displayCartItems();

}
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);


  let cartsection = document.getElementById("cartsection")
  cartsection.innerHTML = "<h1>My Cart</h1>"


  if (cart.length === 0) {
    cartsection.innerHTML = "<h1>Cart is empty</h1>";
  }
  else {
    cart.map((item, index)=>{
      let div = document.createElement("div")
      div.innerHTML = `

      <img src = '${item.image}'>
      <h2> ${item.title}</h2>
      <p>Price ${item.quantity}</p>
      <p>Price ${item.quantity * item.price}</p>
      <button onclick = 'removeCartItem(${index})'>remove</button>

      `;
      cartsection.append(div);
    });
  }


}

function removeCartItem(index){
  console.log("removed", index);

  let cart = JSON.parse(localStorage.getItem("cart")) || []

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1

  }else {
    cart.splice(index, 1)
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  displayCartItems()


}

window.addEventListener("load", ()=>{
  displayCartItems();
});






