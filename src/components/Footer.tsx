import { Anchor, Footer, Group, Text } from "@mantine/core";
import { Copyright } from "tabler-icons-react";

export const FooterComponent = () => {
	return (
		<Footer height={40} p="xs">
			<Group>
				<Copyright size={20} strokeWidth={1.5} color={"black"} />
				<Text>Michał Markiewicz-Al Saeedi 2024</Text>
				<Anchor
					href="https://www.linkedin.com/in/mmarkiewiczalsaeedi/?originalSubdomain=de"
					target="_blank"
				>
					Michał Markiewicz-Al Saeedi
				</Anchor>
				<Anchor href="https://github.com/mmarkiewiczalsaeedi" target="_blank">
					github repo for this project
				</Anchor>
			</Group>
		</Footer>
	);
};
