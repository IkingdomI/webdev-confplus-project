import * as repo from "../repository.js";

export async function GET(request, {params})
{
	const { title } = params;

	const res = await repo.readSession(title);

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

export async function PATCH(request, {params})
{
	const { title } = params;

	const body = await request.json();

	//console.log(body);

	if (
		("dateID" in body && !isNaN(Number(body.dateID))) ||
		("timeID" in body && !isNaN(Number(body.timeID))) ||
		("locID" in body && !isNaN(Number(body.locID)))
	)
	{
		const obj = {};
		
		if ("dateID" in body)
			obj.dateID = Math.floor(Number(body.dateID))
		if ("timeID" in body)
			obj.timeID = Math.floor(Number(body.timeID))
		if ("locID" in body)
			obj.locID = Math.floor(Number(body.locID))

		const res = await repo.updateSession(title, obj);

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
					message: res.message
				},
				{
					status: 404
				}
			);
		}
		else if (res.error === 2)
		{
			return Response.json(
				{
					message: "A session is already booked for that location at that time and date"
				},
				{
					status: 400
				}
			);
		}
		else if (res.error === 3)
		{
			return Response.json(
				{
					message: res.message
				},
				{
					status: 400
				}
			);
		}
		else if (res.error === 5)
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
					message: res.message,
					e: res.e
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

export async function DELETE(request, {params})
{
	const { title } = params;
	const res = await repo.deleteSession(title);

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
				message: res.message
			},
			{
				status: 404
			}
		);
	}
	else if (res. error === 2)
	{
		return Response.json(
			{
				message: res.message
			},
			{
				status: 400
			}
		);
	}
	else if (res.error === 4)
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