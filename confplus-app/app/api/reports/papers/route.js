import repo from "././repository.js";

export async function GET(request) {
    try {

        try {
            // const { searchParams } = new URL(request.url);
            // const region = searchParams.get("region");
            // let recipes = await repo.getRecipes(region);
            await repo.NoOfPapers();

            return Response.json( { status: 200 });
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }

    // return Response.json(await repo.getRecipes());
}