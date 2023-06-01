import * as repo from "./repository.js";

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const username = searchParams.get("email");
    const password = searchParams.get("password");

    const user = await repo.readUser(username, password);

    if (user) {
      return Response.json(user, { status: 200 });
    } else {
      return Response.json(
        { message: "Incorrect Email or Password." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error.message);

    return Response.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
