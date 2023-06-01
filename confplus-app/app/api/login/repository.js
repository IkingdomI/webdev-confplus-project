import {promises as fs} from 'fs';


export async function readUser(email,password){
    // console.log(email,password);
    const data = await fs.readFile("data/users.json");
    const users = JSON.parse(data);
    // console.log(users);

    const user = users.find(user=>user.email===email&&user.password===password);
    
    return user;
}