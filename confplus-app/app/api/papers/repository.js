import {promises as fs} from 'fs';

export async function readPapers(){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);
    // if (author){
    //     papers = papers.filter((paper) => paper.author === author);
    // }
    console.log(papers);
    if(papers.length>0)
        return papers;
    return null;
}

export async function createPaper(obj){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);
    
    
    
    papers.push(obj);

    await fs.writeFile("data/papers.json", JSON.stringify(papers));
    return obj;


}

export async function readPaperByTitle(title){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);

    let paper = papers.filter((p) => p.title.toLowerCase()===title.toLowerCase());
    if(paper){
        return paper;
    }
    return null;
    
}

export async function updatePaper(title, modPaper){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);

    let index = papers.findIndex((p) => p.title.toLowerCase()===title.toLowerCase());

    if(index !== -1){
        papers[index] = {...papers[index], ...modPaper};
        console.log(papers[index]);


        await fs.writeFile("data/papers.json", JSON.stringify(papers));
        return papers[index];
    }
    
    return null;
    
}
