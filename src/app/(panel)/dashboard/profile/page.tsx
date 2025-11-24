import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { ProfileContent } from './_components/profile';
import { getInfoUser } from './get-info-user';

export default async function Profile() {
    const session = await getSession();

    if(!session){
        return redirect("/");
    }
    const user= await getInfoUser({userId: session.user?.id}); 

    if(!user){
        return redirect("/");
    }
    return (
       <ProfileContent />
    );
}