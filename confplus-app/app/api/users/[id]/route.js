import * as repo from '../repository.js';

export async function GET(request, { params }) 
{
	const { id } = params;

	//console.log(typeof(id));

	if (isNaN(Number(id)))
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

	const response = await repo.readUser(Math.floor(Number(id)));

	if (response.error === 0)
	{
		return Response.json(response.payload, { status: 200 });
	}
	else if (response.error === 1)
	{
		return Response.json(
			{
				message: response.message
			},
			{
				status: 404
			}
		);
	}
	else
	{
		console.log(response.message);

		return Response.json(
			{
				message: response.message
			},
			{
				status: 500
			}
		);
	}
}