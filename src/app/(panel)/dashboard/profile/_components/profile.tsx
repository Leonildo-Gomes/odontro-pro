"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import imgTeste from '../../../../../../public/foto1.png';
import type { UserGetPayload } from '../../../../../generated/models/User';
import { updateProfileAction } from '../_actions/update-profile';
import { ProfileFormData, useProfileForm } from './profile-form';

import { formatPhone, unformatPhone } from '@/utils/formatPhone';
type UserWithSubscription = UserGetPayload<{
    include: { subscription: true };
}>;
interface ProfileContentProps {
    user:UserWithSubscription ;
}


export function ProfileContent({user}: ProfileContentProps) {
    const [selectedHours, setSelectedHours] = useState<string[]>(user.times || []);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);


    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timezone: user.timezone,
    });
    function generateTimeSlots(): string[] {
        const hours: string[] = [];

        for (let i = 8; i <=24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = i.toString().padStart(2, '0');
                const minute = j.toString().padStart(2, '0');
                const time = `${hour}:${minute}`;
                hours.push(time);
            }
        }
        return hours; 
    }

    const hours = generateTimeSlots();
   
    const timeZones=Intl.supportedValuesOf('timeZone').filter((zone) => zone.startsWith('Europe/Oslo'));
    function toggleHours(hour: string) {
        setSelectedHours((prev)=> prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]);
    }
    async function onSubmit( values : ProfileFormData) {
        /*const profileData= {
            ...values,
            selectedHours,

        }*/
       const phone = unformatPhone(values.phone || '');
        const response = await updateProfileAction({
           name:values.name,
           address: values.address,
           phone: phone,
           status: values.status === 'active' ? true : false,
           timezone: values.timezone,
           times: selectedHours || [],
    
        });
        if (response.error) {
            toast.error(response.error,{closeButton: true});
            return;
        }
        toast.success(response.data,{closeButton: true});

        console.log("Profile updated:", response);
    }

    return (
        <div className='mx-auto'>
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='flex justify-center'>
                                <div className=' bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                                    <Image src={user.image ? user.image : imgTeste}
                                        alt="foto de perfil"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Nome</FormLabel>
                                            <FormControl>
                                                <Input {...field}  placeholder='Digite o nome da clinica...'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Endereco</FormLabel>
                                            <FormControl>
                                                <Input {...field}  placeholder='Digite o endereco da clinica...'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Telefone</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}  
                                                    placeholder='(67) 99999-9999'
                                                    onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Status da Clinica</FormLabel>
                                            <FormControl>
                                               <Select onValueChange={field.onChange} defaultValue={field.value? "active": "inactive"}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status da clinica" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Ativo</SelectItem>
                                                        <SelectItem value="inactive">Inativo</SelectItem>
                                                    </SelectContent>
                                               </Select>

                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Modal de Horarios */}
                                <div>
                                    <Label className='font-semibold'>
                                        Horarios de Atendimento
                                    </Label>
                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className='mt-2 w-full justify-between'>
                                                Selecionar Horarios
                                                <ArrowRight className='w-5 h-5' />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Horarios de Atendimento</DialogTitle>
                                                <DialogDescription>
                                                    Selecione os horarios de atendimento da clinica
                                                </DialogDescription>
                                            </DialogHeader>
                                            <section className='py-4'>
                                                <p className='text-sm text-foreground'>
                                                    Clique nos horarios para marcar ou desmarcar
                                                </p>
                                                <div className='grid grid-cols-5 gap-2'>
                                                    {hours.map((hour) => (
                                                        <Button 
                                                            key={hour} 
                                                            variant="outline" 
                                                            className={cn('h-10',
                                                                selectedHours.includes(hour) && "border-2 border-emerald-500 text-emerald-500" ,)} 
                                                            onClick={()=> toggleHours(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>
                                             <Button className='w-full mt-4 bg-emerald-500 hover:bg-emerald-400 font-bold text-white'
                                                onClick={() => setDialogIsOpen(false)}
                                             >
                                                Fechar
                                             </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                 <FormField
                                    control={form.control}
                                    name="timezone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Selecione o fuso horario</FormLabel>
                                            <FormControl>
                                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione seu fuso horario" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((timezone) => (
                                                            <SelectItem key={timezone} value={timezone}>
                                                                {timezone}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                               </Select>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type='submit' 
                                    className='w-full mt-4 bg-emerald-500 hover:bg-emerald-400 font-bold text-white'
                                >
                                    Salvar
                                </Button>
                               

                            </div>
                            
                        </CardContent>

                    </Card>
                    
                </form>
            </Form>
        </div>
    );
}