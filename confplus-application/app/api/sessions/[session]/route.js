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

export async function PATCH(id, obj)
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