/**
 * Created by harshpatel on 14/08/14.
 */

//cities=["New Delhi","Mumbai","Hyderabad","Bangalore","Chennai","Pune","Kolkata","Jaipur","Ahmedabad","Noida"]
var redis =require("redis");
var client=redis.createClient(6379, '54.251.103.74');
client.select(2, function() { /* ... */ });
exports.level_1_100 = function (req, res, next) {

    client.get("1", function (err, reply) {
        res.send(reply);
    });



};
exports.city=function (req,res,next){
    var cit=req.params.city;
    client.get(cit, function (err, reply) {
        res.send(reply);
    });
};