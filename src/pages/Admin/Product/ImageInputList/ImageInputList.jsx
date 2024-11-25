import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'

function ImageInputList({ images, setImages }) {
  const [randomImages, setRandomImages] = useState([])

  // Chọn 4 hình ảnh ngẫu nhiên
  const getRandomImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5) // Trộn ngẫu nhiên
    setRandomImages(shuffled.slice(0, 4)) // Lấy 4 hình ảnh đầu tiên sau khi trộn
  }

  useEffect(() => {
    getRandomImages()
  }, [images]) // Cập nhật random images mỗi khi images thay đổi

  const handleImageChange = (index, value) => {
    if (value.trim()) {
      // Cập nhật URL nếu không trống
      const updatedImages = [...images]
      updatedImages[index] = value
      setImages(updatedImages)
    }
  }

  const handleAddImageField = () => {
    setImages([...images, ''])
  }

  const handleRemoveImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }

  return (
    <div>
      {/* Hiển thị 4 hình ảnh ngẫu nhiên theo hàng ngang */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
        {randomImages.map((image, index) => (
          <div key={index} style={{ marginRight: '8px', marginBottom: '8px' }}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Hiển thị các trường nhập URL hình ảnh */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <TextField
            margin="dense"
            label={`Image URL ${index + 1}`}
            type="text"
            fullWidth
            value={image}
            onChange={(event) => handleImageChange(index, event.target.value)}
          />
          <button
            onClick={() => handleRemoveImageField(index)}
            style={{ marginLeft: '8px' }}
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={handleAddImageField} style={{ marginTop: '8px' }}>
        Add Image
      </button>
    </div>
  )
}

export default ImageInputList
