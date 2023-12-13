import { IconBooks } from "@tabler/icons-react";

export const Stories = () => {
  return (
    <section className="flex h-[calc(100dvh-3.5rem)] items-center justify-center rounded-lg border border-border bg-base dark:border-borderDark dark:bg-baseDark">
      <div className="-mt-10 flex items-center gap-4">
        <IconBooks size={48} className="animate-pulse" />
        <div>
          <h1 className="text-md font-bold">Stories</h1>
          <p className="text-sm">Coming very soon</p>
        </div>
      </div>
    </section>
  );
};
