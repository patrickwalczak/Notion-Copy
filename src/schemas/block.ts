import { BlocksUnionType } from '@/types/block';
import { JsonValue } from '@prisma/client/runtime/library';
import { z } from 'zod';

export const TextBlockPropertiesSchema = z.object({
	name: z.string(),
	textColor: z.string().default(''),
	backgroundColor: z.string().default(''),
});

export const parseBlockProperties = (type: BlocksUnionType, properties: JsonValue) => {
	switch (type) {
		case 'text':
			return TextBlockPropertiesSchema.parse(properties);
	}
};
