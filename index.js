import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || port, ()=>{
    console.log(`listening on port ${port}`);
})
app.post("/submit",async(req,res)=>{
    var lat=req.body['lat'];
    var long=req.body['long'];
    const apiurl="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
    const weather= await axios.get(apiurl);
    let w=weather.data;
    let temp=w.current.temperature_2m+"°C";
    console.log(temp);
    let wind=w.current.wind_speed_10m;
    let weatherparse=wind+"Km/h";
    console.log(w.current.wind_speed_10m);
    // console.log(w);
    // res.json(w);
    res.render("index.ejs",{"temper":temp,"windd":weatherparse,"winds":"Wind Speed"});

})
app.get("/",(req,res)=>{
    res.render("index.ejs",{"temper":" ","windd":"","winds":""});

})


