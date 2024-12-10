import axios from "axios";
import { NextResponse } from "next/server";

export type NodeData = {
	id: string;
	name: string;
	description: string;
	path: string;
};

type getNodesResponse = NodeData[];

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		// Запрос к API с типизацией ответа
		const response = await axios.get<getNodesResponse>(
			"https://placeholder.api/products"
		);

		return NextResponse.json(response.data);
	} catch (error) {
		// Если API недоступен, возвращаем моковые данные
		const nodes: getNodesResponse = [
			{
				id: "2",
				name: `Объект 2`,
				description: `Описание объекта 2`,
				path: "1.2",
			},
			{
				id: "3",
				name: `Объект 3`,
				description: `Описание объекта 3`,
				path: "1.3",
			},
			{
				id: "4",
				name: `Вид 4`,
				description: `Описание вида 4`,
				path: "1.2.4",
			},
			{
				id: "5",
				name: `Вид 5`,
				description: `Описание вида 5`,
				path: "1.3.5",
			},
			{
				id: "6",
				name: `Риск 6`,
				description: `Описание риска 6`,
				path: "1.3.5.6",
			},
			{
				id: "7",
				name: `Риск 7`,
				description: `Описание риска 7`,
				path: "1.3.5.7",
			},
		];
		return NextResponse.json(nodes);
	}
}
