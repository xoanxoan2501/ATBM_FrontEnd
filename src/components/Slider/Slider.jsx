import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './Slider.css'

export default function Slider(props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel) // Cập nhật slide hiện tại
    },
    created() {
      setLoaded(true) // Khi slider được khởi tạo
    },
    loop: true, // Kích hoạt vòng lặp cho slider
    duration: 1000, // Đặt thời gian chuyển tiếp slide
  })

  const { product } = props

  // Hàm render ảnh sản phẩm
  const renderProductImages = () => {
    const images = [product.image, ...product.images.map((img) => img.url)] // Ảnh chính + ảnh phụ
    return images.map((image, index) => (
      <div key={index} className="keen-slider__slide number-slide1">
        <img src={image} alt={`product-image-${index}`} />
      </div>
    ))
  }

  const renderImagesProduct = () => {
    const images = [
      '/images/16pro.jpg',
      '/images/HOME_R12_KV_Main-KV_pc.webp',
      '/images/galaxy.jpg',
    ]
    return images.map((image, index) => (
      <div key={index} className="keen-slider__slide number-slide1">
        <img src={image} alt={`image-${index}`} />
      </div>
    ))
  }
  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider">
        {product
          ? renderProductImages() // Hiển thị ảnh sản phẩm nếu có dữ liệu
          : // Fallback khi không có sản phẩm
            //
            renderImagesProduct()}
      </div>

      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.prev() // Chuyển về slide trước
            }}
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.next() // Chuyển tới slide tiếp theo
            }}
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}

      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx) // Di chuyển tới slide chỉ định
              }}
              className={'dot' + (currentSlide === idx ? ' active' : '')}
            />
          ))}
        </div>
      )}
    </div>
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
      {props.left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
