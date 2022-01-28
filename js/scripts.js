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
    case "small":
      this.price = 10 + this.toppings.length;
      break;
    case "medium":
      this.price = 15 + this.toppings.length;
      break;
    case "large":
      this.price = 20 + this.toppings.length;
      break;
    default:
      return false;            
  }
});






// let myOrder = new Order(); 
// const pizza = new Pizza(["pineapple", "bacon"], "large");
// const pizza2 = new Pizza(["bacon"], "medium");
// myOrder.addPizza(pizza);
// myOrder.addPizza(pizza2);



// UI Logic