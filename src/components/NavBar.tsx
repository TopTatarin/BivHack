"use client";

import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

type Link = {
	title: string;
	href: string;
};

export type NavBarProps = {
	links: Link[];
};

export default function NavBar(props: NavBarProps) {
	const [activeHref, setActiveHref] = useState(props.links[0].href);

	return (
		<nav
			style={{
				background: "#f0f0f0",
				padding: "10px 0",
				position: "relative",
				width: "100%",
			}}
		>
			<AnimateSharedLayout>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{props.links.map((link) => (
						<div
							key={link.href}
							style={{ position: "relative", margin: "0 10px" }}
						>
							<button
								onClick={() => setActiveHref(link.href)}
								style={{
									background: "transparent",
									border: "none",
									fontSize: "16px",
									cursor: "pointer",
									padding: "10px 20px",
									position: "relative",
								}}
							>
								{link.title}
							</button>
							{activeHref === link.href && (
								<motion.div
									layoutId="activeTabBackground"
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										background: "#007bff",
										borderRadius: "8px",
										zIndex: -1,
									}}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
									}}
								/>
							)}
						</div>
					))}
				</div>
			</AnimateSharedLayout>
		</nav>
	);
}
