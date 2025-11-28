"use client";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceGetPayload } from "@/generated/models";
import { formatCurrency } from "@/utils/formatCurrency";
import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteService } from "../_actions/delete-service";
import { DialogService } from "./dialog-service";

type Service =ServiceGetPayload<{}>;

interface ServiceListProps {
    services?: Service[];
}
export function ServiceList({ services }: ServiceListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService]= useState<null | Service>(null);
    console.log("ServiceList:",services);
    async function handleDeleteService(serviceId: string): Promise<void> {
        const response = await deleteService({ serviceId });
        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast.success(response.data);

    }
    function handleEditService(service: Service): void {
        setEditingService(service);
        setIsDialogOpen(true);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <section className="mx-auto">
               <Card>
                <CardHeader className="flex flex-row justify-between items-center space-x-0 pb-2" >
                    <CardTitle className=" text-xl md:text-2xl font bold">Servicos</CardTitle>
                    <DialogTrigger asChild>
                        <Button >
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent onInteractOutside={(e) => {
                       e.preventDefault();
                       setIsDialogOpen(false);
                       setEditingService(null)
                    }}>
                        <DialogService  
                            closeDialog={() => {
                                setIsDialogOpen(false);
                                setEditingService(null);
                            }}
                            serviceId={editingService? editingService.id : undefined}
                            initialValues={editingService ? {
                                name: editingService.name,
                                price: (editingService.price / 100).toFixed(2).replace('.', ','),
                                hours: Math.floor(editingService.duration / 60).toString(),
                                minutes: (editingService.duration % 60).toString(),
                            } : undefined}
                        />

                    </DialogContent>
                </CardHeader>
                <CardContent>
                    <section className="mt-5">
                        {services?.map((service) => (
                            <article key={service.id} className="flex items-center justify-between  space-x-2">
                                <div className="flex items-center space-x-2 ">
                                    <span className=" font-medium">{service.name}</span>
                                    <span className="text-gray-500"> - </span>
                                    <span className="text-sm text-gray-500">{formatCurrency((service.price/100))}</span>
                                </div>

                                <div>
                                    <Button variant="ghost" size="sm" onClick={()=>handleEditService(service)}>
                                        <Pencil className="w-4 h-4"/>
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={()=> handleDeleteService(service.id)}>
                                        <X className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </section>
                </CardContent>
               </Card>
             </section>
        </Dialog>
        
    );
}