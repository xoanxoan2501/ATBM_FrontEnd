import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// `extendTheme` is a new API
const theme = extendTheme({
  colorSchemes: {
    light: { // palette for light mode
      palette: {},
      text:{
          main:'black',
      }
    },
    dark: { // palette for dark mode
      palette: {},
      text:{
          main:'white',
      }
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          color: ({theme}) => theme.palette.text.main
      },
    },
  },

})
export default theme
