"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Folder, Edit, Trash2, ExternalLink } from "lucide-react";

interface Product {
	id: string;
	name: string;
	description: string;
}

export default function Home() {
	const [products, setProducts] = useState<Product[]>([
		{ id: "1", name: "Продукт 1", description: "Описание продукта 1" },
		{ id: "2", name: "Продукт 2", description: "Описание продукта 2" },
		{ id: "3", name: "Продукт 3", description: "Описание продукта 3" },
		{ id: "4", name: "Продукт 4", description: "Описание продукта 4" },
		{ id: "5", name: "Продукт 5", description: "Описание продукта 5" },
		{ id: "6", name: "Продукт 6", description: "Описание продукта 6" },
		{ id: "7", name: "Продукт 7", description: "Описание продукта 7" },
	]);

	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null
	);

	const handleOpenModal = (
		type: "edit" | "delete",
		product: Product,
		e: React.MouseEvent
	) => {
		e.stopPropagation();
		setModalType(type);
		setSelectedProduct(product);
		setModalIsOpen(true);
	};

	const handleCloseModal = () => {
		setModalIsOpen(false);
		setModalType(null);
		setSelectedProduct(null);
	};

	return (
		<div className="min-h-screen bg-gray-200 p-8 flex justify-center items-center">
			<div className="grow relative max-w-6xl h-[500px] mx-auto overflow-y-auto px-8 bg-gradient-to-b from-gray-400 to-gray-300 py-10 border-solid border-gray-600 border-[6px]">
				{products.map((product, index) => (
					<motion.div
						key={product.id}
						layoutId={product.id}
						className="relative"
						initial={{
							y: index * 10, // Смещение по оси Y для каждой папки
						}}
						animate={{
							y: selectedId === product.id ? -20 : index * 10,
							scale: selectedId === product.id ? 1.02 : 1,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
						style={{
							zIndex: product.id === selectedId ? 10 : index,
						}}
						onClick={() =>
							setSelectedId(
								selectedId === product.id ? null : product.id
							)
						}
					>
						{/* Папка */}
						<div
							className={`w-full ${
								selectedId === product.id ? "h-64" : "h-24"
							} bg-yellow-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-yellow-300 cursor-pointer relative overflow-hidden`}
						>
							{/* Язычок */}
							<div className="text-yellow-300 absolute top-5 right-0 bg-yellow-300 text-sm py-1 px-2 rounded-bl-xl">
								use client
							</div>

							{/* Верхняя часть папки */}
							<div className="absolute top-0 left-0 right-0 h-8 bg-yellow-300 rounded-t-lg" />

							{/* Содержимое папки */}
							<div className="relative p-4 pt-10">
								<div className="flex items-center gap-2">
									<Folder className="w-6 h-6 text-yellow-600" />
									<h2 className="text-xl font-bold text-yellow-800">
										{product.name}
									</h2>
								</div>

								<AnimatePresence>
									{selectedId === product.id && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{
												opacity: 1,
												height: "auto",
											}}
											exit={{ opacity: 0, height: 0 }}
											className="mt-4 space-y-4"
										>
											<p className="text-yellow-900">
												{product.description}
											</p>

											<div className="flex gap-2">
												<Button
													variant="outline"
													className="bg-white hover:bg-yellow-50"
													onClick={(e) => {
														e.stopPropagation();
														window.location.href = `/product/${product.id}/structure`;
													}}
												>
													<ExternalLink className="w-4 h-4 mr-2" />
													Изучить
												</Button>
												<Button
													variant="outline"
													className="bg-white hover:bg-green-50"
													onClick={(e) =>
														handleOpenModal(
															"edit",
															product,
															e
														)
													}
												>
													<Edit className="w-4 h-4 mr-2" />
													Редактировать
												</Button>
												<Button
													variant="outline"
													className="bg-white hover:bg-red-50"
													onClick={(e) =>
														handleOpenModal(
															"delete",
															product,
															e
														)
													}
												>
													<Trash2 className="w-4 h-4 mr-2" />
													Удалить
												</Button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Модальные окна */}
			<Dialog
				open={modalIsOpen}
				onOpenChange={(open) => !open && handleCloseModal()}
			>
				<DialogContent className="sm:max-w-md">
					{modalType === "edit" ? (
						<div className="space-y-4">
							<DialogHeader>
								<DialogTitle>Редактировать продукт</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium">
										Название
									</label>
									<Input
										defaultValue={selectedProduct?.name}
										className="mt-1"
									/>
								</div>
								<div>
									<label className="text-sm font-medium">
										Описание
									</label>
									<Textarea
										defaultValue={
											selectedProduct?.description
										}
										className="mt-1"
									/>
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={handleCloseModal}
								>
									Отмена
								</Button>
								<Button onClick={handleCloseModal}>
									Сохранить
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<DialogHeader>
								<DialogTitle>Удалить продукт?</DialogTitle>
								<DialogDescription>
									Вы действительно хотите удалить продукт "
									{selectedProduct?.name}"?
								</DialogDescription>
							</DialogHeader>
							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={handleCloseModal}
								>
									Отмена
								</Button>
								<Button
									variant="destructive"
									onClick={handleCloseModal}
								>
									Удалить
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
