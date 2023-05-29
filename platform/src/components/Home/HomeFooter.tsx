import React from "react";
import { Divider } from "@mantine/core";
import { Container } from "@mantine/core";
import dayjs from "dayjs";
export function HomeFooter() {
	// get the current year
	const year = dayjs(Date.now()).format("YYYY");
	return (
		<Container size="lg">
			<Divider className="mt-20 mb-4" labelPosition="center" />
			<p className="text-stone-200 text-center">
				© {year} Writality. All rights reserved.
			</p>
		</Container>
	);
}
