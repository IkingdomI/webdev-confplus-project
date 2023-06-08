import * as repo from "../repository.js";

export async function GET(request) {
    try {

        try {
            let avgAuth = await repo.AverageAuthorsPerPaper();

            return Response.json(avgAuth,  { status: 200 });
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }

    // return Response.json(await repo.getRecipes());
}