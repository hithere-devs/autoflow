export function tryWorker(fn: () => any, queueName: string) {
	try {
		fn();
	} catch (error) {
		console.error(`Execution failed in queue - ${queueName}:`, error);
		throw error;
	}
}
