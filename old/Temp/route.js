import * as repo from './repository.js'
import Cors from 'cors';

const cors = Cors({
    
});
export async function GET(request) {
  try {
    await cors();

    const searchParams = new URL(request.url).searchParams;

    const username = searchParams.get('username');
    const password = searchParams.get('password');

    const user = repo.getUser(username,password);

    if(user){
        return Response.json(user,{status:200});
    }else{
        return Response.json({message:"Incorrect Username or Password"},{status:404});
    }

  } catch (error) {
    console.log(error.message);
    
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
