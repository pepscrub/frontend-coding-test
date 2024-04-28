import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface Context {
  backgroundColor: string;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}
interface Props extends PropsWithChildren {}

const context = createContext<Context | undefined >(undefined);

export const DarkModeController: FC<Props> = ({
  children
}) => {
  const { theme, systemTheme } = useTheme()
  const [isDark, setIsDark] = useState(theme === 'dark' || (theme === 'system' && systemTheme === 'dark'));
  const [backgroundColor, setBackgroundColor] = useState(isDark ? '#171e25' : '#1f2f40');

  useEffect(() => {
    const isCurrentDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
    setIsDark(isCurrentDark)
    setBackgroundColor(isCurrentDark ? '#171e25' : '#1f2f40');
  }, [theme]);


  return (
    <context.Provider
      value={{
        backgroundColor,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </context.Provider>
  )
}

// Purposefully ignoring fast-refresh (isn't applicable here)
// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = (): Context => {
  const name = DarkModeController.name;
  const data = useContext(context);
  if (!data) throw new Error(`Missing ${name} in tree above ${name}`);
  return data;
}