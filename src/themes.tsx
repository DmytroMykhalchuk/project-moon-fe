import { createTheme } from "@mui/material"
import { BLUE, WHITE, YELLOW, RED, PURPLE, BLACK } from "./redux/appReducer"

export const THEME = 'theme'

export const themes = {
   [THEME + WHITE]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
   [THEME + BLACK]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
   [THEME + BLUE]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
   [THEME + YELLOW]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
   [THEME + RED]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
   [THEME + PURPLE]: createTheme({
      palette: {
         mode: "dark",
         background: {
            // default: "#333",
            paper: "#333",
         },
         primary: {
            main: '#fff'
         },
         //@ts-ignore
         fpage: {
            main: "#EF8B6B",
            light: "#262335",
         },
      },
   }),
}