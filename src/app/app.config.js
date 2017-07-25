/**
 * Config file provisory
 * TO-DO : Creo que esta no es la mejor manera. Se puede hacer como un injectable,
 * tambien hay que considerar el enviroment que esta corriendo.
 */
module.exports = {

    "APIs" : {
        "playout_ws" : "http://localhost:8002",
        "playout_rest" : "http://localhost:8001/api/",
        "admin" : "http://localhost:8080/api/", 
        "core" : "http://localhost:8003"    
    },
    "scheduler" : {
        slotDuration : '00:05:00',
        snapDuration : '00:05:00',
        slotLabelInterval : '00:05:00'
    }
}