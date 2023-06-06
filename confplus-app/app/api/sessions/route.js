import * as repo from "./repository.js";

export async function GET(request)
{
	const date = new URL(request.url).searchParams.get("date");
	//console.log(date);
	const res = await repo.readSessions(date);

	if (res.error === 0)
	{
		return Response.json(
			res.payload,
			{
				status: 200
			}
		);
	}
	else
	{
		return Response.json(
			{
				message: res.message
			},
			{
				status: 500
			}
		);
	}
}

export async function POST(request)
{
	const body = await request.json();

	if (
		"title" in body &&
		"organizerId" in body &&
		!isNaN(Number(body.organizerId)) &&
		"locID" in body &&
		!isNaN(Number(body.locID)) &&
		"timeID" in body &&
		!isNaN(Number(body.timeID)) &&
		"dateID" in body &&
		!isNaN(Number(body.dateID))
	)
	{
		const res = await repo.createSession({
			title: body.title,
			organizerId: Math.floor(Number(body.organizerId)),
			locID: Math.floor(Number(body.locID)),
			timeID: Math.floor(Number(body.timeID)),
			dateID: Math.floor(Number(body.dateID))
		});

		if (res.error === 0)
		{
			return Response.json(
				res.payload,
				{
					status: 200
				}
			);
		}
		else if (res.error === 1)
		{
			return Response.json(
				{
					message: "A session with the same title already exists, or the room is already booked."
				},
				{
					status: 400
				}
			);
		}
		else if (res.error === 2)
		{
			return Response.json(
				{
					message: "The submission contains an invalid foreign key"
				},
				{
					status: 404
				}
			);
		}
		else
		{
			return Response.json(
				{
					message: res.message
				},
				{
					status: 500
				}
			);
		}
	}
	else
	{
		return Response.json(
			{
				message: "Invalid Parameters"
			},
			{
				status: 400
			}
		);
	}

	/* try
	{
		const body = await request.json();

		if (
			"title" in body &&
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
					else if (session.message === "NO_PAPER")
					{
						return Response.json(
							{ message: "Paper not found." },
							{ status: 404 }
						);
					}
					else if (session.message === "NO_AUTHOR")
					{
						return Response.json(
							{ message: "Author not found." },
							{ status: 404 }
						);
					}
					else
					{
						return Response.json(
							{ message: "Two sessions may not take place in the same time and place." },
							{ status: 400 }
						);
					}
				}

				return Response.json(
					session,
					{ status: 201 }
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
	} */
}