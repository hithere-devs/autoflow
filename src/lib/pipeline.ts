import { db } from '@/db';
import { Node, nodeEdges, nodes } from '../db/schema';
import { eq, inArray } from 'drizzle-orm';

export const getNextNodePayload = async (currNode: Node, response: any) => {
	// let's fetch edges from db
	const edges = await db.query.nodeEdges.findMany({
		where: eq(nodeEdges.sourceNodeId, currNode.id),
	});

	// if no edges found, return;
	if (!edges || edges.length === 0) {
		return;
	}

	// loop over all the edges and find out all the targetNodeIds from this curNode
	const targetNodeIds = edges
		.map((edge) => edge.targetNodeId)
		.filter((id) => id !== null);

	// let's fetch all the targetNodes from db
	const targetNodes = await db.query.nodes.findMany({
		where: inArray(nodes.id, targetNodeIds),
		with: {
			nodeType: true,
		},
	});

	// if no targetNodes found, return;
	if (!targetNodes || targetNodes.length === 0) {
		return;
	}

	// generate Payload for all the targetNodes
	targetNodes.map((node) => {
		// generate payload based on node type
		const payload = generatePayloadBasedOnType(node.nodeType?.name, response);

		// send payload to the next node based on node type
		sendPayloadToNextNode(node, payload);
	});
};

export const generatePayloadBasedOnType = (node_type: any, response: any) => {
	// set up a switch case to handle different node types and generate payload respcetively according to what the node type queues expect
	console.log(node_type, response);
};

export const sendPayloadToNextNode = (node: any, payload: any) => {
	// set up a switch case to handle different node types and pushing the payload to the next node queues respcetively
	console.log(node, payload);
};
