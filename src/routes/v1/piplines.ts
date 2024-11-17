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

pipelineRoutes.post('/', createPipeline);

pipelineRoutes.put('/:id/save', updatePipeline);

pipelineRoutes.delete('/:id/delete', deletePipeline);

pipelineRoutes.get('/', fetchAllPipelines);

pipelineRoutes.get('/:id', fetchPipeline);

pipelineRoutes.get('/:id/clone', clonePipeline);

pipelineRoutes.get('/:id/run', executePipeline);

export default pipelineRoutes;
