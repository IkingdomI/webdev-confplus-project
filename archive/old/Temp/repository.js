import { promises as fs } from "fs";

export async function getUser(username,password){
    const data = await fs.readFile("data/users.json");
    const users = JSON.parse(data);

    const user = users.find(
      (user) => user.password === password && user.username === username
    );

    return user;
}