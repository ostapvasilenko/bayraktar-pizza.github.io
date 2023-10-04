let products = [
  {
    id: "himars",
    name: "Himars",
    price: 225,
    img: "./img/our-pizza/himars.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "peach",
    name: "Peach",
    price: 185,
    img: "./img/our-pizza/peach.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "stefania",
    name: "Stefania",
    price: 225,
    img: "./img/our-pizza/stefania.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "margarita",
    name: "Margarita",
    price: 225,
    img: "./img/our-pizza/margarita.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "mexicana",
    name: "Mexicana",
    price: 225,
    img: "./img/our-pizza/mexicana.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "spinach",
    name: "Spinach",
    price: 225,
    img: "./img/our-pizza/spinach.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "hawai",
    name: "Hawai",
    price: 225,
    img: "./img/our-pizza/hawai.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "javelina",
    name: "Javelina",
    price: 225,
    img: "./img/our-pizza/javelina.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
  {
    id: "bayraktar",
    name: "Bayraktar",
    price: 225,
    img: "./img/our-pizza/bayraktar.png",
    weight: "530 г",
    size: "30 см",
    descr: "Опис",
  },
];

let additionalProducts = [
  {
    id: "barbecue",
    name: "barbecue",
    price: 19,
  },
  {
    id: "cheesy",
    name: "cheesy",
    price: 29,
  },
  {
    id: "cola",
    name: "cola",
    price: 20,
  },
  {
    id: "pepsi",
    name: "pepsi",
    price: 18,
  },
  {
    id: "sprite",
    name: "sprite",
    price: 18,
  },
];

function addProductToCart(product, quantity) {
  // get cart from local storage
  let cart = verifyExistCart();
  if (cart) {
    let { mainItems } = cart;

    if (mainItems.filter((item) => item.id === product.id).length == 0) {
      mainItems.push({ ...product, quantity });
      cart.mainItems = mainItems;

      // set to local storage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    // create cart
    cart = {
      mainItems: [{ ...product, quantity }],
      additionalItems: [],
      totalPrice: 0,
      nameCustomer: "",
      phoneCustomer: "",
      delivery: false,
      address: "",
      payment: "",
      comments: "",
    };
    // set to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotalItems(cart)
}

function addAdditionalToCart(event, quantity) {
  // get additional from local storage
  let cart = verifyExistCart();
  if (cart) {
    let { additionalItems } = cart;
    let add = additionalProducts.filter((item) => item.id === event.target.id);
    if (event.currentTarget.checked) {
      additionalItems.push({ ...add[0], quantity });
      cart.additionalItems = additionalItems;
    } else {
      let add = additionalItems.filter((item) => item.id !== event.target.id);
      cart.additionalItems = add;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotalItems(cart)
  }
}

function updateTotalItems(cart) {
  if (cart) {
    let cart = calcTotalCost()
    let { mainItems } = cart;

    let totalProducts = 0;
    mainItems.forEach((item) => {
      totalProducts += item.quantity;
    });

    document.querySelector(".basket__amount").innerText = totalProducts;
    document.querySelector(".count__price").innerHTML = '<span>' + cart.totalPrice + '</span> грн';

    const totalPrice = document.querySelector(".total__price");
    totalPrice.innerText = cart.totalPrice + " грн"
  } else {
    document.querySelector(".basket__amount").innerText = 0;
    document.querySelector(".count__price").innerHTML = '<span>' + cart.totalPrice + '</span> грн';

    const totalPrice = document.querySelector(".total__price");
    totalPrice.innerText = 0 + " грн"
  }
}

function verifyExistCart() {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  if (cart == null || cart == undefined) {
    // create cart
    cart = {
      mainItems: [],
      additionalItems: [],
      totalPrice: 0,
      nameCustomer: "",
      phoneCustomer: "",
      delivery: false,
      address: "",
      payment: "",
      comments: "",
    };
    // set to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    return false;
  } else {
    return cart;
  }
}

function getQuantityPizza(event) {
  // get parent element
  const parent = event.target.parentElement;
  // get child by class
  const quantity = parent.querySelector(".pizza__counter");
  // get child by data attribute
  let data = quantity.querySelector("[data-counter]");
  // get value
  const val = Number(data.textContent);
  data.textContent = 1;
  return val;
}

function calcTotalCost() {
  let cart = verifyExistCart();
  if (cart) {
    let { mainItems } = cart;
    let { additionalItems } = cart;
    let totalProducts = 0;
    let totalAdditional = 0;
    let deliveryPrice = 50;
    // calc total products
    mainItems.forEach((item) => {
      totalProducts += item.price * item.quantity;
    });
    // calc total additional ?
    additionalItems.forEach((item) => {
      totalAdditional += item.price * item.quantity;
    });
    // calc total delivery
    // ...


    cart.totalPrice = totalProducts + totalAdditional + (document.getElementById('courier').checked ? deliveryPrice : 0);
    console.log(cart.totalPrice)
    localStorage.setItem("cart", JSON.stringify(cart));

    if (document.getElementById('courier').checked) {
      document.querySelector('[data-cart-delivery]').style.display = "block";
    } else {
      document.querySelector('[data-cart-delivery]').style.display = "none";
    }
  } else {
    localStorage.removeItem("cart");
  }
  return cart;
}

function deletePizza(event) {
  const cartItem = event.target.closest(".pizza__body_cart")
  const id = cartItem.getAttribute("data-id");
  let cart = verifyExistCart();
  if (cart) {
    let { mainItems } = cart;

    cart.mainItems = mainItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));

    cartItem.remove();
  }
  updateTotalItems(cart)
}

function drawPizzaInCart(selector, event) {
  let cart = verifyExistCart();
  let html = "";
  if (cart && cart.mainItems.length > 0) {
    const { mainItems } = cart;
    mainItems.forEach((item) => {
      html += `
	<div class="pizza__body_cart" data-id="${item.id}">
	  <div class="cart__img">
		 <img src="${item.img}" alt="pizza">
	  </div>
	  <div class="cart__info">
		 <div class="info__main">
			<div class="cart__title">
			   <h3>${item.name}</h3>
			</div>
			<div class="cart__pizza_size">
			   <p>Розмір: ${item.size}</p>
			</div>
			<div class="cart__pizza_weight">
			   <p>Вага: ${item.weight}</p>
			</div>
			<div class="cart__counter">
			   <div class="pizza__counter">
				  <div class="items__control" data-action="minus">-</div>
				  <div class="items__current" data-counter>${item.quantity}</div>
				  <div class="items__control" data-action="plus">+</div>
			   </div>
			</div>
			<button class="delete__pizza">X</button>
		 </div>
	  </div>
   </div>  
   `;
    });
  }
  document.querySelector(selector).innerHTML = html;

  const delPizza = document.querySelectorAll(".delete__pizza");
  delPizza.forEach((del, index) => {
    del.addEventListener("click", (event) => {
      deletePizza(event)
    });
  });

  //change number of pizza in the order
  addChangePizzaQuantity()

  //change number of additionals in the order
  addChangeAddsQuantity()
}

function addChangePizzaQuantity() {
  const pizzaContainer = document.querySelector(".pizza__container");
  const pizzaCounters = pizzaContainer.querySelectorAll(".pizza__counter");
  pizzaCounters.forEach((cntr, index) => {
    cntr.addEventListener("click", (event) => {
      let counter = event.target.parentElement.querySelector("[data-counter]");
      let val;
      if (event.target.dataset.action === 'plus') {
        val = Number(counter.innerText) + 1;
      } else if (event.target.dataset.action === 'minus') {
        val = Number(counter.innerText) - 1;
        if (val <= 0) val = 1;
      }

      const cartItem = event.target.closest(".pizza__body_cart")
      const id = cartItem.getAttribute("data-id");
      let cart = verifyExistCart();
      if (cart) {
        let { mainItems } = cart;

        let obj_index = mainItems.findIndex((item) => item.id === id);
        let obj = mainItems[obj_index]
        obj.quantity = val;

        mainItems[obj_index] = obj
        cart.mainItems = mainItems;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalItems(cart)
      }
    });
  });

}

function addChangeAddsQuantity() {
  const pizzaContainer = document.querySelector(".info__additional");
  const pizzaCounters = pizzaContainer.querySelectorAll(".pizza__counter");
  pizzaCounters.forEach((cntr, index) => {
    cntr.addEventListener("click", (event) => {
      let counter = event.target.parentElement.querySelector("[data-counter]");
      let val;
      if (event.target.dataset.action === 'plus') {
        val = Number(counter.innerText) + 1;
      } else if (event.target.dataset.action === 'minus') {
        val = Number(counter.innerText) - 1;
        if (val <= 0) val = 1;
      }

      const cartItem = event.target.closest(".adds__obj")
      const id = cartItem.getAttribute("data-id");
      if (document.getElementById(id).checked) {
        let cart = verifyExistCart();
        if (cart) {
          let { additionalItems } = cart;
          let obj_index = additionalItems.findIndex((item) => item.id === id);
          let obj = additionalItems[obj_index]
          obj.quantity = val;

          additionalItems[obj_index] = obj
          cart.additionalItems = additionalItems;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateTotalItems(cart)
        }
      }
    });
  });

  //reset adds
  //reserAdds()

  //set current quantity for adds
  let cart = verifyExistCart();
  if (cart) {
    let { additionalItems } = cart;

    additionalItems.forEach((item) => {
      const pizzaContainer = document.querySelector(".info__additional");
      const adds__obj = pizzaContainer.querySelectorAll(".adds__obj");
      adds__obj.forEach((cntr, index) => {
        const id = cntr.getAttribute("data-id");
        if (id === item.id) {
          document.getElementById(id).checked = true

          let pizza__counter = cntr.querySelector(".pizza__counter");
          let counter = pizza__counter.querySelector("[data-counter]");

          counter.innerText = item.quantity
        }
      });
    });
  }
}

function clearCart() { }

document.addEventListener("DOMContentLoaded", () => {
  // Verify if cart exists in local storage
  let cart = verifyExistCart();
  if (cart) {
    updateTotalItems(cart)
  }

  // Get every button with class "buy__btn"
  const cards = document.querySelectorAll(".buy__btn");
  cards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      addProductToCart(products[index], getQuantityPizza(event));
    });
  });

  // Get every button with class "adds_check"
  const adds = document.querySelectorAll(".adds_check");
  adds.forEach((add, index) => {
    add.addEventListener("change", (event) => {
      addAdditionalToCart(event, getQuantityPizza(event))
    });
  });

  const fav_btns = document.querySelectorAll(".pizza__favourite");
  fav_btns.forEach((fav_btn, index) => {
    fav_btn.addEventListener("click", () => {
      addFavorite(products[index])
    });
  });

  // Draw pizza in cart
  const cartIcon = document.querySelector(".menu__basket");
  cartIcon.addEventListener("click", (event) => {
    drawPizzaInCart(".pizza__container", event);
    prepareForm()
  });

  // Draw favorites
  const favIcon = document.querySelector(".menu__favourite");
  favIcon.addEventListener("click", () => {
    drawFavorites(".favs__container");
  });

  // Draw favorites
  const order_btn = document.getElementById("order__pizza");
  order_btn.addEventListener("click", () => {
    orderPizza();
  });

  const deliv_checkbox = document.getElementById('courier');
  deliv_checkbox.addEventListener("change", () => {
    updateTotalItems(verifyExistCart())
  });

  const self_checkbox = document.getElementById('byself');
  self_checkbox.addEventListener("change", () => {
    updateTotalItems(verifyExistCart())
  });

  updateTotalFavs(getFavorites())

  // Validation Form-Phone
  let element = document.getElementById("phone");
  let maskOptions = {
    mask: "+38 (000) 00-00-000",
    lazy: false,
  };
  try {
    let mask = IMask(element, maskOptions);
  } catch (e) { }
});


//favorites
function getFavorites() {
  let favs = localStorage.getItem("favs");
  if (favs == null || favs == undefined) favs = "[]"
  favs = JSON.parse(favs);
  return favs;
}

function updateTotalFavs(favs) {
  document.querySelector(".favourite__amount").innerText = favs.length;
}

function addFavorite(product) {
  let favs = getFavorites()
  favs.push({ ...product });
  localStorage.setItem("favs", JSON.stringify(favs));
  updateTotalFavs(favs)
}

function drawFavorites(selector) {
  let favs = getFavorites()
  let html = "";
  if (favs && favs.length > 0) {
    favs.forEach((item) => {
      html += `
	  <div class="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
            <div class="pizza__card" data-id="${item.id}">
               <div class="pizza__items">
                  <img src="${item.img}" alt="pizza">
                  <div class="info__top">
                     <div class="pizza__info">
                        <p class="pizza__weight">${item.weight}</p>
                        <p class="pizza__size">${item.size}</p>
                     </div>
                     <button class="pizza__favourite_card">
                        <img src="./img/our-pizza/red-favourite.svg" alt="like">
                     </button>
                  </div>
                  <div class="card__title">
                     <h3>${item.name}</h3>
                  </div>
                  <div class="items__hover">
                     <h3 class="title__hover">${item.name}</h3>
                     <p class="describe__hover">${item.descr}
                     </p>
                  </div>
               </div>
               <div class="pizza__buy">
                  <div class="pizza__counter">
                     <div class="items__control" data-action="minus">-</div>
                     <div class="items__current" data-counter>1</div>
                     <div class="items__control" data-action="plus">+</div>
                  </div>
                  <button data-cart type="button" class="buy__btn_fav">
                     в корзину
                  </button>
                  <div class="pizza__price">
                     <p>225 грн</p>
                  </div>
               </div>
            </div>
         </div>
   `;
    });
  }
  document.querySelector(selector).innerHTML = html;

  const fav_btns = document.querySelectorAll(".pizza__favourite_card");
  fav_btns.forEach((fav_btn, index) => {
    fav_btn.addEventListener("click", () => {
      removeFavorite(event)
    });
  });

  // Get every button with class "buy__btn_fav"
  const cards = document.querySelectorAll(".buy__btn_fav");
  cards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      addProductToCart(getCurrentFavorite(event), getQuantityPizza(event));
    });
  });
}

function getCurrentFavorite(event) {
  const cartItem = event.target.closest(".pizza__card")
  const id = cartItem.getAttribute("data-id");
  let favs = getFavorites()
  let a = favs.filter((item) => item.id === id)
  return a[0]
}

function removeFavorite(event) {
  const cartItem = event.target.closest(".pizza__card")
  const id = cartItem.getAttribute("data-id");
  let favs = getFavorites()
  favs = favs.filter((item) => item.id !== id)
  localStorage.setItem("favs", JSON.stringify(favs));
  updateTotalFavs(favs)

  cartItem.parentElement.remove();
}

function orderPizza() {
  let cart = verifyExistCart();
  if (cart && cart.mainItems.length > 0) {
    cart.nameCustomer = document.getElementById('fname').value
    cart.phoneCustomer = document.getElementById('phone').value
    cart.address = document.getElementById('address').value
    cart.comments = document.getElementById('textComment').value
    cart.delivery = document.getElementById('courier').checked
    cart.payment = (document.getElementById('cash').checked ? "cashe" : (document.getElementById('bank').checked ? "bank" : ""))

    localStorage.setItem("cart", JSON.stringify(cart));

    //send request
    //...
  }
}

function prepareForm() {
  let cart = verifyExistCart();
  if (cart) {
    document.getElementById('fname').value = cart.nameCustomer
    document.getElementById('phone').value = cart.phoneCustomer
    document.getElementById('address').value = cart.address
    document.getElementById('textComment').value = cart.comments
    if (cart.delivery) document.getElementById('courier').checked = true
    else document.getElementById('byself').checked = true

    if (cart.payment === "cash") document.getElementById('cash').checked = true
    else if (cart.payment === "bank") document.getElementById('bank').checked = true
  }
}



