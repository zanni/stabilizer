var osc = require('node-osc');
var events = require('events');

var GyroServer = function(host, port){
    var me = this;
    me.host = host;
    me.port = port;

    events.EventEmitter.call(me);

    me.start = function(){
        var oscServer = new osc.Server(me.port, me.host);
        oscServer.on("message", function (msg, rinfo) {
            // console.log("------------------------");
            // console.log(msg);
            // console.log(rinfo);
            if(msg.length == 3){
                var type = msg[0];
                var timetag = msg[1];
                var content = msg[2];
                if(type == "#bundle"){
                    try{
                        console.log(content[0])
                        switch(content[0]){
                            case "/gyrosc/gyro":
                                me.emit('gyro', content);
                                break;

                            case "/gyrosc/accel":
                                me.emit('accel', content);
                                break;

                            case "/gyrosc/comp":
                                me.emit('comp', content);
                                break;

                            case "/gyrosc/rrate":
                                me.emit('rrate', content);
                                break;
                        }
                    }
                    catch(err){

                    }
                }
                else{
                    console.log("not well formed message - type not #bundle")
                }
            }
            else{
                console.log("not well formed message - 3 elements array")
            }
        });
        console.log("Start osc server on " + me.host + ":" + me.port);
    }
    return me;
}

GyroServer.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = GyroServer;

