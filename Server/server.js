const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const PORT = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

//Load the json file and return array of objects.
function getData(){
    var rawData = fs.readFileSync('./analyzer.json');
    var obj = JSON.parse(rawData.toString());
    return obj;
}

//Select 3 random values in order to "analyze" the image.
function random_select(){
    var obj = ["Dog", "Cat", "Person", "Hand", "Guitar", "Pizza", "Umbrella", "Desk", "Computer", "Door", "Sea", "Mountain", "Cow", "Smile", "Skirt", "Sunglasses", "Coffee", "Hamburger"];
    const shuffled = obj.sort(() => 0.5 - Math.random());
    var selected = shuffled.slice(0, 3);
    return selected;
}


router.post('/add_image', (req,res) => {
    try{
        var url = req.body.imageUrl;
        var id = req.body.imageId;

        if(!Number.isInteger(id))
        {
            res.status(400).send(`Invalid ID: ${id}`);
            return;
        }
        var selected = random_select();
    
        var obj = getData();
        for (var i = 0; i < obj.length; i++) {
                if(obj[i].imageId === id){
                    res.status(400).send("Image id already exist");
                    return;
                }
        }
        obj.push({"imageId": id , "Objects": selected});
    
        fs.writeFileSync('./analyzer.json', JSON.stringify(obj, null, 2));
     
        res.status(200).send("Done"); 
        return;

    }catch(error){
        res.status(500).send(error);
        return;
    }
})

router.get('/labels', (req,res) => {
    try{   
        var labels = [];
        var id = req.query.imageId;
        if(!Number.isInteger(id))
        {
            res.status(400).send(`Invalid ID: ${id}`);
            return;
        }

        var obj = getData();
        for (var i = 0; i < obj.length; i++) {
                if(obj[i].imageId == id){
                    labels = obj[i].Objects;
                }
        }
        res.status(200).send(labels);
        return;
    }catch(error){
        res.status(500).send(error);
        return;
    }

})
app.listen(PORT);
console.log('server running', PORT)