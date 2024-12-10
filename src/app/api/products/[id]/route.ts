import axios from "axios";
import { NextResponse } from "next/server";

// Интерфейс для ответа API
interface GetProductResponse {
	id: string;
	name: string;
	description: string;
}

// Обработчик GET-запроса
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		// Запрос к API с типизацией ответа
		const response = await axios.get<GetProductResponse>(
			"https://placeholder.api/products"
		);

		return NextResponse.json(response.data); // Тип ответа будет GetProductResponse
	} catch (error) {
		// Если API недоступен, возвращаем моковые данные
		const product: GetProductResponse = {
			id,
			name: `Продукт ${id}`,
			description: `Описание продукта ${id}`,
		};
		return NextResponse.json(product);
	}
}
