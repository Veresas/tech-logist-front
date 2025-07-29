export type Theme = 'light' | 'dark';

export const ThemeList = {
    LIGHT: 'light',
    DARK: 'dark',
  } as const;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}