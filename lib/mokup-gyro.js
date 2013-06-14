/*************************************************/
/*
/* mok gyro iphone app
/* depend on node-osc
/* need to be imported in node script with :
/* require('mokup-gyro')			
/*									
/*************************************************/
var osc = require('node-osc');
var dgram = require('dgram');
var min = require('osc-min');
var GyroMokup = function(host, port){
    /*************************************************/
    /* setup                                                
    /*************************************************/
    // selfref
    var me = this;
    // addr base path
    me.basepath = "/gyrosc";
    // dgram udp socket setup
    me.host = host;
    me.port = port;
    me._sock = dgram.createSocket('udp4');

    /*************************************************/
    /* private functions                                               
    /*************************************************/
    //private path
    var _path = function(path){
        return me.basepath + path;
    }
    // private generic send
    var _send = function(msg) {
        // client.send.apply(client, arguments);
        var buf = min.toBuffer({
            oscType : "bundle"
            , timetag : new Date().getTime()
            , elements : [msg]
        });
        me._sock.send(buf, 0, buf.length, me.port, me.host, function(){
            process.exit(0);
        });
        
    }
    /*************************************************/
    /* /gyro p, r, y                                             
    /*************************************************/
    me.sendGyro = function(p, r, y){
        try{
            var msg =  new osc.Message(_path("/gyro"), p, r, y);
            _send(msg);
        }
        catch(err){
            console.log(err)
            console.log("you must provide --p --r --y parameters (float)");
        }
    }
    /*************************************************/
    /* /accel x y z                                              
    /*************************************************/
    me.sendAccel = function(x, y, z){
        try{
            var msg =  new osc.Message(_path("/accel"), x, y, z);
            _send(msg);
        }
        catch(err){
            console.log("you must provide --x --y --z parameters")
        }
    }
    /*************************************************/
    /* /comp x y z                                              
    /*************************************************/
    me.sendComp = function(h){
        try{
            var msg =  new osc.Message(_path("/comp"), h);
            _send(msg);
        }
        catch(err){
            console.log("you must provide --h parameters")
        }
    }
    /*************************************************/
    /* /rrate x y z                                              
    /*************************************************/
    me.sendRRate = function(x, y, z){
        try{
            var msg =  new osc.Message(_path("/rrate"), x, y, z);
            _send(msg);
        }
        catch(err){
            console.log("you must provide --x --y --z parameters")
        }
    }
}

module.exports = GyroMokup;