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

export async function createSession(body)
{
	const res = await fs.readFile(path);
	const session = await JSON.parse(res);
}