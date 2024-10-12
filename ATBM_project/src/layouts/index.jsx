import Header from './Header/Header'
import Footer from './Footer/Footer'
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