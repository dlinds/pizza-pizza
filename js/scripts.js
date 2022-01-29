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

function addPizzaToFinalizeScreen () {
  $("#finalize-order-list").text("");
  let totalPizzaCount = 0;
  let totalPizzaPrice = 0;
  Object.keys(myOrder.pizzas).forEach(function(key) {
    let pizza = myOrder.findPizza(key);
    let finalizeOrderList = "";
    totalPizzaPrice += pizza.price;
    totalPizzaCount++;
    finalizeOrderList += "<div class=\"pizza-order-details-names\" id=\"pizza-details-row-" + pizza.id + "\"><h5 class=\"heading-5 underline-pizza-name\" id=\"pizza-details-item-" + pizza.id + "\">" + pizza.size + " Pizza ($" + pizza.price + ") <span id=\"pizza-details-plus-minus-" + pizza.id + "\">+</span></h5>";
    if (pizza.toppings.length === 9) {
      finalizeOrderList += "<ul class=\"hidden\" id=\"pizza-details-ingredients-" + pizza.id + "\"><li>The Everything</li></ul>"
    } else if (pizza.toppings.length > 0) {
      finalizeOrderList += "<ul class=\"hidden\" id=\"pizza-details-ingredients-" + pizza.id + "\">";
      pizza.toppings.forEach(function(topping) {
        finalizeOrderList += "<li>" + topping + "</li>"
      })
      finalizeOrderList += "</ul>";
    } else {
      finalizeOrderList += "<ul class=\"hidden\" id=\"pizza-details-ingredients-"+ pizza.id + "\"><li>Classic Cheese</li></ul>"
    }
    finalizeOrderList += "</div>";
    $("#finalize-order-list").append(finalizeOrderList);
    clickHandlerFinalizeOrderDetails(pizza.id);
  });
  if (totalPizzaCount === 1) {
    $("#finalize-order-list").append("<div id=\"finalize-totals\"><div class=\"row\"><div class=\"col-4\"><span id=\"finalize-total-num-pizzas\">" + totalPizzaCount +"</span> Pizza</div><div class=\"col-4\"></div><div class=\"col-4\">$<span id=\"finalize-total-cost-pizzas\">" + totalPizzaPrice + "</span></div></div></div>");
  } else {
    $("#finalize-order-list").append("<div id=\"finalize-totals\"><div class=\"row\"><div class=\"col-4\"><span id=\"finalize-total-num-pizzas\">" + totalPizzaCount +"</span> Pizzas</div><div class=\"col-4\"></div><div class=\"col-4\">$<span id=\"finalize-total-cost-pizzas\">" + totalPizzaPrice + "</span></div></div></div>");
  }
  
}

function clickHandlerFinalizeOrderDetails (id) {
  $("#pizza-details-item-" + id).on("click", function() {
    $("#pizza-details-ingredients-" + id).slideToggle(100);
    if ($("#pizza-details-plus-minus-" + id).text() === "+") {
      $("#pizza-details-item-" + id).removeClass("underline-pizza-name");
      $("#pizza-details-plus-minus-" + id).text("-");
    } else {
      $("#pizza-details-item-" + id).addClass("underline-pizza-name");
      $("#pizza-details-plus-minus-" + id).text("+");
    }
  });
}

function resetInputs () {
  $("#pizza-size").val("");
  $('input[name="toppings"]').each(function() {
    this.checked = false;
  });
  $("#toppings-menu").slideUp(300);
  $("#order-place-head").text("Add another Pizza!");
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

function processOrder () {
  $("#processing-status").text("Processing Your Order");
  $("#processing-status").fadeIn(1000);
  $("#processing-status").fadeOut(1000, function() {
    $("#processing-status").text("Making the pizzas");
  });
  $("#processing-status").fadeIn(1000, function() {
    $("#processing-status").fadeOut(1000, function() {
      $("#processing-status").text("Order Complete!");
      $("#processing-status").fadeIn(1000, function () {
        $("#finished-message").removeClass("hidden");
        createFinalMessage();
      });
    });
  });
}

function createFinalMessage () {

  if ($("#pickup-name").val().length > 0) {
    //console.log($("#pickup-name").val());
    $("#finished-message").html("Thanks " + $("#pickup-name").val() + "! Your pickup order has been placed! We should have it ready in about 20 minutes. For driving directions, please click here: <a href=\https:google.com\\maps\">Google Maps</a>. If we don't see you in the next hour or so, we will give you a call at " + $("#pickup-tel").val() + ". <br><br>Thanks again and see you soon!");
  } else {
    //console.log($("#delivery-name").val());
    $("#finished-message").html("Thanks " + $("#delivery-name").val() + "! Your delivery order has been placed. In the next 30 or so minutes, we will make a delivery to<br>" + $("#delivery-address").val() + "<br>" + $("#delivery-city").val() + "<br>" + $("#delivery-zip").val() + "<br><br>. If we have any issues, we will give you a call at " + $("#delivery-tel").val() + ".<br><br>Thanks again and see you soon!");
  }
}

$(document).ready(function() {

  $("#start-order-button").on("click", function() {
    $("#start-order-screen").slideUp(300, function () {
      $("#pizza-ordering-container").slideDown(300);
    });    
  });

  $("#advance-to-order-screen").click(function() {
    addPizzaToFinalizeScreen();
    $("#order-placed-screen").slideDown(300);
    $("#pizza-ordering-container").slideUp(300);
  });

  $("select#pizza-size").change(function() {
    $("#toppings-menu").slideDown(300);
  });

  $("#modify-order").click(function() {
    resetInputs();
    $("#pizza-ordering-container").slideDown(300);
    $("#order-placed-screen").slideUp(300);
    $("#pickup-details-card").hide();
    $("#delivery-details-card").hide();
    $("#place-your-order-container").hide();
    $("button#pickup").removeClass("selected-button");
    $("button#delivery").removeClass("selected-button");
  });

  $("button#pickup").click(function() {
    $("#pickup-details-card").slideDown(200);
    $("#delivery-details-card").slideUp(200);
    $("#place-your-order-container").slideDown(200);
    $("button#pickup").addClass("selected-button");
    $("button#delivery").removeClass("selected-button");
  });

  $("button#delivery").click(function() {
    $("#pickup-details-card").slideUp(200);
    $("#delivery-details-card").slideDown(200);
    $("#place-your-order-container").slideDown(200);
    $("button#pickup").removeClass("selected-button");
    $("button#delivery").addClass("selected-button");
  });

  $("#delivery-choose-time").click(function () {
    $("#choose-delivery-time").slideDown(300);
  });

  $("#delivery-asap-time").click(function () {
    $("#choose-delivery-time").slideUp(300);
  });

  $("#pickup-choose-time").click(function () {
    $("#choose-pickup-time").slideDown(300);
  });

  $("#pickup-asap-time").click(function () {
    $("#choose-pickup-time").slideUp(300);
  });

  $("#place-the-order-button").click(function () {
    $("#order-placed-screen").slideUp(300);
    $("#processing-order").slideDown(300, function() {
      processOrder();
    });
  });

	$("form#add-pizza").submit(function(event) {
    event.preventDefault();
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