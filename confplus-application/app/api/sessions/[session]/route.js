import * as repo from "../repository.js";

export async function GET(request, {params})
{
	try 
	{
		const {session: id} = params;

		const session = await repo.readSession(id);

		if (session)
		{
			return Response.json(
				session,
				{ status: 200 }
			);
		}
		else
		{
			return Response.json(
				{ message: "Session not found." },
				{ status: 404 }
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

export async function PATCH(request, {params})
{
	try 
	{
		const {session: id} = params;
		const body = await request.json();

		//We validate the values of these fields in client side.
		if (
			"date" in body &&
			"time" in body &&
			"location" in body
		)
		{
			const session = await repo.updateSession(id, {
				date: body.date,
				time: body.time,
				location: body.location
			});

			if (session)
			{
				return Response.json(
					session,
					{ status: 200 }
				);
			}
			else
			{
				return Response.json(
					{ message: "Session not found." },
					{ status: 404 }
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

export async function DELETE(request, {params})
{
	try
	{
		const {session: id} = params;

		const session = await repo.deleteSession(id);

		if (session)
		{
			return Response.json(
				session,
				{ status: 200 }
			);
		}
		else
		{
			return Response.json(
				{ message: "Session not found." },
				{ status: 404 }
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