"use server";

import { cookies } from "next/headers";
import * as repo from '../api/papers/repository.js'
import { PrismaClient } from "@prisma/client";
import { updateReview } from "../api/papers/[id]/reviews/repository.js";

const prisma = new PrismaClient();

export async function isUserExist() {
  return cookies().get("user") !== undefined;
}

export async function getUser() {
  const cookie = cookies().get("user");
  if (!cookie) return null;
  const user = JSON.parse(cookie.value);
  return user;
}

export async function setUser(user) {
    if(user){
        cookies().set("user", JSON.stringify(user),{ sameSite: 'strict'});
    }else{
        cookies().set("user", "", { expires: new Date('2016-10-05') });
    }
}

export async function logout() {
  // cookies().set("user", "", { expires: new Date('2016-10-05') });
  setUser(null);
  
  return true;
}

export async function login(formData) {
  const res = await fetch(
    `http://localhost:3000/api/login?email=${formData.get(
      "email"
    )}&password=${formData.get("password")}`, {cache: "no-store"}
  );
  if (res.ok) {
    const user = await res.json();
    console.log(user);
    setUser(user);
    return user.role;
    // switch (user.role) {
    //   case "author":
    //     redirect("staff/author");
    //     break;
    //   case "reviewer":
    //     redirect("staff/reviewer");
    //     break;
    //   case "organizer":
    //     redirect("staff/organizer");
    //     break;
    // }
  } else {
    return null;
  }
}

export async function submitPaper(formData){
  const author = await getUser();
  const authorId = author.id;

  // console.log(formData);
  const paper = {
    title: formData.get('title'),
    abstract: formData.get('abstract'),
    authorId: authorId,
    presenter: formData.get('presenter')

  }


  const authors = [];
  let i = 1;
  while(formData.get(`author-fname-${i}`)){
    const authorObj = {
      fname: formData.get(`author-fname-${i}`),
      lname: formData.get(`author-lname-${i}`),
      email: formData.get(`author-email-${i}`),
      affilId: formData.get(`author-aff-${i}`),
    }
    authors.push(authorObj);
    i++;
  }

  paper.PaperAuthors = authors;

  const file = formData.get("file");
  const content = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;

  await repo.createPaper(paper, fileName, content);
  // console.log("paper should be submitted");
  
  return (true);
}

export async function downloadPaper(paperId){
  const pdf = await prisma.pDF.findUnique({
    where: {
      paperId: Number(paperId)
    }
  });

  const blob = new Blob([pdf.content], {type: 'application/pdf'});

  return blob;
}

export async function submitReview(formData){
  const reviewer = await getUser();
  const reviewerID = reviewer.id;
  const paperId = formData.get('paperId');
  const reviewId = Number(formData.get('reviewId'));
  const obj = {
    
    contribution: Number(formData.get('contribution')),
    evaluation: Number(formData.get('evaluation')),
    strength: formData.get('strengths'),
    weakness: formData.get('weaknesses'),
    
  }
  
  
  // console.log(formData);

  const result = await updateReview(Number(paperId), Number(reviewerID), obj, reviewId);

  if(result.error){
    return false;
  }

  return true;
}