import { Handle, Position } from "@xyflow/react";
import { Edit, Trash2 } from "lucide-react";

export type NodeElementProps = {
	data: {
		entity:
			| "Вид страхования"
			| "Объект страхования"
			| "Риски страхования"
			| "Страховой продукт";
		name: string;
		description: string;
		parentId?: string;
		childrenId?: string[];
	};
};

export default function NodeElement({
	data: { entity, name, description, parentId, childrenId },
}: NodeElementProps) {
	return (
		<div className=" rounded-lg border bg-white shadow-lg overflow-hidden">
			{/* Верхняя полоска с сущностью */}
			<div className="bg-blue-500 text-white p-2 text-center text-sm font-semibold">
				{entity}
			</div>

			{/* Основное содержимое карточки */}
			<div className="p-4">
				<h1 className="text-xl font-bold mb-2">{name}</h1>
				<p className="text-gray-500 text-sm">{description}</p>
			</div>

			{/* Кнопки редактировать и удалить */}
			{entity !== "Страховой продукт" && (
				<div className="flex space-x-2 p-4 border-t bg-gray-100">
					<button className="flex-1 flex justify-center items-center py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
						<Edit className="mr-2" /> Редактировать
					</button>
					<button className="flex-1 flex justify-center items-center py-2 px-4 text-white bg-red-500 rounded hover:bg-red-600">
						<Trash2 className="mr-2" /> Удалить
					</button>
				</div>
			)}

			{/* Handles для связи */}
			{parentId && (
				<Handle type="target" position={Position.Top} id={parentId} />
			)}
			{childrenId &&
				childrenId.map((childId) => (
					<Handle
						type="source"
						position={Position.Bottom}
						id={childId}
					/>
				))}
		</div>
	);
}
