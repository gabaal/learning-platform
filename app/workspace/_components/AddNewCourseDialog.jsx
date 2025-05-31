import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function AddNewCourseDialog({children}) {
  return (
    <div><Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course Using AI</DialogTitle>
      <DialogDescription asChild>
        <div>

        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog></div>
  )
}
export default AddNewCourseDialog