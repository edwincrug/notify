	var socket = io.connect('http://192.168.1.144:3000/');
	socket.on('mejorandola', function(data){
		console.log(data);
		socket.emit('mejorandolo', {hola:'yo tambien soy mejorandolo'});
	});