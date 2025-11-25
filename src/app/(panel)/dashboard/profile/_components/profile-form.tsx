import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UseProfileFormProps {
    name: string | null;
    address: string| null;
    phone: string| null;
    status: boolean;
    timezone: string| null;
}

const schema = z.object({ 
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status:z.string(),
    timezone: z.string().min(1, { message: 'Timezone is required' }),
    
});

 export type ProfileFormData = z.infer<typeof schema>;

export function useProfileForm({name, address, phone, status, timezone}: UseProfileFormProps) {
    return useForm<ProfileFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: name ||"",
            address: address || "",
            phone: phone || "",
            status: status ? 'active': 'inactive',
            timezone: timezone || ''
        }
    })
}