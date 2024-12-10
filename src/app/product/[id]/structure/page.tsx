"use client";

import React, { useEffect, useState } from "react";
import { ReactFlow, Background, Controls, MiniMap, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeElement, { NodeElementProps } from "@/components/NodeElement";
import axios from "axios";
import { NodeData } from "@/app/api/nodes/[id]/route";

export type StructurePageProps = {
	params: Promise<{
		id: string;
	}>;
};

type CustomNode = Node<NodeElementProps["data"]>;

const nodeTypes = { nodeElement: NodeElement };

export default function Structure(props: StructurePageProps) {
	const params = React.use(props.params);
	const { id } = params;

	const [nodes, setNodes] = useState<CustomNode[]>([]);
	const [edges, setEdges] = useState([]);

	useEffect(() => {
		async function fetchTree() {
			const { data: rootData } = await axios.get(`/api/products/${id}`);

			const { data: nodesData } = await axios.get(`/api/nodes/${id}`);

			const levels: Record<number, string[]> = { 2: [], 3: [], 4: [] };

			const nodes: CustomNode[] = [];

			nodesData.forEach((node: NodeData) => {
				const path = node.path.split(".");
				levels[path.length].push(path[path.length - 1]);

				nodes.push({
					id: node.id,
					position: {
						x: Math.random() * 1000 - 500,
						y: Math.random() * 1000 - 500,
					},
					type: "nodeElement",
					data: {
						entity:
							path.length === 2
								? "Объект страхования"
								: path.length === 3
								? "Вид страхования"
								: path.length === 4
								? "Риски страхования"
								: "Риски страхования",
						name: node.name,

						description: node.description,
						parentId: path[path.length - 2],
					},
				});
			});

			console.log(JSON.stringify(levels, null, 4));

			setNodes([
				...nodes,
				{
					id: rootData.id,
					position: { x: 0, y: 0 },
					type: "nodeElement",
					data: {
						entity: "Страховой продукт",
						name: rootData.name,
						description: rootData.description,
						childrenId: nodesData.map(
							(node: NodeData) => node.path.split(".")[1]
						),
					},
				},
			]);
		}

		fetchTree();
	}, []);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				fitView
			>
				<Background />
				<Controls />
				<MiniMap />
			</ReactFlow>
		</div>
	);
}
