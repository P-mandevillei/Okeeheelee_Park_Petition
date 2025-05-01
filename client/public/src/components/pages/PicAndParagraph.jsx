import { memo } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";

function DisplayPicAndParagraph(props) {

    return <Row className='detailRow'>
        <Col sm={12} md={{span:6, order: props.putImgLeft? 'first':'last'}} className="d-flex justify-content-center">
        <Card>
            <Carousel>
                {props.img.map(cur => <Carousel.Item key={cur.caption}>
                    <img src={cur.src} alt={cur.alt} className="detailImg" />
                    <Carousel.Caption style={cur?.style}>
                        {cur.caption}
                    </Carousel.Caption>
                </Carousel.Item>)}
            </Carousel>
        </Card>
        </Col>
        <Col sm={12} md={{span:6, order: props.putImgLeft? 'last':'first'}} className="d-flex justify-content-center">
            <p className='center detailParagraphs'>
                {props.paragraph}
            </p>
        </Col>
    </Row>
}

const PicAndParagraph = memo(DisplayPicAndParagraph);
export default PicAndParagraph;