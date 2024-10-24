import TextField from "@mui/material/TextField";
import { Box, Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import MyDatePicker from "../../components/DatePicker/DatePicker"; // Đảm bảo bạn đã có DatePicker

// Định nghĩa schema với Zod
const formDataSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    firstname: z.string().min(3, { message: "First name is required" }),
    lastname: z.string().min(3, { message: "Last name is required" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
    dob: z.date().refine((date) => dayjs().diff(date, "years") >= 16, {
      message: "You must be at least 16 years old",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmPassword: "",
    dob: dayjs().toDate(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formDataSchema),
  });

  const handleRegister = (data) => {
    const newData = { ...data, dob: formData.dob };
    console.log("Dữ liệu đăng ký:", newData);
    console.log("Lỗi:", errors);
  };

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
          <form onSubmit={handleSubmit(handleRegister)}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="firstname"
                  label="First Name"
                  error={!!errors.firstname}
                  variant="outlined"
                  {...register("firstname")}
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                />
                {errors.firstname && (
                  <Typography sx={{ color: "red" }}>
                    {errors.firstname.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="lastname"
                  label="Last Name"
                  error={!!errors.lastname}
                  variant="outlined"
                  {...register("lastname")}
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                />
                {errors.lastname && (
                  <Typography sx={{ color: "red" }}>
                    {errors.lastname.message}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* DatePicker cho ngày sinh */}
            <Box sx={{ marginTop: "20px" }}>
              <MyDatePicker
                dob={formData.dob} // Truyền giá trị dob
                setFormData={setFormData} // Truyền hàm setFormData
                setValue={setValue} // Truyền hàm setValue từ react-hook-form
              />
              {errors.dob && (
                <Typography sx={{ color: "red" }}>
                  {errors.dob.message}
                </Typography>
              )}
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <TextField
                id="email"
                label="Email"
                error={!!errors.email}
                variant="outlined"
                {...register("email")}
                value={formData.eamil}
                onChange={(e) =>
                  setFormData({ ...formData, eamil: e.target.value })
                }
              />
              {errors.username && (
                <Typography sx={{ color: "red" }}>
                  {errors.email.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <TextField
                id="password"
                label="Password"
                type="password"
                error={!!errors.password}
                {...register("password")}
                variant="outlined"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <Typography sx={{ color: "red" }}>
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginTop: "15px" }}>
              <TextField
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                {...register("confirmPassword")}
                variant="outlined"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <Typography sx={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" type="submit">
                Đăng kí
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Container>
  );
};

export default RegisterPage;
