/*************************************************/
/*
/* client mok gyro iphone app	
/* usage : 
/* node client.js --host 192.168.1.104 --port 12000 --cmd "gyro" --x 12 --y 5 --z 8	
/* node client.js --cmd "comp" --h 12
/*									
/*************************************************/


var osc = require('node-osc')
	, GyroMokup = require('./lib/mokup-gyro');

var argv = require('optimist')
	.usage('Send fake osc gyro cmd.\nUsage: $0')
    .options('port', {
        alias : 'port',
        default : '8080',
    })
    .options('host', {
        alias : 'host',
        default : 'localhost',
    })

    .demand('c')
    .alias('c', 'command')
    .describe('c', 'Command to send to osc server { gyro, accel, comp }')
    .argv
;


var GyroMokupClient = new GyroMokup(argv.host, argv.port);

switch(argv.command){
	/*************************************************/
	/*	GYRO
	/*************************************************/
	case "gyro": 
		GyroMokupClient.sendGyro(argv.p, argv.r, argv.y);
		break;
	/*************************************************/
	/*	ACCEL
	/*************************************************/
	case "accel": 
		GyroMokupClient.sendAccel(argv.x, argv.y, argv.z);
		break;
	/*************************************************/
	/*	COMP
	/*************************************************/
	case "comp": 
		GyroMokupClient.sendComp(argv.h);
		break;
	/*************************************************/
	/*	RRATE
	/*************************************************/
	case "rrate": 
		GyroMokupClient.sendRRate(argv.x, argv.y, argv.z);
		break;
}

;