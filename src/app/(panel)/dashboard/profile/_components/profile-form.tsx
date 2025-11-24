import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ 
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status:z.string(),
    timezone: z.string().min(1, { message: 'Timezone is required' }),
    
});

 export type ProfileFormData = z.infer<typeof schema>;

export function useProfileForm(){
    return useForm<ProfileFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            status: 'Ativo',
            timezone: ''
        }
    })
}