import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import jobIcon from '../../assets/img/1.png';
import postIcon from '../../assets/img/2.png';
import marketIcon from '../../assets/img/3.png';

const HowToGetStarted = () => {
    return (
        <section className="pt-4 pb-5 how-to-get">
            <Container className="text-center">
                <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <h2 className="fw-bold mb-3">How To Get Started</h2>
                    <p className="mb-4">
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse<br />
                        quam nihil molestiae consequatur
                    </p>
                </div>

                {/* ✅ 2 Cards per Row (md={6}) */}
                <Row className="g-4 mx-5 justify-content-center">
                    <Col md={6} lg={4} className="wow fadeInUp" data-wow-delay="0.1s">
                        <Card className="step-card step-one h-100 border-0">
                            <Card.Body className="pt-5">
                                <img src={jobIcon} alt="Job Icon" width="80" className="mb-4" />
                                <h5 className="fw-bold my-3">Looking for Jobs?</h5>
                                <Card.Text className="mb-4">
                                    But must expla to you how all this mistaken idea of denouncing pleure
                                    and praising pain was born
                                </Card.Text>
                                <Button href="#" className="btn btn-primary">Apply job →</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4} className="wow fadeInUp" data-wow-delay="0.3s">
                        <Card className="step-card step-two h-100 border-0">
                            <Card.Body className="pt-5">
                                <img src={postIcon} alt="Post Icon" width="80" className="mb-4" />
                                <h5 className="fw-bold my-3">Post Your Jobs</h5>
                                <Card.Text className="mb-4">
                                    But must expla to you how all this mistaken idea of denouncing pleure
                                    and praising pain was born
                                </Card.Text>
                                <Button href="#" className="btn btn-primary">Post jobs →</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4} className="wow fadeInUp" data-wow-delay="0.5s">
                        <Card className="step-card step-three h-100 border-0">
                            <Card.Body className="pt-5">
                                <img src={marketIcon} alt="Market Data Icon" width="80" className="mb-4" />
                                <h5 className="fw-bold my-3">Job Market Data</h5>
                                <Card.Text className="mb-4">
                                    But must expla to you how all this mistaken idea of denouncing pleure
                                    and praising pain was born
                                </Card.Text>
                                <Button href="#" className="btn btn-primary">Know more →</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HowToGetStarted;
