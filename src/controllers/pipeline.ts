// src/controllers/pipeline.controller.ts
import { Request, Response } from 'express';
import { db } from '@/db';
import { Success, HttpError } from '@/utils/httpResponse';
import { createId } from '@paralleldrive/cuid2';
import { pipelines } from '@/db/schema';

export const createPipeline = async (req: Request, res: Response) => {
	try {
		const { name, description, published, metadata, auth } = req.body;
		const { userId } = auth;
		console.log(userId);
		const pipeline = await db
			.insert(pipelines)
			.values({
				id: createId(),
				userId,
				name,
				description,
				published,
				metadata,
			})
			.returning()
			.get();
		res
			.status(201)
			.json(
				new Success(
					`Pipeline - ${pipeline.name} Created Successfully`,
					pipeline
				)
			);
	} catch (error) {
		res.status(500).json(new HttpError('Failed to create pipeline', error));
	}
};

export const updatePipeline = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const { name, description, metadata } = req.body;
	// 	const userId = req.auth.userId;
	// 	const pipeline = await db.query.pipelines.findFirst({
	// 		where: (pipelines, { eq }) =>
	// 			eq(pipelines.id, id) && eq(pipelines.userId, userId),
	// 	});
	// 	if (!pipeline) {
	// 		return res.status(404).json(new HttpError('Pipeline not found'));
	// 	}
	// 	const updatedPipeline = await db
	// 		.update('pipelines')
	// 		.set({
	// 			name: name || pipeline.name,
	// 			description: description || pipeline.description,
	// 			metadata: metadata || pipeline.metadata,
	// 			updatedAt: new Date(),
	// 		})
	// 		.where({ id })
	// 		.returning()
	// 		.get();
	// 	res
	// 		.status(200)
	// 		.json(
	// 			new Success(
	// 				`Pipeline - ${updatedPipeline.name} Updated Successfully`,
	// 				updatedPipeline
	// 			)
	// 		);
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to update pipeline', error));
	// }
};

export const deletePipeline = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const userId = req.auth.userId;
	// 	const pipeline = await db.query.pipelines.findFirst({
	// 		where: (pipelines, { eq }) =>
	// 			eq(pipelines.id, id) && eq(pipelines.userId, userId),
	// 	});
	// 	if (!pipeline) {
	// 		return res.status(404).json(new HttpError('Pipeline not found'));
	// 	}
	// 	await db.delete('pipelines').where({ id });
	// 	res
	// 		.status(200)
	// 		.json(
	// 			new Success(
	// 				`Pipeline - ${pipeline.name} Deleted Successfully`,
	// 				pipeline
	// 			)
	// 		);
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to delete pipeline', error));
	// }
};

export const fetchAllPipelines = async (req: Request, res: Response) => {
	// try {
	// 	const userId = req.auth.userId;
	// 	const pipelines = await db.query.pipelines.findMany({
	// 		where: (pipelines, { eq }) => eq(pipelines.userId, userId),
	// 	});
	// 	res
	// 		.status(200)
	// 		.json(new Success('Pipelines Fetched Successfully', pipelines));
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to fetch pipelines', error));
	// }
};

export const fetchPipeline = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const userId = req.auth.userId;
	// 	const pipeline = await db.query.pipelines.findFirst({
	// 		where: (pipelines, { eq }) =>
	// 			eq(pipelines.id, id) && eq(pipelines.userId, userId),
	// 	});
	// 	if (!pipeline) {
	// 		return res.status(404).json(new HttpError('Pipeline not found'));
	// 	}
	// 	res
	// 		.status(200)
	// 		.json(
	// 			new Success(
	// 				`Pipeline - ${pipeline.name} Fetched Successfully`,
	// 				pipeline
	// 			)
	// 		);
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to fetch pipeline', error));
	// }
};

export const clonePipeline = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const userId = req.auth.userId;
	// 	const pipeline = await db.query.pipelines.findFirst({
	// 		where: (pipelines, { eq }) =>
	// 			eq(pipelines.id, id) && eq(pipelines.userId, userId),
	// 	});
	// 	if (!pipeline) {
	// 		return res.status(404).json(new HttpError('Pipeline not found'));
	// 	}
	// 	const clonedPipeline = await db
	// 		.insert('pipelines')
	// 		.values({
	// 			id: createId(),
	// 			userId,
	// 			name: `${pipeline.name} (Clone)`,
	// 			description: pipeline.description,
	// 			metadata: pipeline.metadata,
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		})
	// 		.returning()
	// 		.get();
	// 	res
	// 		.status(200)
	// 		.json(
	// 			new Success(
	// 				`Pipeline - ${clonedPipeline.name} Cloned Successfully`,
	// 				clonedPipeline
	// 			)
	// 		);
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to clone pipeline', error));
	// }
};

export const executePipeline = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const userId = req.auth.userId;
	// 	const pipeline = await db.query.pipelines.findFirst({
	// 		where: (pipelines, { eq }) =>
	// 			eq(pipelines.id, id) && eq(pipelines.userId, userId),
	// 	});
	// 	if (!pipeline) {
	// 		return res.status(404).json(new HttpError('Pipeline not found'));
	// 	}
	// 	// Add logic to execute the pipeline
	// 	// For now, just return a success message
	// 	res
	// 		.status(200)
	// 		.json(
	// 			new Success(
	// 				`Pipeline - ${pipeline.name} Execution in Progress`,
	// 				pipeline
	// 			)
	// 		);
	// } catch (error) {
	// 	res.status(500).json(new HttpError('Failed to execute pipeline', error));
	// }
};
