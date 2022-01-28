function Order() {
  this.pizzas = {};
  this.currentID = 0;
}

function Pizza (toppings,size) {
  this.toppings = toppings;
  this.size = size;

}

Order.prototype.addPizza = (function (pizza) {
  this.pizzas[this.setPizzaID()] = pizza;
})

Order.prototype.setPizzaID = (function () {
  this.currentID += 1;
  return this.currentID;
})







let myOrder = new Order(); 
const pizza = new Pizza(["pineapple", "bacon"], 3);
const pizza2 = new Pizza(["bacon"], 2);
myOrder.addPizza(pizza);
myOrder.addPizza(pizza2);