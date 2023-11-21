import { FC, useState } from "react";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { OnboardingCard } from "../../components/onboarding/OnboardingCard";
import { OnboardingStep1 } from "../../components/onboarding/OnboardingStep1";
import { OnboardingStep2 } from "../../components/onboarding/OnboardingStep2";
import { OnboardingStep3 } from "../../components/onboarding/OnboardingStep3";
import { IUser } from "../../interfaces/IUser";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCompleteOnboarding } from "../../hooks/onboarding/useCompleteOnboarding";

export const OnboardingPage: FC = () => {
	const [step, setStep] = useState(1);
	const [user, setUser] = useState<IUser>({} as IUser);

	const { mutate: completeOnboarding, isLoading } = useCompleteOnboarding();

	const [parent] = useAutoAnimate();

	return (
		<AuthWrapper>
			<AuthHeader />
			<section className="border border-border rounded-lg dark:bg-hoverDark dark:border-baseDark shadow-md p-8">
				<OnboardingCard>
					{step === 1 && <OnboardingStep1 next={() => setStep(step + 1)} />}
					{step === 2 && (
						<OnboardingStep2
							next={() => setStep(step + 1)}
							back={() => setStep(step - 1)}
							user={user}
							setUser={setUser}
						/>
					)}
					{step === 3 && (
						<OnboardingStep3
							next={() => completeOnboarding(user)}
							back={() => setStep(step - 1)}
							isLoading={isLoading}
							user={user}
							setUser={setUser}
						/>
					)}
				</OnboardingCard>
			</section>
			<AuthFooter />
		</AuthWrapper>
	);
};
