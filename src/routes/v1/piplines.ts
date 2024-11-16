// src/routes/v1/pipeline.routes.ts
import { Router, Request, Response } from 'express';
import {
	createPipeline,
	updatePipeline,
	deletePipeline,
	fetchAllPipelines,
	fetchPipeline,
	clonePipeline,
	executePipeline,
} from '@/controllers/pipeline';

const pipelineRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Pipelines
 *   description: Pipeline management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pipeline:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: Pipeline unique identifier
 *         name:
 *           type: string
 *           description: Pipeline name
 *         description:
 *           type: string
 *           description: Pipeline description
 *         userId:
 *           type: string
 *           description: Owner of the pipeline
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *         errors:
 *           type: object
 */

/**
 * @swagger
 * /api/v1/pipeline:
 *   post:
 *     summary: Create a new pipeline
 *     tags: [Pipelines]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               published:
 *                 type: boolean
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Pipeline created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.post('/', createPipeline);

/**
 * @swagger
 * /api/v1/pipeline/{id}/save:
 *   put:
 *     summary: Update a pipeline
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Pipeline updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.put('/:id/save', updatePipeline);

/**
 * @swagger
 * /api/v1/pipeline/{id}/delete:
 *   delete:
 *     summary: Delete a pipeline
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     responses:
 *       200:
 *         description: Pipeline deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.delete('/:id/delete', deletePipeline);

/**
 * @swagger
 * /api/v1/pipeline:
 *   get:
 *     summary: Fetch all pipelines
 *     tags: [Pipelines]
 *     responses:
 *       200:
 *         description: Pipelines fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.get('/', fetchAllPipelines);

/**
 * @swagger
 * /api/v1/pipeline/{id}:
 *   get:
 *     summary: Fetch a single pipeline
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     responses:
 *       200:
 *         description: Pipeline fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.get('/:id', fetchPipeline);

/**
 * @swagger
 * /api/v1/pipeline/{id}/clone:
 *   get:
 *     summary: Clone a pipeline
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     responses:
 *       200:
 *         description: Pipeline cloned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.get('/:id/clone', clonePipeline);

/**
 * @swagger
 * /api/v1/pipeline/{id}/run:
 *   get:
 *     summary: Execute a pipeline
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     responses:
 *       200:
 *         description: Pipeline execution started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */
pipelineRoutes.get('/:id/run', executePipeline);

export default pipelineRoutes;
