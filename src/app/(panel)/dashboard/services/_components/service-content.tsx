import { getAllServices } from "../_data-access/get-all-service";
import { ServiceList } from "./service-list";

interface ServiceContentProps {
    userId: string;
}
export async function ServiceContent( { userId }: ServiceContentProps) {
    const services= await getAllServices({userId: userId});
   
    return (
       <ServiceList services={services.data || []}/>
    );
}