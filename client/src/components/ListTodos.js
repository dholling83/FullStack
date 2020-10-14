import React, { useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const response = await fetch('/todos');
			const jsonData = await response.json();

			setTodos(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const deleteTodo = await fetch(`/todos/${id}`, {
				method: 'DELETE'
			});

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
									onClick={() => deleteTodo(todo.todo_id)}
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
