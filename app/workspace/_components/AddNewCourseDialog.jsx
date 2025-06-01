
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, SparkleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"


function AddNewCourseDialog({ children }) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        noOfChapters: 1,
        includeVideo: false,
        level: '',
        category: ''
    })

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        // console.log(formData)
    }

    const onGenerate = async () => {
        const courseId = uuidv4()
        try {
            setLoading(true)
            const result = await axios.post('/api/generate-course-layout', { ...formData, courseId: courseId })
            console.log(result.data)
            setLoading(false)
            router.push('/workspace/edit-course/'+result.data?.courseId)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div><Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-col gap-3 mt-3">
                            <div>
                                <label htmlFor="">Course Name</label>
                                <Input placeholder="Enter course name" onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">Course Description (optional)</label>
                                <Textarea placeholder="Enter course description" onChange={(event) => onHandleInputChange('description', event?.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">No. of Chapters</label>
                                <Input type='number' placeholder="Enter number of chapters" onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
                            </div>
                            <div className="flex items-center gap-3">
                                <label htmlFor="">Include Video</label>
                                <Switch
                                    onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)}
                                />
                            </div>
                            <div>
                                <label className="mb-1">Difficulty Level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)} className='mt-2'>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="">Category</label>
                                <Input placeholder="Enter course categories, seperated by commas" onChange={(event) => onHandleInputChange('category', event?.target.value)} />
                            </div>
                            <div className="mt-5">
                                <Button disabled={loading} onClick={onGenerate} className='w-full'>
                                    {loading ? <><Loader2Icon className="animate-spin" /> Generating...</> : <><SparkleIcon /> Generate Course</>}
                                </Button>
                            </div>

                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog></div>
    )
}
export default AddNewCourseDialog