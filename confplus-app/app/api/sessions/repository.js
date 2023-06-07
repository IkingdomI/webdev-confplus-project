import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { promises as fs } from "fs";

const path = "data/schedule.json"

let prisma = null;

if (!prisma)
	prisma = new PrismaClient();

export async function createSession(obj)
{
	const data = {
		title: obj.title,
		organizerId: obj.organizerId,
		locID: obj.locID,
		timeID: obj.timeID,
		dateID: obj.dateID
	}

	//console.log(data);

	try {
		const session = await prisma.session.create({
			data
		});

		return { error: 0, payload: session };
	}
	catch (e)
	{
		console.log(e.message);

		if (e instanceof PrismaClientKnownRequestError)
		{
			if (e.code === "P2002")
			{
				return { error: 1, message: "Unique constraint violated" };
			}
			else if (e.code === "P2003")
			{
				//console.log(e.meta);

				return { error: 2, message: "Foreign key constraint violated" };
			}
		}

		return { error: 10, message: "Internal Server Error" };
	}
}

export async function readSessions(date)
{
	const query = {
		select: {
			id: true,
			title: true,
			organizerId: true,
			locID: true,
			timeID: true,
			dateID: true,
			papers: true
		}
	};

	try {
		let sessions = null;

		if (date)
		{
			sessions = await prisma.session.findMany({
				...query,
				where: {
					date: {
						date
					}
				}
			});
		}
		else
		{
			sessions = await prisma.session.findMany({
				...query
			});
		}

		return { error: 0, payload: sessions };
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 1, message: "Internal Server Error" }
	}
}

export async function readSession(title)
{
	try
	{
		const session = await prisma.session.findUnique({
			select: {
				id: true,
				title: true,
				organizerId: true,
				timeID: true,
				locID: true,
				dateID: true,
				papers: true
			},
			where:
			{
				title
			}
		});

		if (session)
		{
			return { error: 0, payload: session };
		}
		else
		{
			return { error: 1, message: "Session not found" };
		}
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 2, message: "Internal Server Error" };
	}
}

export async function updateSession(title, obj)
{
	try
	{
		const session = await prisma.session.update({
			data: obj,
			where: {
				title
			}
		});

		if (session)
		{
			return { error: 0, payload: session };
		}
		else
		{
			return { error: 1, message: "Session not found" }
		}
	}
	catch (e)
	{
		console.error(e.message);

		if (e instanceof PrismaClientKnownRequestError)
		{
			if (e.code === "P2002")
			{
				return { error: 2, message: "Unique Constraint Violation" };
			}
			else if (e.code === "P2003")
			{
				return { error: 3, message: "Foreign Key Violation" }
			}
		}

		return { error: 4, message: "Internal Server Error" };
	}
}

export async function deleteSession(title)
{
	try
	{
		const session = await prisma.session.delete({
			where: {
				title
			}
		});

		if (session)
		{
			return { error: 0, payload: session };
		}
		else
		{
			return { error: 1, message: "Session not found" };
		}
	}
	catch (e)
	{
		console.error(e.message);

		if (e instanceof PrismaClientKnownRequestError)
		{
			if (e.code === "P2003")
			{
				return { error: 2, message: "Foreign Key Violation" }
			}
		}

		return { error: 3, message: "Internal Server Error" };
	}
}