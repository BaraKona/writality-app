import { AuthFooter } from "../components/auth/AuthFooter";
import { useThemeContext } from "../Providers/ThemeProvider";
import { cyclops8, cyclops7 } from "../assets/icons";
import WritalityDesktop from "../assets/images/writality-desktop.png";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const PermanentRedirect = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <section className="h-full bg-base dark:bg-baseDark dark:text-coolGrey-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-1">
        <nav className="mr-auto flex w-full items-center justify-between border-solid bg-transparent px-2 pt-4">
          <div className="flex items-center gap-2">
            <img
              src={theme === "dark" ? cyclops7 : cyclops8}
              alt="writality"
              width={35}
              height={35}
              className="inline-block "
            />
            <p className="text-md font-bold text-coolGrey-7 dark:text-coolGrey-4">Writality</p>
          </div>
          <div
            className="ml-auto cursor-pointer rounded-lg  border border-border p-2 dark:border-borderDark"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <IconMoon size={14} className="text-cyan-500" />
            ) : (
              <IconSun size={14} className="text-yellow-600" />
            )}
          </div>
        </nav>
        <div className="mt-12 h-full w-full">
          <div className="mx-auto flex  max-w-screen-sm grow items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={theme === "dark" ? cyclops7 : cyclops8}
                  alt="writality"
                  width={64}
                  height={64}
                  className="inline-block "
                />
              </div>
              <h1 className="mb-1 text-center text-3xl font-bold text-coolGrey-7 dark:text-coolGrey-4">
                Writality has evolved ✨
              </h1>
              <a
                href="https://writality.com"
                target="_blank"
                rel="noreferrer"
                className="mx-auto mb-12 self-center rounded bg-coolGrey-7 p-1 px-4 text-sm text-white hover:bg-coolGrey-6 dark:bg-coolGrey-1 dark:text-coolGrey-7 hover:dark:bg-coolGrey-3"
              >
                Join waiting list
              </a>
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Thank You to Our Beta Users</h2>
                <p className="mb-4">
                  Throughout the past few months development has been going on behind the scenes.
                  The vision for writality has been solidified and we're excited to share it with
                  you.
                </p>
                <p className="mb-4">
                  Writality is now a desktop app. This means that you can now write on your
                  computer, without the need to be on the internet. Additionally, we have revised
                  the design and added a few new features to make your writing experience even
                  better. Of course, the collaboration aspect of writing is still a big part of our
                  journey and we plan on incorporating it into the app in the future.
                </p>
                <h3 className="font-semibold">Key Features</h3>
                <ol className="mb-4 list-inside list-decimal">
                  <li>
                    <span className="underline">Modern UI/UX</span>
                    <p className="ml-4">
                      Writing apps have been around for a long time. They're great, but they're not
                      always the best. We're here to change that.
                    </p>
                  </li>
                  <li>
                    <span className="underline">Tracked</span>
                    <p className="ml-4">
                      It's always nice to see how far you've come. Every word is a step towards your
                      goal. You can easily track your progress and stay on top of your writing.
                    </p>
                  </li>
                  <li>
                    <span className="underline">Storyboard</span>
                    <p className="ml-4">
                      Storyboarding is a great way to plan out your writing. It's a great way to
                      visualise your ideas and get a sense of what you're working towards.
                    </p>
                  </li>
                  <li>
                    <span className="underline">Offline first</span>
                    <p className="ml-4">
                      In a world where everything is online, Writality aims to be offline first. Any
                      online aspects are optional and you can take it with your wherever you go.
                    </p>
                  </li>
                  <li>
                    <span className="underline">Version history</span>
                    <p className="ml-4">
                      Never worry about making changes. All your progress is saved and you can
                      always go back to a previous version.
                    </p>
                  </li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Why Writality Desktop?</h2>
                <p className="mb-4">
                  Starting from the ground up, Writality Desktop is to be the best writing app on
                  the market, offering a unique and distraction-free environment. With enhanced
                  features and offline first mentality. Your words are you own and you can now focus
                  on your creativity without interruptions.
                </p>
                <img
                  src={WritalityDesktop}
                  alt="Writality Desktop App"
                  className="mb-4 h-auto w-full"
                />
              </section>

              <section className="mb-12 flex flex-col">
                <h2 className="mb-4 text-2xl font-semibold">Join Our Waiting List</h2>
                <p className="mb-4">
                  We invite you to join our waiting list and be among the first to experience the
                  full power of Writality Desktop. Click the link below to secure your spot and stay
                  updated on the latest developments.
                </p>
                <a
                  href="https://writality.com"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto mt-2 self-center rounded bg-coolGrey-7 p-1 px-4 text-sm text-white hover:bg-coolGrey-6 dark:bg-coolGrey-1 dark:text-coolGrey-7 hover:dark:bg-coolGrey-3"
                >
                  Join waiting list
                </a>
              </section>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    </section>
  );
};
