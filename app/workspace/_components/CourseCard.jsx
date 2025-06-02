import { Button } from "@/components/ui/button"
import axios from "axios"
import { BookIcon, LoaderCircleIcon, PlayCircleIcon, SettingsIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

function CourseCard({ course }) {
    const courseJson = course?.courseJson?.course
    const [loading, setLoading] = useState(false)
    const onEnrollCourse = async () => {
        try {
            setLoading(true)
            const result = await axios.post('/api/enroll-course', {
                courseId: course?.cid
            })
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error enrolling in course:", error)
            toast.error("Failed to enroll in course. Please try again later.")
        }
        setLoading(false)
    }
    return (
        <div className="shadow rounded-xl">
            <Image src={course?.bannerImageUrl} alt={course?.name} width={400} height={300} className="w-full aspect-video rounded-t-xl object-cover" />
            <div className="p-3 flex flex-col gap-3">
                <h2 className="font-bold text-lg">{courseJson?.name}</h2>
                <p className="line-clamp-3 text-gray-500 text-sm">{courseJson?.description}</p>
                <div className="flex justify-between items-center">
                    <h2 className="flex items-center text-sm gap-2"><BookIcon className="text-primary h-5 w-5" /> {courseJson?.noOfChapters} Chapters</h2>
                    {course?.courseContent?.length ? <Button disabled={loading} onClick={onEnrollCourse} size='sm'>{loading ? <LoaderCircleIcon className="animate-spin" /> : <PlayCircleIcon />}Start Learning</Button> :
                        <Link href={'/workspace/edit-course/' + course?.cid}>  <Button size='sm' variant='outline'><SettingsIcon /> Generate Course</Button></Link>}
                </div>
            </div>
        </div>
    )
}
export default CourseCard