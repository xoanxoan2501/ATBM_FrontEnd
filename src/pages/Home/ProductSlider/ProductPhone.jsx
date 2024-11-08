import React, { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './ProductPhone.css'
import CardSlider from '../Item/CardSlider/CardSlider'
import { styled } from '@mui/material'
import { authAPI } from '@/apis/authAPI'

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.customBackGround.main.toString()
}))

const ProductPhone = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [products, setProducts] = useState([])

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const productIds = [
    '68451ce6-6409-4344-aa34-27a9ac5517bb', // iPhone
    'c744ec3d-0749-4aa9-815e-afff17a1281e', // Samsung Galaxy
    '88dd42d6-75f2-4862-885b-9923c1a6c1e5', // Tai nghe
    '489db35e-ba1a-4c40-9215-d227d8c5cd2b' // Watch
  ]
  // const CardSlider = ({ image, title, description }) => (
  //   <div className="card-slider">
  //     <img src={image} alt={title} />
  //     <div className="title">{title}</div>
  //     <div className="description">{description}</div>
  //   </div>
  // );

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        productIds.map(async (id) => {
          const response = await authAPI.getDataProduct(id)

          const { name, image, description } = response.data
          return { name, image, description }
        })
      )
      setProducts(productData)
    }

    fetchProducts()
  }, [])

  const categories = ['Samsung Galaxy', 'iPhone', 'AirPod', 'Watch']

  return (
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

        {/* {loaded && instanceRef.current && instanceRef.current.track && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )} */}
      </div>
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
