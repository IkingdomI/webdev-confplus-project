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

	if (obj.present_fname)
	{
		const paper = (await JSON.parse(await fs.readFile("data/papers.json"))).find(p => p.title === title);

		//console.log(paper);

		if (paper.authors.find(a => a.fname === obj.present_fname && a.lname === obj.present_lname))
		{
			session.presenter = `${obj.present_fname} ${obj.present_lname}`;
		}
		else
		{
			return { message: "NO_AUTHOR" };
		}
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

export async function createSession(obj)
{
	const res = await fs.readFile(path);
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

	const author = paper.authors.find(a => a.fname === obj.present_fname && a.lname === obj.present_lname);

	if (!author)
	{
		return { message: "NO_AUTHOR" };
	}

	const session = {
		title: obj.title,
		presenter: `${obj.present_fname} ${obj.present_lname}`,
		location: obj.location,
		date: obj.date,
		time: obj.time
	};

	sessions.push(session);

	await fs.writeFile(path, JSON.stringify(sessions));

	return session
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