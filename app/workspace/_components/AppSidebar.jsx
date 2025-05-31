'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookIcon, CompassIcon, LayoutDashboardIcon, PencilRulerIcon, UserCircle2Icon, WalletCardsIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AddNewCourseDialog from "./AddNewCourseDialog"

const SidebarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        path: '/workspace'
    },
    {
        title: 'My Learning',
        icon: BookIcon,
        path: '/workspace/my-courses'
    },
    {
        title: 'Explore Courses',
        icon: CompassIcon,
        path: '/workspace/explore'
    },
    {
        title: 'AI Tools',
        icon: PencilRulerIcon,
        path: '/workspace/ai-tools'
    },
    {
        title: 'Billing',
        icon: WalletCardsIcon,
        path: '/workspace/billing'
    },
    {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile'
    },
]

function AppSidebar() {

const path = usePathname()

    return (
        <div><Sidebar>
            <SidebarHeader className='p-4'>
                <Image src={'/logo.png'} alt="Logo" width={130} height={120} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <AddNewCourseDialog>
                    <Button>Create New Course</Button></AddNewCourseDialog>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarOptions.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className='p-5'>
                                        <Link className={`text-[17px] ${path.includes(item.path)&&'text-primary'}`} href={item.path}><item.icon className="h-7 w-7" /><span>{item.title}</span></Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar></div>
    )
}
export default AppSidebar