import * as z from "zod"; 

export const roleFormSchema = z.object({ 
    title: z
        .string()
}); 

export type roleFormValues = z.infer<typeof roleFormSchema>; 