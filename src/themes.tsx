import { createTheme } from "@mui/material"
import { BLUE, WHITE, YELLOW, RED, PURPLE, BLACK,GREEN } from "./redux/appReducer"

export const THEME = 'theme'
export const BACKGROUND_COLOR_CARDS='#2e2e2ec9'
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
            main: "#fff",
            dark: "#ccc",
         },
         bgmode:{
            light:'#fff',
            main:'#bdbdbd',
            dark:'#787878',
            circle:'#1e1e1e'
         }
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
            main: "#fff",
            dark: "#ccc",
         },
         bgmode:{
            light:'#05bad7',
            main:'#058397',
            dark:'#006574',
            circle:'#fff'
         }
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
            main: "#fff",
            dark: "#ccc",
         },
         bgmode:{
            light:'#f9f900',
            main:'#999900',
            dark:'#e34f00',
            circle:'#fff'
         }
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
            main: "#fff",
            dark: "#ccc",
         },
         bgmode:{
            light:'rgb(203 0 0)',
            main:'rgb(153 28 28)',
            dark:'rgb(74 0 0)',
            circle:'#fff'
         }
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
            main: "#fff",
            light: "#262335",
         },
         bgmode:{
            light:'#d728d7',
            main:'#700170',
            dark:'#4e014e',
            circle:'#fff'
         }
      },
   }),
   [THEME + GREEN]: createTheme({
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
            main: "#fff",
            light: "#262335",
         },
         bgmode:{
            light:'#7fff00',
            main:'#499300',
            dark:'#408100',
            circle:'#fff'
         }
      },
   }),
}