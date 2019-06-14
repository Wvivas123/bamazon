var inquirer = require('inquirer');
var mysql      = require('mysql');
var Table = require('cli-table');
var displayTable = [];
var quantityNeeded;
var IDrequested;

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		questionPrompt();
	});
}


function questionPrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you like to purhcase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items do you wish to purchase?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantityNeeded = answers.Quantity;
 	var IDrequested = answers.ID;
	
	
	 purchaseOrder(IDrequested, quantityNeeded);
	

});
};
 
function purchaseOrder(IDrequested, quantityNeeded){
	
	
	connection.query('Select * FROM products WHERE item_id = ' + IDrequested, function(err, res) {
		if(quantityNeeded > res[0].stock_quantity){
			console.log("Sorry Not in Stock");
		}else{
			console.log("We Have it in stock");
			console.log("The Price of your " + res[0].product_name + " is: $"  + res[0].price);
			connection.query('UPDATE Products SET stock_quantity = stock_quantity -' + quantityNeeded, function(err, res) {
			
			});
		
		}
		

	});
};




displayProducts();



