import * as repo from "../repository.js";

export async function GET(request, {params})
{
    const {session} = params;

    return Response.json(
        { message: `Lol, ${session}` },
        { status: 200 }
    );
}