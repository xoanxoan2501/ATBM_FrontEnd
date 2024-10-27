import React from "react";
import { Container, Paper, Grid, Box, Chip, Typography } from "@mui/material";
import {Card, CardContent, CardActionArea} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { styled } from "@mui/system";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import Slider from "../../components/Slider/Slider";
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';

const useStyles = makeStyles((theme) => ({
  left: {
    width: "50%",
  },
  right: {
    flex: "1 1 0",
  },
}));
const NewChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "#1e88e5", // Màu xanh cho chip "Mới"
  color: "#fff",
  fontWeight: "bold",
  zIndex: 2, // Đảm bảo chip luôn nằm trên cùng
}));

const MobileDetail = (props) => {
  const classes = useStyles();
  return (
    <>
      <HeaderNavigation />
      <Box>
        <Container maxWidth="lg">
          <Paper elevation={0}>
            <Grid container spacing={2}>
              <Grid item className={classes.left}>
                <Box position="relative">
                  <Slider
                    url1="/images/image-removebg-preview-12.png"
                    url2="/images/image-removebg-preview-12.png"
                    url3="/images/image-removebg-preview-12.png"
                  />              
                </Box>
              </Grid>

              <Grid item className={classes.right}>
                <Box >
                  <h2>IPHONE 13</h2>
                    <p>- Thanh toán trước ưu đãi đến 8% tối đa 1 triệu</p>
                    <p>- Màn hình Super Retina XDR</p>
                    <p>- Hệ thống camera kép 12MP: Camera Chính và Ultra Wide</p>
                    <p>- Chip A15 Bionic</p>
                  <h3>Màu sắc</h3>
                  <ul>
                    <li className='color-item' id='pink'></li>
                    <li className='color-item' id='green'></li>
                    <li className='color-item' id='black'></li>
                    <li className='color-item' id='white'></li>
                    <li className='color-item' id='blue'></li>
                  </ul>
                  <h3>Price</h3>
                  <Box>
                    <span className='down'>-</span>
                    <input type='text' value='0'></input>
                    <span className='up'>+</span>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
export default MobileDetail;
