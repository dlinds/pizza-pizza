# _Pizza, pizza.}_

#### By _**Daniel Lindsey**_

#### _An ordering application for the pizza company known as Pizza, Pizza._

## Technologies Used

* _HTML_
* _CSS_
* _Bootstrap_
* _JavaScript_
* _jQuery_
* _Markdown_

## Description

_When a user navigates to the pizza ordering website for Pizza, pizza. - they will be able to place a pickup or delivery order from Pizza, Pizza. Users will be able to select a Large, Medium, or Small pizza ($20, $15, or $10, respectively), and then choose toppings if they would like any (each topping is $1 each). Once all their pizzas have been added to the order, they can then place the order for pickup or delivery._

## Setup/Installation Requirements

There are two options for running the application
* ### GitHub Pages  
    To view a live version of this project, please navigate to the following site:  
    https://dlinds.github.io/pizza-pizza/

* ### Cloning the repository  
    Alternatively, you can clone/download the repository from Github. To do so,  
    
    1. Click the green Code button in the top right of the repository
    2. Choose Download ZIP
    3. Navigate to your Downloads folder, and extract the contents to your desktop
    4. Double click to open index.html
    5. You should now be viewing the page in your browser.

<br>

## Tests

### Describe Order()
Test: An order should be created that you can add pizzas to  
Code:  
let myOrder = new Order();  
Order {pizzas: {…}}  
  
### Describe Order.prototype.addPizza(pizza) 
Test: A pizza should be added to the order
Code:  
myOrder.addPizza(pizza)  
myOrder;
Expected Output: Order {pizzas: {Pizza}}

### Describe Order.prototype.setPizzaID() 
Test: An incremental ID should be assigned to each pizza added to order
Code:  
myOrder.addPizza(pizza);  
myOrder;  
Expected Output: Order {pizzas: {...}, currentID: 1}  

myOrder.addPizza(pizza2);  
myOrder;  
Expected Output: Order {pizzas: {...}, currentID: 2}  

### Describe Order.prototype.deletePizza(id) 
Test: This should delete a pizza from the order
Code:  
myOrder.deletePizza(id); 
Expected Output: true

### Describe Order.prototype.findPizza(id) 
Test: This should find a pizza
Code:  
myOrder.findPizza(2); 
Expected Output: true

### Describe Pizza(toppings, size)  
Test: "It should create a Pizza object, with toppings from a list and a size selected"  
Code:  
const pizza = new Pizza(["pineapple", "bacon"], "large");  
Expected Output: Pizza { toppings: ["pineapple", "bacon"], size: "large" }  

### Describe Pizza.prototype.calculatePrice()  
Test: "It should determine a price for the pizza based on size and toppings"  
Code:  
const pizza = new Pizza(["pineapple", "bacon"], "large");
pizza;
Expected Output: Pizza { toppings: ["pineapple", "bacon"], size: "large", price: 22}  


## Known Bugs

* _There are no known bugs at this time. If you happen to find one, or get a response that is unexpected, please message me on Github!_

## License

_MIT_

Copyright (c) _1/21/2022_ _Daniel Lindsey_