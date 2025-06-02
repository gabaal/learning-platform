import { Button } from "@/components/ui/button"
import axios from "axios";
import { view } from "drizzle-orm/sqlite-core";
import { BookIcon, ClockIcon, Loader2Icon, PlayCircleIcon, PlayIcon, SettingsIcon, TrendingUpIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function CourseInfo({ course, viewCourse }) {
    console.log(viewCourse)
    const courseLayout = course?.courseJson?.course
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const GenerateCourseContent = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            })
            console.log(result.data)
            setLoading(false);
            router.replace('/workspace')
            toast.success('Course content generated successfully')
        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.error('Failed to generate course content.')
        }

    }

    return (
        <div className="md:flex gap-5 justify-between p-5 rounded-2xl shadow">
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
                <p className="line-clamp-2 text-gray-500">{courseLayout?.description}</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
                    <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                        <ClockIcon className="text-blue-500" />
                        <section>
                            <h2 className="font-bold">Duration</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>

                    <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                        <BookIcon className="text-green-500" />
                        <section>
                            <h2 className="font-bold">Chapters</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>

                    <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                        <TrendingUpIcon className="text-red-500" />
                        <section>
                            <h2 className="font-bold">Difficulty</h2>
                            <h2>{course?.level}</h2>
                        </section>
                    </div>

                </div>

                {!viewCourse ?
                    <Button disabled={loading} onClick={GenerateCourseContent}>
                        {loading ? <Loader2Icon className="animate-spin" /> : <SettingsIcon />}
                        Generate Content</Button> :<Link href={'/course/'+course?.cid}><Button><PlayCircleIcon />Continue Learning</Button></Link>}
            </div>

            <Image src={course?.bannerImageUrl} alt="Course Banner" width={400} height={400} className="aspect-auto object-cover rounded-2xl mt-5 md:mt-0 w-full h-[240px]" />

        </div>
    )
}
export default CourseInfo