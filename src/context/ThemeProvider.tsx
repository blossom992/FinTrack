import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { Theme } from "./ThemeContext"
import { ThemeContext } from "./ThemeContext"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("fintrack-theme")

    if (savedTheme === "dark") {
      return "dark"
    }

    return "light"
  })

  useEffect(() => {
    localStorage.setItem("fintrack-theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}