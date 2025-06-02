import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";


export async function POST(req) {
    const { courseId } = await req.json();
    const user = await currentUser();

    const enrollCourses = await db.select().from(enrollCourseTable)
        .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress),
            eq(enrollCourseTable.cid, courseId)));

    if (enrollCourses?.length == 0) {
        const result = await db.insert(enrollCourseTable).values({
            userEmail: user?.primaryEmailAddress?.emailAddress,
            cid: courseId,
        }).returning(enrollCourseTable);

        return NextResponse.json(result);
    }
    return NextResponse.json({ message: "Already enrolled in this course" });
    toast.error("Failed to enroll in course. Please try again later.");

}

export async function GET(req) {

    const user = await currentUser()

    const result = await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
    .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(enrollCourseTable.id))

    return NextResponse.json(result);
}