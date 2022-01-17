import { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './roadmap.css';

interface RoadmapItemProps {
  title: string;
  text: string;
}

const RoadmapItem: FC<RoadmapItemProps> = ({ title, text }) => (
  <Col lg={4} md={6} sm={12}>
    <div className="single-timeline-content">
      <div className="timeline-text">
        <h6>{title}</h6>
        <p>{text}</p>
      </div>
    </div>
  </Col>
);

const Roadmap: FC = () => (
  <Container>
    <h1 className="text-center">Our Roadmap</h1>

    <div className="apland-timeline-area">

      <div className="single-timeline-area">
        <div className="timeline-date">
          <p>Nov 2021</p>
        </div>
        <Row>
          <RoadmapItem title="Birth" text="Birth of the FELToken on Chainlink Hackathon" />
        </Row>
      </div>

      <div className="single-timeline-area">
        <div className="timeline-date">
          <p>Q1 2022</p>
        </div>
        <Row>
          <RoadmapItem title="Web App" text="Webapp for interacting with smart contracts" />
          <RoadmapItem title="Deployment to testnet" text="" />
        </Row>
      </div>

      <div className="single-timeline-area">
        <div className="timeline-date">
          <p>Q2 2022</p>
        </div>
        <Row>
          <RoadmapItem title="Testing" text="Testing and creating new Project contracts" />
          <RoadmapItem title="Integrations" text="Integrations with other platforms" />
          <RoadmapItem title="Tokenomics" text="Researching tokenomics " />
        </Row>
      </div>

      <div className="single-timeline-area">
        <div className="timeline-date">
          <p>Q3 2022</p>
        </div>
        <Row>
          <RoadmapItem title="Deployment to mainnet" text="" />
        </Row>
      </div>

    </div>
  </Container>
);

export default Roadmap;
