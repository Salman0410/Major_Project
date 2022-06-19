var express = require('express');
var app = express();

var bodyParser = require('body-parser');


// Allowing our app to use the body parser package.
app.use(bodyParser.urlencoded({extended:false}))

var axios = require("axios").default;

var options = {
method: 'GET',
url: 'https://latest-stock-price.p.rapidapi.com/price',
params: {Indices: 'NIFTY 50'},
headers: {
	'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
	'x-rapidapi-key': '9c4324e513mshdd7f131fa562556p1c3a3fjsnf8baf6f4993d'
}
};

const option = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-analysis',
    params: {symbol: 'AMRN', region: 'IN'},
    headers: {
      'X-RapidAPI-Key': 'a870195071mshd6c23d4f311ba65p1b9603jsna2d1a20be967',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
  };

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/Learning", function(req, res) {
	res.sendFile(__dirname + "/Learning.html");
});

// HANDLING THE POST REQUEST ON /DATA ROUTE.
app.post("/data", function(req, res) {

		var itemSelectedFromDropdown = req.body.stockSelected;

		axios.request(options).then(function (response) {

					var dataFromResponse = response.data;
				for(var i = 0; i<dataFromResponse.length; i++){
				if(dataFromResponse[i].symbol == itemSelectedFromDropdown){

						var dataOfStock = dataFromResponse[i];

						res.send("<html> <style> body{ background-color: black;} .stock{ text-align: center; color: white; }  </style>"+
                        "<head><body class = 'stock'> <h1><strong> " + dataOfStock.symbol + "</strong></h1>"+
						"<h1> Open: " + dataOfStock.open + "</h1>" +
						"<h1> Day High: "+ dataOfStock.dayHigh + "</h1>" +
						"<h1> Day Low: "+ dataOfStock.dayLow + "</h1>" +
						"<h1> Last Price: "+ dataOfStock.lastPrice + "</h1>" +
						"<h1> Previous Close: "+ dataOfStock.previousClose + "</h1>" +
						"<h1> Year High: "+ dataOfStock.yearHigh + "</h1>" +
						"<h1> Year Low: "+ dataOfStock.yearLow + "</h1>" +
						"<h1> Last Update Time: "+ dataOfStock.lastUpdateTime + "</h1>" +
						"</body></head></html>")
				}
				}
		
		}).catch(function (error) {
		console.error(error)
		});
});

app.get('/Analysing' , function(req , res){
   
      
      axios.request(option).then(function (response) {
        var dataFromResponse = response.data;
        console.log(dataFromResponse);
       
            res.send("<html> <h1>" + dataFromResponse['recommendationTrend']['trend'][0]['period']  +  " </h1> "
             
             +" <h1>" + dataFromResponse['recommendationTrend']['trend'][0]["strongBuy"]  +  " </h1> " +
             " <h1>" + dataFromResponse['recommendationTrend']['trend'][0]["buy"]  +  " </h1> " +" </html>");
        

      }).catch(function (error) {
          console.error(error);
      });
  
} )


var port = 3000;
app.listen(port, function() {
	console.log("Server started successfully at port 3000!");
});
 