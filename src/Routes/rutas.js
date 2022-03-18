const { Router } = require("express");
const router = Router();

const sensor = require('./data.json');

//SENSOR (POST)
router.post('/sensor',(req,res) => {
    const {humedad, mineral} = req.body;
    if(humedad && mineral)
    {
        const id = sensor.length +1;
        const nuevalectura = {...req.body, id};

        sensor.push(nuevalectura);
        res.send('OK, NUEVA CAPTURA DE SENSOR');

    }
    else{
        res.status(500).json({error: "no data"});
    }
});

//REGAR (GET) TODOS LOS SENSORES
router.get('/regar',(req,res) => {
    
    let regar = [];
    let noregar = [];

    sensor.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if(key == "id"){
                temp_id = value;
            }
            if(key == "humedad"){
                if(value < 70){
                    regar.push(temp_id);

                }
                else{
                    noregar.push(temp_id);
                }
            }    
        })
    })
    res.send("REGAR LAS PLANTAS: "+regar+", \n PLANTAS: "+noregar+" EN BUEN NIVELES DE HUMEDAD");
});

//REGAR (GET) UN SENSOR
router.get('/regar/:id',(req,res) => {
    const{id} = req.params;
    sensor.forEach(sensor => {
        if(sensor.id == id){
            if(sensor.humedad < 70){
                res.send("REGAR PLANTA " +sensor.id+"!");
            }
            else{
                res.send("HUMEDAD ADECUADA EN PLANTA "+sensor.id);
            }
        }
    })
});

//LECTURAS (GET) TODOS LOS SENSORES
router.get('/lecturas',(req,res) => {
    res.send(sensor);
});

//LECTURAS (GET) UN SENSORES
router.get('/lectura/:id',(req,res) => {
    const{id} = req.params;
    sensor.forEach(sensor => {
        if(sensor.id == id){
            res.json({
                humedad: sensor.humedad,
                mineral: sensor.mineral
            })
        }
    })
});

//HISTORIAL (GET)
router.get('/historial/:id',(req,res) => {
    const{id} = req.params;
    sensor.forEach(sensor => {
        if(sensor.id == id){
            res.json({
                "última regada" : sensor.ultima,
                "segunda regada": sensor.segunda,
                "tercera regada": sensor.tercera,
            })
        }
    })
})

//RANGO (GET)
router.get('/rango/:id/:from/:to',(req,res) => {
    const{id}   = req.params;
    const{from} = req.params;
    const{to}   = req.params;
    from_index = 999; 
    to_index   = 999;

    sensor.forEach(sensor => {
        if(sensor.id == id){
            
            for (let i = 0; i < sensor.regadas.length; i++) {                 
            
                if(sensor.regadas[i] == to){
                    from_index = i;
                }

                if(sensor.regadas[i] == from){
                    to_index = i;
                }
            }
        }
    });
    dias = Math.abs (from_index-to_index);

    if((from_index != 999) && (to_index != 999)){
      
        res.send("SE HA REGADO  " +(dias+1)+" VECES");
        
    }
    else{        
        res.send("ELIGE OTRO RANGO DE FECHAS"+dias);        
    }

});
module.exports = router;