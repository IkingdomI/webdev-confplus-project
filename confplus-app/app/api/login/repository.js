// import {promises as fs} from 'fs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readUser(email, password) {
  // const data = await fs.readFile("data/users.json");
  // const users = JSON.parse(data);
  // const user = users.find(user=>user.email===email&&user.password===password);

  const user = await prisma.user.findMany({
    select:{
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,

    },
    where: {
      email: email,
      password: password,
    },
  });

  return user;
}
