// src/config/bull-board.ts
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { queueInitializer } from '@/queue/nodes/queue.initializer';

export function setupBullBoard() {
	const serverAdapter = new ExpressAdapter();
	serverAdapter.setBasePath('/admin/queues');

	createBullBoard({
		queues: queueInitializer().map((queue) => new BullMQAdapter(queue)),
		serverAdapter,
	});

	return serverAdapter;
}
