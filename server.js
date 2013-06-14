
var GyroDispatcher = require('./lib/gyro-dispatcher');
var argv = require('optimist')
	.usage('Send fake osc gyro cmd.\nUsage: $0')
    .options('p', {
        alias : 'port',
        default : '8080',
    })
    .options('h', {
        alias : 'host',
        default : 'localhost',
    })
    .argv;

var GyroServer = new GyroDispatcher(argv.host, argv.port);

GyroServer.on("gyro", function(data){
	console.log("gyro");
	console.log(data);
});

GyroServer.on("accel", function(data){
	console.log("accel");
	console.log(data);
});

GyroServer.on("comp", function(data){
	console.log("comp");
	console.log(data);
});

GyroServer.on("rrate", function(data){
	console.log("rrate");
	console.log(data);
});

GyroServer.start();