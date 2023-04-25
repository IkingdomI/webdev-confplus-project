import * as repo from "./repository.js";

export async function GET(request)
{
	try
	{
		const date = new URL(request.url).searchParams.get("date");
		const sessions = await repo.readSessions(date);

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
			"title" in body &&
			"presenter" in body &&
			"location" in body &&
			"date" in body &&
			"time" in body
		)
		{
			const session = await repo.createSession(body);

			if (session)
			{
				if (session.message)
				{
					if (session.message === "DUPLICATE")
					{
						return Response.json(
							{ message: "Paper already has a session." },
							{ status: 400 }
						);
					}
					else
					{
						return Response.json(
							{ message: "Paper not found." },
							{ status: 404 }
						);
					}
				}

				return Response.json(
					session,
					{ status: 200 }
				);
			}
			else
			{
				return Response.json(
					{ message: "A session with the same name already exists" },
					{ status: 400 }
				);
			}
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