import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { email, name } = await req.json();
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users?.length == 0) {
    const result = await db
      .insert(usersTable)
      .values({
        email: email,
        name: name,
      })
      .returning(usersTable);
    console.log(result);
    return NextRequest.json(result);
  }
  return NextResponse.json(users[0]);
}
