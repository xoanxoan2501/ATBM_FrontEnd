import { Typography, Box, Container, Grid, Paper } from '@mui/material'

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: '20px'

        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom:'10px' }}>
                    GIỚI THIỆU VỀ HỆ THỐNG APPLE
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555' }}>
                Apple luôn không ngừng cải tiến và nâng cao chất lượng sản phẩm để mang lại trải nghiệm tốt nhất cho khách hàng.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop:'10px' }}>
                            Sứ mệnh
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', padding:'0px 10px 10px 10px' }}>
                        Apple cam kết mang đến cho khách hàng không chỉ các sản phẩm điện tử và gia dụng hiện đại, mà còn là dịch vụ hậu mãi tận tâm và đáng tin cậy. Chúng tôi luôn chú trọng lắng nghe và hiểu rõ nhu cầu của từng khách hàng, từ đó cung cấp giải pháp tối ưu giúp họ nâng cao chất lượng cuộc sống, tận hưởng công nghệ một cách trọn vẹn và bền vững.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop:'10px' }}>
                        Sản Phẩm Đa Dạng
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', padding:'0px 10px 10px 10px' }}>
                        Hệ thống sản phẩm tại Apple rất phong phú, từ các thiết bị điện tử gia dụng như máy giặt, tủ lạnh, điều hòa, đến những sản phẩm công nghệ cao như điện thoại, laptop, máy tính bảng, và các phụ kiện điện tử khác. Apple hợp tác với nhiều thương hiệu uy tín hàng đầu thế giới, đảm bảo mọi sản phẩm đều đạt chuẩn chất lượng và có nguồn gốc rõ ràng.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop:'10px' }}>
                        Dịch Vụ Hậu Mãi
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', padding:'0px 10px 10px 10px' }}>
                        Bên cạnh việc bán các sản phẩm chất lượng, Apple luôn chú trọng đến dịch vụ hậu mãi. Với đội ngũ kỹ thuật viên chuyên nghiệp, chúng tôi đảm bảo cung cấp dịch vụ bảo hành, sửa chữa và hỗ trợ kỹ thuật tận tâm nhất. Khách hàng có thể an tâm khi mua sắm tại Apple vì chúng tôi luôn đồng hành cùng khách hàng trong suốt quá trình sử dụng sản phẩm.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop:'10px' }}>
                        Cam Kết với Khách Hàng
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', padding:'0px 10px 10px 10px' }}>
                        Chúng tôi hiểu rằng sự hài lòng của khách hàng là thành công lớn nhất của mình. Vì vậy, Apple cam kết mang đến dịch vụ chăm sóc khách hàng tận tình, chính sách đổi trả linh hoạt, và các chương trình khuyến mãi hấp dẫn nhằm giúp khách hàng tiết kiệm chi phí nhưng vẫn sở hữu được sản phẩm chất lượng cao.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: 'center',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
        <Box
          sx={{
            padding: '10px'
          }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
                    Hàng hóa vô cùng phong phú, đa dạng
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '10px'
          }}>
          <Typography variant="body2" sx={{ color: '#555' }}>
                        Hàng hoá tại Apple vô cùng đa dạng, từ các nhóm hàng lớn như Tivi, Tủ Lạnh, Máy Giặt, Máy Lạnh… đến các nhóm hàng Gia dụng như: Nồi Cơm Điện, Bếp Ga, Bếp Điện Từ… Apple cũng kinh doanh các mặt hàng như: Điện Thoại, Máy Tính Bảng, Laptop, Phụ Kiện…
          </Typography>
        </Box>


      </Box>
    </Container>
  )
}

export default About
