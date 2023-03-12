import { Container, Text, Button, Divider } from "@mantine/core";
import { Image } from "@mantine/core";
import { WritalityEdit } from "../../assets/images";
import { circle4 } from "../../assets/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
type Props = {};
// this page urges people to create an account and gives them a button that takes them to signup

export function HomeAccount({}: Props) {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
	return (
		<Container size="md" className="">
			<Divider
				my="sm"
				label={
					<h2 className=" text-[1.8rem] text-slate-300 text-center">
						Create an Account
					</h2>
				}
				labelPosition="center"
				className="my-20"
			/>

			<div className="flex flex-row  items-center justify-between p-5 hover:bg-base border border-transparent hover:border-baseBorderDark transition-all duration-500 ease-in-out">
				<div className="flex flex-col  ">
					<Text size="md" weight={500} className="p-5 max-w-md text-stone-300">
						Are you ready to put your ideas on paper? Our collaborative version
						controlled creative writing platform is here to help. Our
						user-friendly interface and powerful writing tools make it easy to
						get started on your writing project. Whether you're writing a novel,
						a memoir, or a short story, we've got you covered.
					</Text>
					<Button
						variant="outline"
						color="teal"
						className="mt-5"
						onClick={() => {
							if (currentUser) {
								navigate("/dashboard/posts");
							} else {
								navigate("auth/register");
							}
						}}
					>
						Create an Account
					</Button>
				</div>
				<Image
					src={circle4}
					alt="Writality Edit"
					className=" animate-pulse max-w-sm p-2 hover:bg-base border border-transparent hover:border-baseBorderDark transition-all duration-500 ease-in-out "
				/>
			</div>
		</Container>
	);
}
