import * as repo from '../repository.js'

export async function GET(request, {params}){
    try{
        const {title} = params;

        const paper = await repo.readPaperByTitle(title);
        console.log(paper);
        if(paper.length!=0){
            return Response.json(paper, {status: 200});
        }else{
            return Response.json("paper not found", {status: 404});
        }
    }catch(error){
        onsole.log(error.message);
        return Response.json({message: "Internal Server Error"}, {status: 500});
    }
}