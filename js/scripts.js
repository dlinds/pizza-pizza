function Order() {
  this.pizzas = {};
}

function Pizza (toppings,size) {
  this.toppings = toppings;
  this.size = size;

}

Order.prototype.addPizza = (function (pizza) {
  this.pizzas = pizza;
})








let myOrder = new Order(); 
const pizza = new Pizza(["pineapple", "bacon"], 3);
myOrder.addPizza(pizza);
myOrder;