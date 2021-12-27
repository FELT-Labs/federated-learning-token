import React, { FC } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { BookOpen, Search } from 'react-feather';
import Features from './Features';

const About: FC = () => (
  <section
    style={{ background: 'linear-gradient(180deg, #4FABCE, rgba(67, 71, 186, 0.5)' }}
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
            <div className="btn-wrapper">
              <Button
                className="btn-icon mb-3 mb-sm-0 text-white"
                color="info"
                href="#"
                disabled
              >
                <span className="btn-inner--icon">
                  <BookOpen />
                </span>
                <span className="btn-inner--text align-middle">
                  Getting started
                </span>
              </Button>
              <Button
                className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                color="default"
                href="#"
                disabled
              >
                <span className="btn-inner--icon">
                  <Search />
                </span>
                <span className="btn-inner--text align-middle">
                  Browse projects
                </span>
              </Button>
            </div>
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
