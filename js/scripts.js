// Business Logic

function Order() {
  this.pizzas = {};
  this.currentID = 0;
}

Order.prototype.addPizza = (function (pizza) {
  this.pizzas[this.setPizzaID()] = pizza;
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
// const pizza = new Pizza(["pineapple", "bacon"], "large");
// const pizza2 = new Pizza(["bacon"], "medium");
// myOrder.addPizza(pizza);
// myOrder.addPizza(pizza2);



// UI Logic

function getPizzaToppings() {
  let toppingsArray = [];
  $("input:checkbox[name=toppings]:checked").each(function() {
    toppingsArray.push($(this).val());
  });
  return toppingsArray;
}

$(document).ready(function() {

  $("#start-order-button").on("click", function() {
    $("#start-order-screen").slideUp(300, function () {
      $("#pizza-ordering-container").slideDown(300);
    });    
  });



	$("form#add-pizza").submit(function(event) {
    event.preventDefault();
    let pizza = new Pizza(getPizzaToppings(),$("#pizza-size").val());
    myOrder.addPizza(pizza);
    console.log(myOrder);
  });


});