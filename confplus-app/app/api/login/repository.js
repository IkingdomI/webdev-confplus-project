import {promises as fs} from 'fs';


export async function readUser(email,password){
    const data = await fs.readFile("data/users.json");
    const users = JSON.parse(data);

    const user = users.find(user=>user.email===email&&user.password===password);
    
    return user;
}