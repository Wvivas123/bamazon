var inquirer = require('inquirer');
var mysql      = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"Mydog123",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});




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
 	console.log(quantityNeeded);
    console.log(IDrequested);
});
};
function databaseQuerry(){
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
var query = "SELECT * FROM Products";
connection.query(query, function(err, res) {
console.log(res);
});
    console.log(query)

}     
    
//questionPrompt();
databaseQuerry();

