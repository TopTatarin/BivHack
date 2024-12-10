import React from "react";

export type InfoPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default function Info(props: InfoPageProps) {
	const params = React.use(props.params);
	const { id } = params;

	return <main>{id}</main>;
}
