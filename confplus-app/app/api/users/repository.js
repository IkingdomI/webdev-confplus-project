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
	const query = {
		id: true,
		email: true,
		first_name: true,
		last_name: true,
		role: true,
	};

	try
	{
		const temp = await prisma.user.findUnique({
			select:
			{
				...query
			},
			where: {
				id: Number(id)
			}
		});

		let list = null;

		if (temp.role === "organizer")
			return { error: 0, payload: temp };
		else if (temp.role === "reviewer")
			list = "reviews"
		else if (temp.role === "author")
			list = "papers"

		const user = await prisma.user.findUnique({
			include: {
				[temp.role]: {
					select:{
						[list]: true
					}
				}
			},
			where: {
				id: Number(id)
			}
		});

		if (user)
			return { error: 0, payload: user };
		else
			return { error: 1, message: "The user you are looking for does not exist" };
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 2, message: "Internal Server Error" }
	}
}

export async function readUserWPswd(email)
{
	try {
		const user = await prisma.user.findUnique({
			select:
			{
				id: true,
				email: true,
				first_name: true,
				last_name: true,
				role: true,
				password: true
			},
			where: {
				email
			}
		});

		if (user)
			return { error: 0, payload: user };
		else
			return { error: 1, message: "The user you are looking for does not exist" };
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 2, message: "Something wrong happened with Prisma" }
	}
}