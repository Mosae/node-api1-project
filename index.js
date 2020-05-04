const express = require('express');
const server = express();
server.use(express.json());

let users = [
	{
		id: 'a_unique_id', // hint: use the shortid npm package to generate it
		name: 'Jane Doe', // String, required
		bio: "Not Tarzan's Wife, another Jane", // String, required
	},
];

server.get('/', (req, res) => {
	res.json({ name: 'Mosae S Litsoane' });

	server.get('/api/users', function (req, res) {
		res.json(users);
	});
});

server.post('/api/users', function (req, res) {
	const userInfo = req.body;

	res.status(201).json(userInfo);
});

server.listen(8000, () => console.log('API Works'));
