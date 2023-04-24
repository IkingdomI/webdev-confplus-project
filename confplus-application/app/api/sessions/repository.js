import { promises as fs } from "fs";

const path = "data/schedule.json"

export async function readSessions()
{
	const res = await fs.readFile(path);
	const sessions = await JSON.parse(res);

	return sessions;
}

export async function readSession(id)
{
	const res = await fs.readFile(path);
	const session = await JSON.parse(res).find(s => s.session === id);

	return session;
}

export async function createSession(obj)
{
	const res = await fs.readFile(path);
	const sessions = await JSON.parse(res);

	if (sessions.find(s => s.session === obj.session))
	{	
		return null;
	}

	const session = {
		session: obj.session,
		paper: obj.paper,
		presenter: obj.presenter,
		location: obj.location,
		date: obj.date,
		time: obj.time
	};

	sessions.push(session);

	await fs.writeFile(path, JSON.stringify(sessions));

	return session
}