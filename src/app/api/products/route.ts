import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		// Заготовка для будущего запроса к настоящему бэкенду
		const response = await axios.get("https://placeholder.api/products");

		return NextResponse.json(response.data);
	} catch (error) {
		// Если API недоступен, возвращаем моковые данные
		const products = [
			{ id: "1", name: "Продукт 1", description: "Описание продукта 1" },
			{ id: "2", name: "Продукт 2", description: "Описание продукта 2" },
			{ id: "3", name: "Продукт 3", description: "Описание продукта 3" },
		];
		return NextResponse.json(products);
	}
}
