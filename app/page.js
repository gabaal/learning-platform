import {Button} from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
export default function Home() {
  return (
    <div><Button>Button</Button>
    <UserButton/></div>
  );
}
