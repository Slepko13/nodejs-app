const fs = require('fs');

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;

	if (url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Enter message</title></head>');
		res.write('<body><h1>Greeting</h1></body>');
		res.write(
			'<body><form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Send data</button></form></body>'
		);
		res.write('</html>');
		res.end();
	}
	if (url === 'users') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head><title>My Page</title></head>');
		res.write(
			'<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>'
		);
		res.write('</html>');
		res.end();
	}
	if (url === '/create-user' && method === 'POST') {
		const body = [];
		req.on('data', chunk => {
			body.push(chunk);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const data = parsedBody.split('=')[1];
			res.setHeader('Content-Type', 'text/html');
			res.write('<html>');
			res.write('<head><title>My Page</title></head>');
			res.write(`<body><h3>${data}</h3></body>`);
			res.write('</html>');
			console.log('username', data);
			res.end();
		});
	}
};

module.exports = requestHandler;
