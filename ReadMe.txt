Install required packages

•	Download and install Node.js
•	Download and install socket.io
	Socket.IO is composed of two parts:
	o	A server that integrates with (or mounts on) the Node.JS HTTP Server socket.io
	o	A client library that loads on the browser side socket.io-client
	During development, socket.io serves the client automatically for us, as we’ll see, so for now we only have to install one module:
	npm install socket.io
•	Install Nodemon:
	npm i nodemon

To connect to node server :
cd nodeServer
nodemon index.js
