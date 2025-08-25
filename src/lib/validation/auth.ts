import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email('Enter a valid email'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

// (optional) export types
// export type LoginValues = z.infer<typeof LoginSchema>;
