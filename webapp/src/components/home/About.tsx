import React, { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Features from './Features';

const About: FC = () => (
  <section
    style={{ background: 'linear-gradient(180deg, #4FABCE, #697dcf)' }}
  >
    <Container className="py-lg d-flex">
      <div className="col px-0">
        <Row>
          <Col lg="6">
            <h1 className="display-4 text-uppercase text-bold text-white">
              Next Discovery Awaits
            </h1>
            <h2 className="text-white">Federated Learning Token</h2>
            <p className="lead text-white">
              Token for secure and anonymous federated learning. Create new
              project, provide data, develop new models and more.
            </p>
          </Col>
          <Col lg="6">
            <Features />
          </Col>
        </Row>
      </div>
    </Container>
  </section>
);

export default About;
