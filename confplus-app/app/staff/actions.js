"use server";

import { cookies } from "next/headers";

export async function isUserExist() {
  return cookies().get("user") !== undefined;
}

export async function getUser() {
  return cookies().get("user");
}

export async function setUser(user) {
  cookies().set("user", user);
}

export async function removeUser() {
  cookies().set("user", undefined, { expires: new Date(0) });
}
