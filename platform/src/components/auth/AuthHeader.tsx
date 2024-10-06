import { IconMoon, IconSun } from "@tabler/icons-react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { cyclops8, cyclops7 } from "../../assets/icons";

export const AuthHeader = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav className="mb-auto mr-auto mt-4 flex w-full items-center justify-between border-solid px-2">
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
  );
};
