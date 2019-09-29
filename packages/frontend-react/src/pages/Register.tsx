import React, { useState } from 'react';
import { usePersonNewMutation, NewPersonInput } from '../generated/graphql';

interface Props { }

export const Register: React.FC<Props> = () => {
	const defaults = {
		id: '1-100-200',
		firstname: 'Mário',
		lastname: 'Monteiro',
		email: 'mario@koakh.com',
		username: 'mario',
		password: '12345678',
	}
	// hooks: state
	const [id, setId] = useState(defaults.id)
	const [firstname, setFirstname] = useState(defaults.firstname)
	const [lastname, setLastname] = useState(defaults.lastname)
	const [email, setEmail] = useState(defaults.email);
	const [username, setUsername] = useState(defaults.username)
	const [password, setPassword] = useState(defaults.password);

	// hooks: apollo
	const [personNewMutation] = usePersonNewMutation();
	// handlers
	const onChangeIdHandler = (e: React.SyntheticEvent) => {
		setId((e.target as HTMLSelectElement).value)
	};
	const onChangeFirstnameHandler = (e: React.SyntheticEvent) => {
		setFirstname((e.target as HTMLSelectElement).value)
	};
	const onChangeLastnameHandler = (e: React.SyntheticEvent) => {
		setLastname((e.target as HTMLSelectElement).value)
	};
	const onChangeEmailHandler = (e: React.SyntheticEvent) => {
		setEmail((e.target as HTMLSelectElement).value)
	};
	const onChangeUsernameHandler = (e: React.SyntheticEvent) => {
		setUsername((e.target as HTMLSelectElement).value)
	};
	const onChangePasswordHandler = (e: React.SyntheticEvent) => {
		setPassword((e.target as HTMLSelectElement).value)
	};

	const onSubmitFormHandler = async (e: any) => {
		e.preventDefault();
		console.log('for submitted')
		console.log(id, firstname, lastname, email, username, password);
		const newPersonData: NewPersonInput = {
			id, firstname, lastname, username, email, password
		};
		const data = await personNewMutation({ variables: { newPersonData } }).catch(error => {
			console.error(error.message);
		})
		// const { person }: Person = data;
		console.log(data);
	}

	return (
		<form onSubmit={(e) => onSubmitFormHandler(e)}>
			<input
				value={id}
				placeholder='id'
				onChange={(e) => onChangeIdHandler(e)} />
			<input
				value={firstname}
				placeholder='firstname'
				onChange={(e) => onChangeFirstnameHandler(e)} />
			<input
				value={lastname}
				placeholder='lastname'
				onChange={(e) => onChangeLastnameHandler(e)} />
			<input
				value={email}
				placeholder='email'
				onChange={(e) => onChangeEmailHandler(e)} />
			<input
				value={username}
				placeholder='username'
				onChange={(e) => onChangeUsernameHandler(e)} />
			<input
				value={password}
				placeholder='password'
				type='password'
				onChange={(e) => onChangePasswordHandler(e)} />
			<button type='submit'>register</button>
		</form>
	);
}
