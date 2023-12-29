import { createContext, useEffect, useMemo, useState } from "react"

export let ColorMode;

(function(ColorMode) {
  ColorMode["light"] = "light"
  ColorMode["dark"] = "dark"
})(ColorMode || (ColorMode = {}))

export const ThemeContext = createContext({
  colorMode: ColorMode.light,
  setColorMode: () => {}
})

export const ThemeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(ColorMode.light)
  const colorModeKey = "@app/colorMode"

  useEffect(() => {
    const savedColorMode = localStorage.getItem(colorModeKey)
    if (savedColorMode) setColorMode(savedColorMode)
  }, [])

  useEffect(() => {
    localStorage.setItem(colorModeKey, colorMode)
    if (!document) return
    colorMode === ColorMode.dark
      ? document.documentElement.classList.add(ColorMode.dark)
      : document.documentElement.classList.remove(ColorMode.dark)
  }, [colorMode])

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          colorMode,
          setColorMode
        }),
        [colorMode]
      )}
    >
      {children}
    </ThemeContext.Provider>
  )
}
