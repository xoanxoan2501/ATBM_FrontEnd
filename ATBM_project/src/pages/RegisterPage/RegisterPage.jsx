import TextField from "@mui/material/TextField";
import { Box, Container, Typography } from "@mui/material";

import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import SelectRadio from "../../components/SelectRadio/SelectRadio";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import MyDatePicker from "../../components/DatePicker/DatePicker";
import CountrySelection from "../../components/CountrySelection/CountrySelection";
const RegisterPage = (props) => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "32px",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          TẠO TÀI KHOẢN APPLE
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          Chỉ cần có một Tài khoản Apple để truy cập vào tất cả dịch vụ của
          Apple.
        </Typography>
        <Container sx={{ width: "48%" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <TextField id="outlined-basic" label="Họ" variant="outlined" />
            <TextField id="outlined-basic" label="Tên" variant="outlined" />
          </Box>
          <Box
            sx={{
              marginTop: "32px",
              width: "100%",
            }}
          >
            <CountrySelection />
            <MyDatePicker />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              gap: 2,
              marginBottom: "20px",
            }}
          >
            <hr></hr>
            <Box sx={{ gap: 2, marginTop: "15px", marginBottom: "20px" }}>
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Tên người dùng"
                variant="outlined"
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                Đây sẽ là Tài khoản Apple mới của bạn.
              </Typography>
            </Box>
            <Box>
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Mật Khẩu"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                marginTop: "15px",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Nhập lại mật khẩu"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box sx={{ gap: "20px" }}>
            <hr style={{ margin: "10px 0px 15px 0px" }}></hr>
            <Box>
              <TextField
                sx={{
                  width: "100%",
                  marginTop: "20px",
                }}
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
              />
              <Typography
                sx={{
                  marginTop: "15px",
                }}
              >
                Nhập số điện thoại bạn chắc chắn luôn có thể truy cập. Số này sẽ
                được sử dụng để xác minh nhận dạng của bạn mỗi khi bạn đăng nhập
                trên một thiết bị mới hoặc trình duyệt web. Bạn có thể mất phí
                tin nhắn hoặc dữ liệu.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Xác minh với</Typography>
            {SelectRadio()}
          </Box>
          <Box sx={{ gap: 2, marginBottom: "15px" }}>
            <hr></hr>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Các thông báo"
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  marginLeft: "30px",
                }}
              >
                Nhận email và thông tin của Apple như thông báo, quảng cáo, gợi
                ý và cập nhật về các sản phẩm, dịch vụ, phần mềm của Apple.
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Ứng Dụng, Nhạc, TV Và Nhiều Hơn Nữa"
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  marginLeft: "30px",
                }}
              >
                Nhận email và thông tin của Apple như các phát hành mới, nội
                dung độc quyền, ưu đãi đặc biệt, quảng cáo và gợi ý cho ứng
                dụng, nhạc, phim, TV, sách, podcast và nhiều hơn nữa.
              </Typography>
            </FormGroup>
          </Box>
          <Box sx={{ margin: "10px 0px 20px 0px" }}>
            <hr></hr>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <HandshakeOutlinedIcon sx={{ fontSize: "30px" }} />
              <Typography sx={{ fontSize: "13px", marginTop: "20px" }}>
                Thông tin về Tài khoản Apple của bạn được sử dụng để cho phép
                bạn đăng nhập an toàn và truy cập vào dữ liệu của mình. Apple
                ghi lại một số dữ liệu nhất định cho mục đích bảo mật, hỗ trợ,
                và báo cáo. Nếu đồng ý, Apple cũng có thể sử dụng thông tin Tài
                khoản Apple của bạn để gửi email và thông tin quảng cáo, dựa
                trên cách bạn sử dụng những dịch vụ của Apple.
              </Typography>
            </Box>
            <hr></hr>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="contained">Tiếp tục</Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default RegisterPage;
