import * as repo from "./repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const file = await repo.readPdf(17);

    if (!file) {
      return Response.json({ message: "File not found." }, { status: 404 });
    }

    const blob = new Blob([file.content], {
      type: "application/pdf",
    });
    return new Response(blob);
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
