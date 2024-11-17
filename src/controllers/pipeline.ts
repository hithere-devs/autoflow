// src/controllers/pipeline.controller.ts
import { NextFunction, Request, Response } from 'express';
import { db } from '@/db';
import { Success, HttpError } from '@/utils/httpResponse';
import { createId } from '@paralleldrive/cuid2';
import { pipelines } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { and } from 'drizzle-orm';

const getAuthUserId = () => 'poiuytrewq';

export const createPipeline = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, description, published, metadata, auth } = req.body;
		const userId = getAuthUserId();
		const pipeline = db
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
	} catch (error: any) {
		if (error.message.includes('UNIQUE constraint failed')) {
			const errResponse = new HttpError(
				'Pipeline with the same name already exists',
				error,
				409
			);
			next(errResponse);
		} else next(error);
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

export const fetchAllPipelines = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// get user id from req
		const userId = getAuthUserId();

		// fetch all pipelines
		const data = await db
			.select()
			.from(pipelines)
			.where(eq(pipelines.userId, 'poiuytrewa'));

		if (data.length <= 0) {
			throw new Error('No Pipelines Found');
		}

		// response
		const response = new Success('Pipelines Fetched Successfully', data);
		// example success response
		/*
        {
            "status": true,
            "statusCode": 200,
            "message": "Pipelines Fetched Successfully",
            "data": [
                {
                "id": "dnl97qzavcevwo1a7x2nkuzd",
                "userId": "poiuytrewq",
                "name": "p1",
                "description": "test",
                "published": false,
                "metadata": {
                    "randomData": "testing the json format",
                    "rNumber": 1
                },
                "createdAt": null,
                "updatedAt": null
                },
                {
                "id": "mvgqqope7n5pmceqoiks1n98",
                "userId": "poiuytrewq",
                "name": "p2",
                "description": "test",
                "published": false,
                "metadata": {
                    "randomData": "testing the json format",
                    "rNumber": 1
                },
                "createdAt": null,
                "updatedAt": null
                },
                {
                "id": "d1wc5llyfgi3a0nyrri75jek",
                "userId": "poiuytrewq",
                "name": "p3",
                "description": "test",
                "published": false,
                "metadata": {
                    "randomData": "testing the json format",
                    "rNumber": 1
                },
                "createdAt": null,
                "updatedAt": null
                },
                {
                "id": "th320g6lzkgmtrstht2blsut",
                "userId": "poiuytrewq",
                "name": "p4",
                "description": "test",
                "published": false,
                "metadata": {
                    "randomData": "testing the json format",
                    "rNumber": 1
                },
                "createdAt": null,
                "updatedAt": null
                }
            ]
        }
        */
		res.status(response.statusCode).json(response);
	} catch (error: any) {
		console.log(error);
		if (error.message === 'No Pipelines Found') {
			const errResponse = new HttpError('No Pipelines Found', error, 404);
			/*
                {
                    "status": false,
                    "message": "No Pipelines Found",
                    "errors": {}
                }
            */
			next(errResponse);
		} else next(error);
	}
};

export const fetchPipeline = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// get id, userId from req
		const { id } = req.params;
		const userId = getAuthUserId();

		// fetch pipeline
		const pipeline = await db
			.select()
			.from(pipelines)
			.where(and(eq(pipelines.id, id), eq(pipelines.userId, userId)));

		// check if pipeline not found
		if (pipeline.length <= 0) {
			throw new Error('Pipeline not found');
		}

		// response
		const response = new Success(
			`Pipeline - ${pipeline[0].name} Fetched Successfully`,
			pipeline
		);
		// example success response
		/*
        {
            "status": true,
            "statusCode": 200,
            "message": "Pipeline - p1 Fetched Successfully",
            "data": [
                {
                "id": "dnl97qzavcevwo1a7x2nkuzd",
                "userId": "poiuytrewq",
                "name": "p1",
                "description": "test",
                "published": false,
                "metadata": {
                    "randomData": "testing the json format",
                    "rNumber": 1
                },
                "createdAt": null,
                "updatedAt": null
                }
            ]
        }
        */
		res.status(response.statusCode).json(response);
	} catch (error: any) {
		console.log(error);
		if (error.message === 'Pipeline not found') {
			const errResponse = new HttpError('Pipeline not found', error, 404);
			// example error response
			/*
                {
                    "status": false,
                    "message": "Pipeline not found",
                    "errors": {}
                }
            */
			next(errResponse);
		} else next(error);
	}
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
