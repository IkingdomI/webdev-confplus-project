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
					message: res.message
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
}