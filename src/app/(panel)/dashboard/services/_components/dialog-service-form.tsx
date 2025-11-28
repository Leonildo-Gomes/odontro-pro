import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
    name: z.string().min(2, {message: "name must be at least 2 characters"}),
    price: z.string().min(1, {message: "price must be at least 1 character"}),
    hours: z.string().optional(),
    minutes: z.string().optional(),
}); 

export interface UseDialogServiceFormProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    };
}

export type DialogServiceFormData = z.infer<typeof schema>;

export function useDialogServiceForm( ) {
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            price: "",
            hours: "",
            minutes: "",
        }
    });
    
}