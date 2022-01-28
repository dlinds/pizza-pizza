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
  let pizzaOrderList = $("#current-pizza-list").html();
  pizzaOrderList += "<div class=\"row order-row\" id=\"pizza-row-"+ pizza.id + "\"><div class=\"col-7 order-col\">" + pizza.size + " Pizza";
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

  pizzaOrderList += "</div><div class=\"col-5 align-self-end\">$" + pizza.price + "<br><br><span class=\"btn btn-dark remove-pizza-button\" id=\"remove-pizza-" + pizza.id + "\"><u>Remove Pizza</u></span></div></div><hr>";
  $("#current-pizza-list").html(pizzaOrderList);
}

function clickHandlerForRemovePizza (id) {
  $("#remove-pizza-" + id).on("click", function() {
    $("#pizza-row-" + id).remove();
    console.log(id);
  });
}

function resetInputs () {
  $("#pizza-size").val("");
  $('input[name="toppings"]').each(function() {
    this.checked = false;
  });
}

function calculateTotal () {
  $("#totals-row").removeClass("hidden");
}

$(document).ready(function() {

  $("#start-order-button").on("click", function() {
    $("#start-order-screen").slideUp(300, function () {
      $("#pizza-ordering-container").slideDown(300);
    });    
  });



	$("form#add-pizza").submit(function(event) {
    event.preventDefault();
    $("#size-toppings-selection").removeClass("col-lg-12");
    $("#size-toppings-selection").addClass("col-lg-7");
    $("#order-details-row").removeClass("hidden");
    let pizza = new Pizza(getPizzaToppings(),$("#pizza-size").val());
    myOrder.addPizza(pizza);
    addPizzaToOrderScreen(pizza);
    clickHandlerForRemovePizza(pizza.id);
    calculateTotal();
    resetInputs();
  });


});