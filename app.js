const express  =  require('express');
const bodyParser = require("body-parser");
const https = require('https');

const app =  express();

app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+ "/app.html");
});


app.post("/", (req,res)=>{
    const city =  req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=metric&appid=9e5ca1af89ac1feb53a04648bdb16297#";
    https.get(url, (resp)=>{
        resp.on("data" ,  (data)=>{
            // process.stdout.write(data);
            const wData =  JSON.parse(data);  //converting any data to object
            // console.log(JSON.stringify(weatherData ));    to converting object ot string
            const temp = wData.main.temp;
            const weatherDes = wData.weather[0].description;
            const icon =  wData.weather[0].icon;
            const iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write("<p> The weather is currently " + weatherDes + " </p>" )
            res.write("<h1>Temprature in " + city+" : "  + temp + " degree</h1>");
            res.write(`<img src="${iconurl}">`); 
            res.send();
        });
});
})

const port  =  process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("server started on port 3000");
});