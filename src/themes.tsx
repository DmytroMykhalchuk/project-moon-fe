import { createTheme } from "@mui/material"
import { BLUE, WHITE, YELLOW, RED, PURPLE, BLACK,GREEN } from "./redux/appReducer"

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
            light:'#dbdb00',
            main:'#999900',
            dark:'#b5b525',
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
            light:'rgb(167 5 5)',
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
            light:'#8f1f8f',
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