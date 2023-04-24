import * as repo from "./repository.js";

export async function GET(request)
{
	try
	{
		const sessions = await repo.readSessions();

		return Response.json(
			sessions,
			{ status: 200 }
		);
	}
	catch (error)
	{
		console.log(error.message);
		
		return Response.json(
			{ message: "Internal Server Error." },
			{ status: 500 }
		);
	}
}

export async function POST(request)
{
	try
	{
		const body = await request.json();

		if (
			"session" in body &&
			"paper" in body &&
			"presenter" in body &&
			"location" in body &&
			"date" in body &&
			"time" in body
		)
		{
			const session = await repo.createSession(body);

			return Response.json(
				session,
				{ status: 200 }
			);
		}
		else
		{
			return Response.json(
				{ message: "Invalid parameters." },
				{ status: 400 }
			);
		}
	}
	catch (error)
	{
		console.log(error.message);
		
		return Response.json(
			{ message: "Internal Server Error." },
			{ status: 500 }
		);
	}
}