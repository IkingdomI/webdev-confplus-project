import { promises as fs } from "fs";

const path = "data/schedule.json"

export async function readSessions(date)
{
	const res = await fs.readFile(path);
	let sessions = await JSON.parse(res);

	if (date)
	{
		sessions = sessions.filter(s => s.date === date);
	}

	return sessions;
}

export async function readSession(id)
{
	const res = await fs.readFile(path);
	const session = await JSON.parse(res).find(s => s.session === id);

	return session;
}

export async function updateSession(id, obj)
{
	const res = await fs.readFile(path);
	const sessions = await JSON.parse(res);
	const session = sessions.find(s => s.session === id);

	if (!session)
	{
		return null
	}

	session.date = obj.date;
	session.location = obj.location;
	session.time = obj.time;

	await fs.writeFile(path, JSON.stringify(sessions));

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

export async function deleteSession(id)
{
	const sessions = await JSON.parse(await fs.readFile(path));
	const index = sessions.findIndex(s => s.session === id);

	if (index > -1)
	{
		const session = sessions.splice(index, 1);
		await fs.writeFile(path, JSON.stringify(sessions));
		return session;
	}

	return null;
}