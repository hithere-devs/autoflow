import { Router, Request, Response } from 'express';

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
 * /api/v1/pipelines:
 *   get:
 *     summary: Get all pipelines
 *     tags: [Pipelines]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of pipelines
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pipeline'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pipeline created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 */

/**
 * @swagger
 * /api/v1/pipelines/{id}:
 *   get:
 *     summary: Get pipeline by ID
 *     tags: [Pipelines]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pipeline ID
 *     responses:
 *       200:
 *         description: Pipeline details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Pipeline'
 *       404:
 *         description: Pipeline not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pipelineRoutes.get('/', (req: Request, res: Response) => {
	res.send({ message: 'This is an example pipeline route' });
});

export default pipelineRoutes;
