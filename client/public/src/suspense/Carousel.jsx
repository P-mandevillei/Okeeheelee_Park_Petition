import React, { Suspense, lazy } from 'react'

const Carousel = lazy(() => import('react-bootstrap/Carousel'))
export const LazyCarouselItem = lazy(() => import('react-bootstrap/CarouselItem'))
export const LazyCarouselCaption = lazy(() => import('react-bootstrap/CarouselCaption'))

export function LazyCarousel(props) {
    return <Suspense fallback={props.fallback}>
        <Carousel {...props} >
            {props.children}
        </Carousel>
    </Suspense>
}