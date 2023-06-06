import { promises as fs } from 'fs';
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

let prisma = null 

if (!prisma)
	prisma = new PrismaClient();

export async function readUsers(role) {
	let list = null;

	switch (role) {
		case "author":
			list = "papers"
			break;
		case "organizer":
			list = "sessions"
			break;
		case "reviewer":
			list = "reviews"
			break;
		default:
			break;
	}

	const query = {
		id: true,
		email: true,
		first_name: true,
		last_name: true,
		role: true,
	};
	
	try {
		let users = null;
		
		if (role === "author" || role === "reviewer" || role === "organizer")
		{
			users = await prisma.user.findMany({
				where: {
					role: role
				},
				select: {
					...query,
					[role]: {
						select: {
							[list]: true
						}
					}
				}
			});
		}
		else
		{
			users = await prisma.user.findMany({
				select: {
					...query
				}
			});
		}

		return { error: 0, payload: users}
	}
	catch (e)
	{
		console.error(e.message);
	}
}

export async function readUser(id){
	const data = await fs.readFile("data/users.json");
	const users = JSON.parse(data);

	const user = users.find(user=>user.id==id);
	
	return {id:user.id,first_name:user.first_name,last_name:user.last_name,role:user.role};
}

export async function readUserWPswd(email)
{

}