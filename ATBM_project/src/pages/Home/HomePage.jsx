import { BottomNavigation, Box, Container } from "@mui/material";
import React from "react";
import Slider from "../../components/Slider/Slider";
import ProductSlider from "./ProductSlider/ProductSlider";
import ProductPhone from "./ProductSlider/ProductPhone";
import TVandRadio from "./ProductSlider/TVandRadio/TVandRadio";

export default function HomePage() {
  return (
    // * code cho phan body
    <Container>
      {/* //* phan nay cho slider */}
      <Box sx={{ marginTop: "10px" }}>
        <Slider />
      </Box>
      {/* //* code cho phan san pham noi bat */}
      <Box>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          SẢN PHẨM NỔI BẬT
        </h1>
        <Box>
          <ProductSlider />
        </Box>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          MOBILE & COMPUTING
        </h1>
        <Box>
          <ProductPhone />
        </Box>
        <Box sx={{ position: "relative" }}>
          {" "}
          {/* Thêm position: relative cho box chứa TVandRadio */}
          <h1
            style={{
              position: "absolute", // Đặt vị trí chữ
              top: "20px", // Điều chỉnh khoảng cách từ trên xuống
              left: "50%", // Căn giữa theo chiều ngang
              transform: "translateX(-50%)", // Điều chỉnh để chữ nằm giữa
              zIndex: 10, // Đảm bảo chữ nằm trên TVandRadio
              color: "Black", // Đặt màu chữ cho dễ nhìn
            }}
          >
            TV And Radio
          </h1>
          <Box>
            <TVandRadio />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
