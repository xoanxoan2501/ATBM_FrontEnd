import React from "react";
import { Container, Paper, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import Slider from "../../components/Slider/Slider";

const useStyles = makeStyles((theme) => ({
  left: {
    width: "50%",
  },
  right: {
    flex: "1 1 0",
  },
}));
const MobileDetail = () => {
  const classes = useStyles();
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <Slider
                url1="/images/image-removebg-preview-12.png"
                url2="/images/image-removebg-preview-12.png"
                url3="/images/image-removebg-preview-12.png"
              />
            </Grid>
            <Grid item className={classes.left}>
              Product Info
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
export default MobileDetail;