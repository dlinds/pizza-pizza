# _{Application Name}_

#### By _**{List of contributors}**_

#### _{Brief description of application}_

## Technologies Used

* _List all_
* _the major technologies_
* _you used in your project_
* _here_

## Description

_{This is a detailed description of your application. Give as much detail as needed to explain what the application does as well as any other information you want users or other developers to have.}_

## Setup/Installation Requirements

* _This is a great place_
* _to list setup instructions_
* _in a simple_
* _easy-to-understand_
* _format_

_{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? How should I set up my databases? Is there other code this application depends on? We recommend deleting the project from your desktop, re-cloning the project from GitHub, and writing down all the steps necessary to get the project working again.}_

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
Expected Output: Order {pizzas: {...}, currentID: 1,2,3, etc}  

### Describe Order.prototype.deletePizza(id) 
Test: This should delete a pizza from the order
Code:  
myOrder.deletePizza(id); 
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

* _Any known issues_
* _should go here_

## License

_{Let people know what to do if they run into any issues or have questions, ideas or concerns.  Encourage them to contact you or make a contribution to the code.}_

Copyright (c) _date_ _author name(s)_