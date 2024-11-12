// src/config/bull-board.ts
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { testQueue } from '../queue';

export function setupBullBoard() {
	const serverAdapter = new ExpressAdapter();
	serverAdapter.setBasePath('/admin/queues');

	createBullBoard({
		queues: [new BullMQAdapter(testQueue)],
		serverAdapter,
	});

	return serverAdapter;
}
