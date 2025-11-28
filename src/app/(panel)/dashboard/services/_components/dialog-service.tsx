"use client";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { convertRealToCents } from "@/utils/convertCurrency";
import { toast } from "sonner";
import { createNewService } from "../_actions/create-service";
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form";

import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DialogServiceProps {
    closeDialog: () => void;
}
export function DialogService({ closeDialog }: DialogServiceProps) {
    const [loading, setLoading]= useState(false);
    const form = useDialogServiceForm();
    async function onSubmit(values: DialogServiceFormData) {
        setLoading(true);
        const price = convertRealToCents(values.price);
        const hours = values.hours !== undefined ?parseInt(values.hours) || 0: 0;
        const minutes =  values .minutes !== undefined ? parseInt(values.minutes) || 0:0;
        const duration = (hours * 60) + minutes;

        const response= await createNewService({
            name: values.name,
            price: price,
            duration: duration,
        });
        setLoading(false);
        if(response.error){
            toast.error(response.error);
            return;
        }

        toast.success(response.data);
        handleCloseDialog();

    }
    function handleCloseDialog() {
        closeDialog();
        form.reset();
    } 

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        let {value} = event.target;
        value = value.replace(/\D/g, "");
        if(value){
            value = (parseInt(value,10) / 100).toFixed(2);
            value = value.replace(".", ",");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g,'.');
        }
        event.target.value = value;
        form.setValue("price", event.target.value);
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle>Adicionar Servico</DialogTitle>
                <DialogDescription>
                    Adicione um novo servico .
                </DialogDescription>
            </DialogHeader>  
            <Form {...form}>    
                <form className="space-y-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome do servico.." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Preco</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            onChange={changeCurrency} 
                                            type="text"
                                            placeholder="Ex: 120,00" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="font-semibold">Duracao do servico</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="hours"
                            
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Horas</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            type="number" 
                                            min={0}
                                            max={24}
                                            placeholder="0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Minutos</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            min={0}
                                            max={60}
                                            {...field} placeholder="0" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                    </div>

                    <Button type="submit" className="mt-4 w-full font-semibold text-white" disabled={loading}>
                       {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Adicionar Servico
                    </Button>

                </form>
            </Form>
        </>
    );
}