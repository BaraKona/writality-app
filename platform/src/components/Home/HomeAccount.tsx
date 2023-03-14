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

			<div className="flex   flex-wrap gap-5  items-center justify-between sm:justify-center flex-row p-5 hover:bg-base border border-transparent hover:border-baseBorderDark transition-all duration-500 ease-in-out">
				<Image
					src={circle4}
					alt="Writality Edit"
					className=" animate-pulse max-w-sm p-2 hover:bg-base border border-transparent hover:border-baseBorderDark transition-all duration-500 ease-in-out "
				/>
				<div className="flex flex-col  ">
					<Text
						size="md"
						weight={500}
						className="p-5 max-w-md text-stone-300 text-center sm:text-left"
					>
						Welcome to our collaborative creative writing platform! <br />
						To get started, sign up for an account and start exploring the many
						features we have to offer. <br /> <br />
						As a member of our community, you'll be able to create and edit your
						own writing projects, collaborate with others, and share your work
						with a wider audience. Plus, with our versioning system, you'll
						never have to worry about losing your progress or overwriting
						previous versions of your work. We've designed our platform to make
						it easy for you to stay organized and focused on your writing, so
						you can spend more time doing what you love.
						<br /> <br />
						Ready to get started? Click the "Sign Up" button below and let's get
						writing!
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
			</div>
		</Container>
	);
}
