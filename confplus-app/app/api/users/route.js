import * as repo from './repository.js';

export async function GET(request){
	try {
		const { searchParams } = new URL(request.url);
		//console.log(searchParams);
		const role = searchParams.get("role")?.toLowerCase();

		const users = await (await repo.readUsers(role)).payload;

	return Response.json(users, { status: 200 });
	}
	catch (e)
	{
		console.error(e.message);

		return Response.json({ message: "Internal Server Error." }, { status: 500 });
	}
}