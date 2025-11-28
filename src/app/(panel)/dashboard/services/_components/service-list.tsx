"use client";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceGetPayload } from "@/generated/models";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DialogService } from "./dialog-service";

type Service =ServiceGetPayload<{}>;

interface ServiceListProps {
    services?: Service[];
}
export function ServiceList({ services }: ServiceListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log("ServiceList:",services);
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
                    <DialogContent>
                        <DialogService  closeDialog={() => setIsDialogOpen(false)}/>

                    </DialogContent>
                </CardHeader>
               </Card>
             </section>
        </Dialog>
        
    );
}