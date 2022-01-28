function Order() {
  this.pizzas = {};
}

function Pizza (toppings,size) {
  this.toppings = toppings;
  this.size = size;

}




let myOrder = new Order(); 
const pizza = new Pizza(["pineapple", "bacon"], 3);
const pizza2 = new Pizza(["bacon"], 2);

myOrder;
pizza;
pizza2;
