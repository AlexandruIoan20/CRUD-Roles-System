"use client"

import { useState } from "react"

// Form Imports
import { useForm } from "react-hook-form";
import { roleFormSchema, type roleFormValues } from "@/schemas/roleFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// Actions
import { createRole } from "@/app/(main)/roles/actions";

// Shadcn Components
import { Button } from "@/components/ui/button";
import {
    Form, 
    FormControl,
    FormField, 
    FormItem,
    FormLabel, 
    FormMessage, 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const RoleForm = () => { 
    const [ loading, setLoading ] = useState<boolean> (false); 
    
    const form = useForm<roleFormValues>({ 
        resolver: zodResolver(roleFormSchema),
        defaultValues: { 
            title: "", 
        }
    }); 

    const submitForm = async(formData: FormData) => { 
        try { 
            setLoading(true);

            try { 
                await createRole(formData);
            } catch(error) { 
                console.log(error); 
            }

        } catch(error) { 
            console.log(error); 
        } finally { 
            setLoading(false); 
            form.reset(); 
        }
    }; 

    const handleSubmit = form.handleSubmit((data) => { 
        const formData = new FormData(); 
        formData.append("title", data.title || ""); 

        submitForm(formData); 
    }); 

    return ( 
        <Form { ...form }>
            <form onSubmit = { handleSubmit }>
                <FormField
                    control = { form.control }
                    name = "title"
                    render = { ({ field }) => ( 
                        <FormItem>
                            <FormLabel>Role Title</FormLabel>
                            <FormControl>
                                <Input
                                    type = "text"
                                    disabled = { loading }
                                    placeholder = "Enter role title"
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )}
                />

                <Button
                    type = "submit"
                > Add Role </Button>
            </form>
        </Form>
    )
}