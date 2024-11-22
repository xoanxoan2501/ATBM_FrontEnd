import React, { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './ProductPhone.css'
import CardSlider from '../Item/CardSlider/CardSlider'
import { styled } from '@mui/material'
import { authAPI } from '@/apis/authAPI'

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.customBackGround.main.toString(),
}))

const ProductPhone = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true) // Trạng thái loading

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const productIds = [
    '93dcff86-3d49-46c4-b646-7b032727d6ee', // iPhone
    '86140e42-eda9-4e3b-ac57-a1195e17e2cd', // Samsung Galaxy
    'e9efc95b-b1a8-4879-a52c-2803ff2d5932', // Tai nghe
    '21fb8977-54fa-4dc9-b0d9-9fcfc9264d70', // Watch
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true) // Bắt đầu tải
        const productData = await Promise.all(
          productIds.map(async (id) => {
            const response = await authAPI.getDataProduct(id)
            const { name, image, description } = response.data
            return { name, image, description }
          })
        )
        setProducts(productData)
      } catch (error) {
        console.error('Lỗi tải sản phẩm:', error)
      } finally {
        setLoading(false) // Kết thúc tải
      }
    }

    fetchProducts()
  }, [])

  const categories = ['Samsung Galaxy', 'iPhone', 'AirPod', 'Watch']

  return (
    <>
      {loading ? ( // Hiển thị thông báo khi đang tải
        <div className="loading-message">Đang tải dữ liệu...</div>
      ) : (
        <>
          {loaded && instanceRef.current && (
            <div className="category-titles">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={`category-title ${currentSlide === idx ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="navigation-wrapper">
            <StyledDiv ref={sliderRef} className="keen-slider">
              {products.map((product, index) => (
                <div className="keen-slider__slide" key={index}>
                  <CardSlider
                    className={currentSlide === index ? 'show' : ''}
                    image={product.image}
                    title={product.name}
                    description={product.description}
                  />
                </div>
              ))}
            </StyledDiv>
          </div>
        </>
      )}
    </>
  )
}

function Arrow(props) {
  const disabled = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.3s39 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

export default ProductPhone
