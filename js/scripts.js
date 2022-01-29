// Business Logic

function Order() {
  this.pizzas = {};
  this.currentID = 0;
}

Order.prototype.addPizza = (function (pizza) {
  pizza.id = this.setPizzaID()
  this.pizzas[pizza.id] = pizza;
});

Order.prototype.setPizzaID = (function () {
  this.currentID += 1;
  return this.currentID;
});

Order.prototype.deletePizza = (function (id) {
  if (this.pizzas[id] === undefined) {
    return false;
  }
  delete this.pizzas[id];
  return true;
});

Order.prototype.findPizza = function (id) {
  return this.pizzas[id];
}

function Pizza (toppings,size) {
  this.toppings = toppings;
  this.size = size;
  this.calculatePrice();
}

Pizza.prototype.calculatePrice = (function() {
  switch (this.size) {
    case "Small":
      this.price = 10 + this.toppings.length;
      break;
    case "Medium":
      this.price = 15 + this.toppings.length;
      break;
    case "Large":
      this.price = 20 + this.toppings.length;
      break;
    default:
      return false;            
  }
});






let myOrder = new Order(); 




// UI Logic

function getPizzaToppings() {
  let toppingsArray = [];
  $("input:checkbox[name=toppings]:checked").each(function() {
    toppingsArray.push($(this).val());
  });
  return toppingsArray;
}

function addPizzaToOrderScreen (pizza) {

  let pizzaOrderList = "<div class=\"row order-row\" id=\"pizza-row-"+ pizza.id + "\"><div class=\"col-7 order-col\"><h5 class=\"heading-5\">" + pizza.size + " Pizza</h5>";
  if (pizza.toppings.length === 9) {
    pizzaOrderList += "<ul><li>The Everything</li></ul>"
  } else if (pizza.toppings.length > 0) {
    pizzaOrderList += "<ul>";
    pizza.toppings.forEach(function (topping) {
      pizzaOrderList += "<li>" + topping + "</li>";
    });
    pizzaOrderList += "</ul>";
  } else {
    pizzaOrderList += "<ul><li>Classic Cheese</li></ul>"
  }

  pizzaOrderList += "</div><div class=\"col-5 align-self-end\">$" + pizza.price + "<br><br><span class=\"btn btn-dark remove-pizza-button\" id=\"remove-pizza-" + pizza.id + "\"><u>Remove Pizza</u></span></div><hr class=\"order-divide\"></div>";
  $("#current-pizza-list").append(pizzaOrderList);
}

function resetInputs () {
  $("#pizza-size").val("");
  $('input[name="toppings"]').each(function() {
    this.checked = false;
  });
}

function calculateTotal () {
  
  let totalPizzaCount = 0;
  let totalPizzaPrice = 0;
  Object.keys(myOrder.pizzas).forEach(function(key) {
    let pizza = myOrder.findPizza(key);
    totalPizzaPrice += pizza.price;
    totalPizzaCount++;
  });
  $("#total-pizza-count").text(totalPizzaCount);
  $("#total-USD").text("$" + totalPizzaPrice);
  $("#totals-row").removeClass("hidden");
}

function clickHandlerForRemovePizza (id) {
  $("#remove-pizza-" + id).on("click", function() {
    $("#pizza-row-" + id).remove();
    myOrder.deletePizza(id);
    calculateTotal();
  });
}


$(document).ready(function() {

  $("#start-order-button").on("click", function() {
    $("#start-order-screen").slideUp(300, function () {
      $("#pizza-ordering-container").slideDown(300);
    });    
  });

  $("select#pizza-size").change(function() {
    $("#toppings-menu").removeClass("hidden");
  });

	$("form#add-pizza").submit(function(event) {
    event.preventDefault();
    //$("#size-toppings-selection").removeClass("col-lg-12");
    $("#size-toppings-selection").addClass("col-lg-7");
    $("#order-details-row").slideDown(100);
    let pizza = new Pizza(getPizzaToppings(),$("#pizza-size").val());
    myOrder.addPizza(pizza);
    addPizzaToOrderScreen(pizza);
    calculateTotal();
    resetInputs();
    clickHandlerForRemovePizza(pizza.id);
  });


});