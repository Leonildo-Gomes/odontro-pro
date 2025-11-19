import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
export default  async function Dashboard() {
    const session= await getSession();

    console.log( "session",session);
    if(!session){
        return redirect("/");
    }
    console.log(session?.user?.status);
    return (
        <div>
            <h1>Dashboard</h1>
              <div className="w-full h-[600px] bg-amber-200 mb-10"></div>
              <div className="w-full h-[600px] bg-amber-600 mb-10"></div>
              <div className="w-full h-[600px] bg-amber-900 mb-10"></div>
              <div className="w-full h-[600px] bg-amber-400 mb-10"></div>
              


        </div>
    );
}