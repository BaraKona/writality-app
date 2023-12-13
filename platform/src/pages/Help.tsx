import { IconHelp, IconBrandDiscord } from "@tabler/icons-react";

export const HelpPage = () => {
  return (
    <section className="flex h-[calc(100dvh-3.5rem)] flex-col items-center justify-center rounded-lg border border-border bg-base dark:border-borderDark dark:bg-baseDark">
      <div className="-mt-10 flex items-center gap-4">
        <IconHelp size={48} className="mt-2 animate-pulse self-start" />
        <div className="flex flex-col">
          <h1 className="text-md font-bold">Help pages...</h1>
          <p className="text-sm">
            Coming very soon... <br />
            In the meantime, you can join our Discord server for help and
            support.
          </p>
          <a
            href="https://discord.gg/nkkBJCEdGK"
            target="_blank"
            rel="noreferrer"
            className="mr-auto mt-4 flex items-center gap-2 self-start rounded-lg bg-coolGrey-1 p-3 px-6 text-sm font-medium text-coolGrey-7 transition-all duration-300 ease-in-out hover:bg-coolGrey-2 dark:bg-hoverDark dark:text-coolGrey-4 dark:hover:bg-baseDarker"
          >
            <IconBrandDiscord size={24} />
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
};
