import {promises as fs} from 'fs';


export async function readUser(id){
    const data = await fs.readFile("data/users.json");
    const users = JSON.parse(data);

    const user = users.find(user=>user.id==id);
    
    return {id:user.id,first_name:user.first_name,last_name:user.last_name,role:user.role};
}