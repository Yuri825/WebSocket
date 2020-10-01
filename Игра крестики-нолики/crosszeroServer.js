"use strict";

let WebSocketServer = require('websocket').server; // подключаем встроенный модуль 'websocket'
let http = require('http'); // подключаем встроенный модуль 'http'

let server = http.createServer(function(request, response) { // запускаем сервер
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end();
});

server.listen(8888, function() { }); // задаем порт для сервера

let wsServer = new WebSocketServer ({httpServer: server});// объект для websocket

let clients = []; // массив для подключенных клиентов

wsServer.on('request', function(request) {
	let connection = request.accept(null, request.origin); 
	clients.push(connection); // добавляем в массив подключенных клиентов


	connection.on('message', function(message) { // получение сообщения от клиента

		// console.log(message.utf8Data);

		for(let client of clients) { // отправка сообщения (всем клиентам кроме себя)
			if(client != connection) {
				client.sendUTF(message.utf8Data);
				// console.log(message.utf8Data);
			}
				
		}
	});


	connection.on('close', function(connection) { // закрываем соединение
		console.log('соединение закрыто');
	});
});