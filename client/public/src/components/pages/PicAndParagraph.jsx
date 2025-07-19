import { lazy, memo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { LazyCarouselItem, LazyCarousel, LazyCarouselCaption } from "../../suspense/Carousel";


function DisplayPicAndParagraph(props) {

    return <Row className='detailRow'>
        <Col sm={12} md={{span:6, order: props.putImgLeft? 'first':'last'}} className="d-flex justify-content-center">
        <Card>
            <LazyCarousel 
                interval={props.autoplay? 4000:null}
                fallback={<img src={props.img[0].src} alt={props.img[0].alt} className="detailImg" loading="lazy" />}
            >
                {props.img.map(cur => <LazyCarouselItem key={cur.caption}>
                    <img src={cur.src} alt={cur.alt} className="detailImg" loading="lazy" />
                    <LazyCarouselCaption style={cur?.style}>
                        {cur.caption}
                    </LazyCarouselCaption>
                </LazyCarouselItem>)}
            </LazyCarousel>
        </Card>
        </Col>
        <Col sm={12} md={{span:6, order: props.putImgLeft? 'last':'first'}} className="d-flex justify-content-center">
            <p className='center detailParagraphs'>
                {props.paragraph}
            </p>
        </Col>
    </Row>
}

const PicAndParagraph = memo(DisplayPicAndParagraph, (prev, next) => {

    if (prev.paragraph != next.paragraph || prev.putImgLeft != next.putImgLeft || prev.img.length != next.img.length || prev.autoplay != next.autoplay) {
        return false;
    }
    if (prev.img === next.img) {
        return true;
    }
    for (let i=0; i<prev.img.length; ++i) {
        if (prev.img[i] != next.img[i]) {
            return false;
        }
    }
    return true;
});
export default PicAndParagraph;