import { PrismaClient, BlockType, PageType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.upsert({
		where: { id: 'f5b60405-08fa-45f8-b4c5-4ff23bd00709' },
		update: {},
		create: {
			id: 'f5b60405-08fa-45f8-b4c5-4ff23bd00709',
			email: 'user@example.com',
		},
	});

	const pages = await Promise.all(
		Array.from({ length: 4 }).map(async (_, index) => {
			const page = await prisma.page.create({
				data: {
					userId: user.id,
					order: index,
					type: PageType.page,
					properties: {
						name: `Page ${index + 1}`,
						icon: null,
						cover: null,
						isFullWidth: false,
						isSmallText: false,
						isPageLocked: false,
					},
				},
			});

			// Add 2–3 text blocks to each page
			const blockCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 blocks
			for (let i = 0; i < blockCount; i++) {
				await prisma.block.create({
					data: {
						pageId: page.id,
						order: i,
						type: BlockType.text,
						properties: {
							name: `Block ${i}`,
							textColor: null,
							backgroundColor: null,
						},
					},
				});
			}

			return page;
		})
	);

	console.log(`Seeded user with ${pages.length} pages.`);
}

main()
	.catch((e) => {
		console.error('Error seeding:', e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
