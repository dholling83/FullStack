import React, { useState } from 'react';

const InputTodo = () => {
	const [description, setDescription] = useState('');
	const [item1, setItem1] = useState('');
	const [item2, setItem2] = useState('');
	const [item3, setItem3] = useState('');
	const [item4, setItem4] = useState(0);
	const [item5, setItem5] = useState('');
	const [item6, setItem6] = useState('');

	const creds = {
		item1: 'postgres',
		item2: 'cheese',
		item3: 'localhost',
		item4: 5432,
		item5: 'perntodo'
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				description,
				item1,
				item2,
				item3,
				item4,
				item5,
				item6
			};
			await fetch('/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			window.location = '/';
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<h1 className='text-center mt-5'>PERN Todo List</h1>
			<form className='d-flex mt-5' onSubmit={onSubmitForm}>
				<input
					type='text'
					className='form-control'
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
						setItem1(creds.item1);
						setItem2(creds.item2);
						setItem3(creds.item3);
						setItem4(creds.item4);
						setItem5(creds.item5);
						setItem6('INSERT INTO todo (description) VALUES($1) RETURNING *');
					}}
				/>
				<input type='hidden' value={creds.item1} />
				<input type='hidden' value={creds.item2} />
				<input type='hidden' value={creds.item3} />
				<input type='hidden' value={creds.item4} />
				<input type='hidden' value={creds.item5} />
				<button className='btn btn-success'>Add</button>
			</form>
		</>
	);
};
export default InputTodo;
