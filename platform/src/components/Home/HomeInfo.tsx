import { Card, Text, Container, Flex, Divider } from "@mantine/core";
import { IconGitBranch, IconSend, IconEdit } from "@tabler/icons";
type Props = {};

export function HomeInfo({}: Props) {
	const cardClass =
		"max-w-[25rem] max-w-2xl p-5 mb-5 bg-baseMid hover:bg-baseColour transition-all duration-300 ease-in-out hover:border-baseBorderDark hover:border border-transparent border";
	return (
		<Container size="xl" className="mt-5 sm:mt-10">
			<Divider
				my="sm"
				label={
					<h2 className="text-xl sm:text-2xl text-slate-300 text-center">
						What Makes Writality Different?
					</h2>
				}
				labelPosition="center"
				className="my-10 md:my-20"
			/>
			<Flex justify="center" direction="row" wrap="wrap" gap={20}>
				<Card shadow="sm" className={cardClass}>
					<Flex align="center" className="mb-5 ">
						<IconEdit size={30} className="mr-5" />
						<h3 className="text-lg">Start writing</h3>
					</Flex>
					<Text className="text-sm sm:text-base" weight={500}>
						Are you ready to put your ideas on paper? Our collaborative version
						controlled creative writing platform is here to help. Our
						user-friendly interface and powerful writing tools make it easy to
						get started on your writing project. Whether you're writing a novel,
						a memoir, or a short story, we've got you covered.
					</Text>
				</Card>
				<Card shadow="sm" className={cardClass}>
					<Flex align="center" className="mb-5">
						<IconGitBranch size={30} className="mr-5" />
						<h3 className="text-lg">Collaborate with others</h3>
					</Flex>
					<Text className="text-sm sm:text-base" weight={500}>
						Writing doesn't have to be a solo endeavour. With our collaborative
						version controlled creative writing platform, you can team up with
						other writers to create something truly special. Our unique
						branching and merging features allow you to work together
						seamlessly, while our version control tools ensure that every change
						is saved and tracked.
					</Text>
				</Card>
				<Card shadow="sm" className={cardClass}>
					<Flex align="center" className="mb-5">
						<IconSend size={30} className="mr-5" />
						<h3 className="text-lg">Share your work</h3>
					</Flex>
					<Text className="text-sm sm:text-base" weight={500}>
						When you're ready to share your writing with the world, our platform
						makes it easy. Our built-in sharing tools let you share your work
						with friends, family, and even potential publishers. And because our
						platform offers version control, you can be sure that the version
						you share is the final, polished version of your work.
					</Text>
				</Card>
			</Flex>
		</Container>
	);
}
