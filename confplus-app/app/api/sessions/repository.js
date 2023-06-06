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

	/* const res = await fs.readFile(path);
	const sessions = await JSON.parse(res);
	const papers = await JSON.parse(await fs.readFile("data/papers.json"));

	//console.log(obj);

	if (sessions.find(s => s.title === obj.title))
	{	
		return { message: "DUPLICATE" };
	}

	const paper = papers.find(p => p.title === obj.title);

	//console.log(paper);

	if (!paper)
	{
		return { message: "NO_PAPER" };
	}

	if (sessions.find(s => s.time === obj.time && s.date === obj.date && s.location === obj.location))
	{
		return { message: "CONFLICT" };
	}

	const session = {
		title: obj.title,
		presenter: `${paper.authors[paper.presenter].fname} ${paper.authors[paper.presenter].lname}`,
		location: obj.location,
		date: obj.date,
		time: obj.time
	};

	sessions.push(session);

	await fs.writeFile(path, JSON.stringify(sessions));

	return session */
}

export async function readSessions(date)
{
	const query = {
		select: {
			id: true,
			title: true,
			status: true,
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

	/* const res = await fs.readFile(path);
	let sessions = await JSON.parse(res);

	if (date)
	{
		sessions = sessions.filter(s => s.date === date);
	}

	return sessions; */
}

export async function readSession(title)
{
	const res = await fs.readFile(path);
	const session = await JSON.parse(res).find(s => s.title === title);

	return session;
}

export async function updateSession(title, obj)
{
	const res = await fs.readFile(path);
	const sessions = await JSON.parse(res);
	const session = sessions.find(s => s.title === title);

	//console.log(title, obj, session);

	if (!session)
	{
		return { message: "NO_SESSION" };
	}

	if (obj.date)
		session.date = obj.date;
	if (obj.location)
		session.location = obj.location;
	if (obj.time)
		session.time = obj.time;

	await fs.writeFile(path, JSON.stringify(sessions));

	return session;
}

export async function deleteSession(title)
{
	const sessions = await JSON.parse(await fs.readFile(path));
	const index = sessions.findIndex(s => s.title === title);

	if (index > -1)
	{
		const session = sessions.splice(index, 1);
		await fs.writeFile(path, JSON.stringify(sessions));
		return session;
	}

	return null;
}