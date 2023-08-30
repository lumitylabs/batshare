import fetch from 'isomorphic-fetch';
import { endpoint_create_project, endpoint_create_user, endpoint_donate, endpoint_get_inventory, endpoint_get_project, endpoint_get_project_raised, endpoint_get_projects, endpoint_get_user, endpoint_get_user_projects, endpoint_upload, server } from './repository';

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

export async function createUserProject(data:any) {
	return endpointCall(data, endpoint_create_project)
}

export async function getProjects(data:any) {
	return endpointCall(data, endpoint_get_projects)
}

export async function getProject(data:any) {
	return endpointCall(data, endpoint_get_project)
}

export async function getProjectRaised(data:any) {
	return endpointCall(data, endpoint_get_project_raised)
}

export async function donate(data:any) {
	return endpointCall(data, endpoint_donate)
}

export async function upload(data:any) {
	return endpointCall(data, endpoint_upload)
}

export async function getUserProjects(data:any) {
	return endpointCall(data, endpoint_get_user_projects)
}

export async function getInventory(data:any) {
	return endpointCall(data, endpoint_get_inventory)
}


export const uploadFile = (file: File, sessionUri: string): Promise<Response> => {
	const objectSize = file.size;
  	const formData = new FormData();
	formData.append('file', file);
	const requestOptions: RequestInit = {
	  method: 'PUT',
	  headers: {
		'Content-Length': objectSize.toString(),
	  },
	  body: file,
	};
  	return fetch(sessionUri, requestOptions);
  };