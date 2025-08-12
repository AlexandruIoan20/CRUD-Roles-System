import * as z from "zod"; 

export const roleFormSchema = z.object({ 
    title: z
        .string()
        .min(1, "Role title is required.")
}); 

export type roleFormValues = z.infer<typeof roleFormSchema>; 