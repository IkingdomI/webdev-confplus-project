"use server";

import { cookies } from "next/headers";

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
