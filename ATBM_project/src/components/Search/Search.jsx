import { Box, Grid, TextField, Button } from '@mui/material'
import CardProduct from '../CardProduct/CardProduct'

const Search = () => {
  return (
    <Box>
      <TextField
        sx={{ width: '100%' }}
        label="Search"
        variant="standard"
      />
      <Button variant="contained" color="primary">Search</Button>
      <Box sx={{ marginTop: '10px' }}>

      </Box>
    </Box>
  )
}

export default Search