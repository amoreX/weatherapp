import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let videoFilePath="/fog.mp4";
let x=0
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
app.post("/submit",async(req,res)=>{
    var lat=req.body['lat'];
    var long=req.body['long'];
    const apiurl="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&current=temperature_2m"
    const weather= await axios.get(apiurl);
    let w=weather.data;
    let temp=w.current.temperature_2m+"°C";
    console.log(temp);
    // console.log(w);
    // res.json(w);
    let x=parseInt(temp,10);
    if (x<0){
        videoFilePath="/winter.mp4";
        console.log(videoFilePath);
    }
    else if (x>=0 && x<15){
        videoFilePath="/fog.mp4";
        console.log(videoFilePath);
    }
    else{
        videoFilePath="/summer.mp4";
        console.log(videoFilePath);
    }
    

    res.render("index.ejs",{"temper":temp,"statement":"The Temperature:","videoFilePath":videoFilePath});
    

})
app.get("/",(req,res)=>{
    res.render("index.ejs",{"statement":" ","temper":" ","videoFilePath":"/home.mp4"});

})