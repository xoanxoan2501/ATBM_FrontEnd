import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, TextField } from '@mui/material'
import dayjs from 'dayjs'

export default function MyDatePicker({ dob, setFormData, setValue }) {
  const handleDateChange = (newValue) => {
    if (newValue && dayjs(newValue).isValid()) {
      const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
      setFormData((prev) => ({ ...prev, dob: formattedDate })) // Cập nhật state với định dạng YYYY-MM-DD
      setValue('dob', newValue.toDate()) // Đặt lại giá trị ngày vào form dưới dạng date
    } else {
      setFormData((prev) => ({ ...prev, dob: '' }))
      setValue('dob', null) // Đặt lại giá trị ngày khi không hợp lệ
    }
  }

  return (
    <Box sx={{ marginTop: '10px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            value={dob ? dayjs(dob) : null} // Đảm bảo dob được chuyển sang đối tượng dayjs
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} label="Ngày sinh" />
            )} // Hiển thị label cho DatePicker
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}
