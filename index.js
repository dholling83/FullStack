const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const creds = {
	item1: 'postgres',
	item2: 'cheese',
	item3: 'localhost',
	item4: 5432,
	item5: 'perntodo'
};

//middleware
app.use(cors());
app.use(express.json());

//ROUTES ARE BELOW

//create a todo
app.post('/todos', async (req, res) => {
	try {
		console.log('req.body: ', req.body);
		const newTodo = await pool(
			req.body.item1,
			req.body.item2,
			req.body.item3,
			req.body.item4,
			req.body.item5
		).query(req.body.item6, [req.body.description]);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});
//get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool(
			creds.item1,
			creds.item2,
			creds.item3,
			creds.item4,
			creds.item5
		).query('SELECT * FROM todo');
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});

//get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool(
			req.body.item1,
			req.body.item2,
			req.body.item3,
			req.body.item4,
			req.body.item5
		).query('SELECT * FROM todo WHERE todo_id = $1', [id]);
		res.json(todo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

//update a todo
app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool(
			req.body.item1,
			req.body.item2,
			req.body.item3,
			req.body.item4,
			req.body.item5
		).query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
			description,
			id
		]);
		res.json('todo was updated');
	} catch (error) {
		console.error(error.message);
	}
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool(
			creds.item1,
			creds.item2,
			creds.item3,
			creds.item4,
			creds.item5
		).query('DELETE FROM todo WHERE todo_id = $1', [id]);
		res.json('todo was deleted');
	} catch (error) {
		console.error(error.message);
	}
});

if (process.env.NODE_ENV === 'production') {
	//Make sure Express serves up prod assets (i.e main.js and main.css files)
	app.use(express.static('client/build'));

	//Express serves up index.html file if route is unrecognized
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server has started on port: ', PORT);
});
