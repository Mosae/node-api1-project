const express = require('express');
const server = express();
const shortid = require('shortid');
server.use(express.json());

let users = [
	{
		id: shortid.generate(), // hint: use the shortid npm package to generate it
		name: 'Jane Doe', // String, required
		bio: "Not Tarzan's Wife, another Jane", // String, required
	},
	{
		id: shortid.generate(),
		name: 'Bill Will',
		bio: 'Skater',
	},
	{
		id: shortid.generate(),
		name: 'Lynn Slater',
		bio: 'Accidental Icon',
	},
];

//Test Server - works
server.get('/', (req, res) => {
	res.json({ name: 'Mosae S Litsoane' });
});
//End of test

//Get the list of users - done
server.get('/api/users', function (req, res) {
	res.json(users); //returns array users
});
//--------------------------------------------//

//create new user
server.post('/api/users', function (req, res) {
	const userInfo = req.body;
	const newUser = {
		id: shortid.generate(),
		...userInfo,
	};
	if (newUser === undefined) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else if (newUser.name === undefined) {
		res.status(400).json({ message: 'please add name' });
	} else if (newUser.bio === undefined) {
		res.status(400).json({ message: 'please add bio' });
	} else {
		users.push(newUser);
		res.status(201).json(newUser);
	}
});

//get users by id - Returns the user object with the specified id. - done
server.get('/api/users/:id', (req, res) => {
	const reqId = req.params.id;
	const userReq = users.filter((user) => user.id === reqId); // filter to check for matching id
	//if the user does't have an id i.e === 0: Then send a 404 error
	if (userReq.length === 0) {
		res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} else {
		res.status(200).json(userReq[0]);
	}
});

// server.put('/api/user/:id', (req, res) => {
// 	//If the user with the specified id is not found:
// 	const id = req.params.id;
// 	const putUser = users.find((put) => put.id == id); //find the match between array id and url id
// 	//if the match is 200
// 	if (req.body.name && req.body.bio) {
// 		if (putUser) {
// 			try {
// 				putUser.name = req.body.name;
// 				putUser.bio = req.body.bio;
// 				res.status(200).json({ message: 'Success!' });
// 			} catch (error) {
// 				res.status(500).json({
// 					errorMessage: 'The user information could not be modified.',
// 				});
// 			}
// 		} else {
// 			res
// 				.status(404)
// 				.json({ message: 'The user with the specified ID does not exist.' });
// 		}
// 	} else {
// 		res
// 			.status(400)
// 			.json({ errorMessage: 'Please provide name and bio for the user.' });
// 	}
// });

server.patch('/api/user/:id', (req, res) => {
	const id = req.params.id;
	const user = users.find((user) => user.id === id);

	if (!user) {
		return res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	}
	if (req.body.name) user.name = req.body.name;

	if (req.body.bio) user.bio = req.body.bio;
	return res.status(200).json(user);
});
//DELETE
server.delete('/api/user/:id', function (req, res) {
	const id = req.params.id;
	deleteUsers = users.find((users) => users.id === id);
	if (deleteUsers) {
		users = users.filter((user) => user.id != id);
		res.status(200).json({ message: 'User deleted' });
	} else {
		res.status(500).json({ errorMessage: 'User cannot be deleted' });
	}
});

server.listen(8000, () => console.log('API Works'));
