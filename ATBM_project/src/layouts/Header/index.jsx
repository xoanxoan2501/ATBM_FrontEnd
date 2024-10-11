import AppleIcon from '@mui/icons-material/Apple'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Store from './Menus/Store'
import Ipad from './Menus/Ipad'
import Airpods from './Menus/Airpods'
import Iphone from './Menus/Iphone'
import Mac from './Menus/Mac'
import Watch from './Menus/Watch'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ModeSelection from '../../components/Modeselection'

const Header = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppleIcon />
        <Store/>
        <Mac />
        <Ipad />
        <Iphone />
        <Watch />
        <Airpods />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1
      }}>
        <SearchIcon fontSize='small' />
        <LocalMallIcon fontSize='small' />
        <ModeSelection />
      </Box>
    </Box>
  )
}

export default Header