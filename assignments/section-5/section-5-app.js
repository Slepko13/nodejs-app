const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/users', (req, res, next) => {
	console.log('Users path handler');
	res.send('<div>Users</div>');
});

app.use('/', (req, res, next) => {
	console.log('Any path handler');
	res.send('<div>Any</div>');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
