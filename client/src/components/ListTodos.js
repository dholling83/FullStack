import React, { useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {
	const [todos, setTodos] = useState([]);
	// const [item1, setItem1] = useState('');
	// const [item2, setItem2] = useState('');
	// const [item3, setItem3] = useState('');
	// const [item4, setItem4] = useState(0);
	// const [item5, setItem5] = useState('');
	// const [item6, setItem6] = useState('');

	const creds = {
		item1: 'postgres',
		item2: 'cheese',
		item3: 'localhost',
		item4: 5432,
		item5: 'perntodo'
	};

	const getTodos = async () => {
		try {
			const response = await fetch('/todos', {
				method: 'GET'
				// headers: { 'Content-Type': 'application/json' },
				// body: JSON.stringify(body)
			}); //.then(res => res.text()).then(text => console.log(text));
			const jsonData = await response.json();

			setTodos(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await fetch(`/todos/${id}`, {method: 'DELETE'});

			setTodos(todos.filter((e) => e.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);
	console.log(todos);

	return (
		<>
			<h1>List Todos</h1>
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{/*<tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr> */}
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td>{todo.description}</td>
							<td>
								<EditTodo todo={todo} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => {
										deleteTodo(todo.todo_id);
										// setItem1(creds.item1);
										// setItem2(creds.item2);
										// setItem3(creds.item3);
										// setItem4(creds.item4);
										// setItem5(creds.item5);
										// setItem6('SELECT * FROM todo');
									}}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ListTodos;
