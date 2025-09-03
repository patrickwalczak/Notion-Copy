import { z } from 'zod';

export const PagePropertiesSchema = z.object({
	name: z.string(),
	icon: z.string().default(''),
	cover: z.string().default(''),
	isSmallText: z.boolean().default(false),
	isFullWidth: z.boolean().default(false),
	isPageLocked: z.boolean().default(false),
	textColor: z.string().default(''),
	backgroundColor: z.string().default(''),
});
