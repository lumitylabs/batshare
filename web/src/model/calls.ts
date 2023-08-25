import fetch from 'isomorphic-fetch';
import { endpoint_create_user, endpoint_get_user, server } from './repository';

export async function endpointCall(data:any, endpoint:string) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
	return new Promise((resolve, reject) => {
		fetch(server + endpoint, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});
}

export async function getUser(data:any) {
	return endpointCall(data, endpoint_get_user)
}

export async function createUser(data:any) {
	return endpointCall(data, endpoint_create_user)
}
