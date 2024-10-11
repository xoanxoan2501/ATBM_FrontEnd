import Header from './Header'
import Footer from './Footer'
import Container from '@mui/material/Container'


const DefaultLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}

export default DefaultLayout