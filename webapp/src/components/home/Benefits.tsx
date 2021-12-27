import { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { EyeOff, Lock } from 'react-feather';
import Card from '../Card';
import { ReactComponent as AccountableSVG } from '../../assets/icons/accountable.svg';

const Benefits: FC = () => (
  <Container>
    <h1 style={{ textAlign: 'center' }}>Benefits</h1>
    <Row>
      <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          title="Anonymous"
          text="Nodes doesn’t need to run server with public API which minimize possible attacks"
          icon={<EyeOff width={40} height={40} color="#1c70c5" />}
        />
      </Col>
      <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          title="Accountable"
          text="Nodes receive rewards for active participation. At same time they can vote and penalize bad behavior of other nodes"
          icon={<AccountableSVG width={40} height={40} fill="#0074a2" />}
        />
      </Col>
      <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          title="Encrypted"
          text="Using Diffie-Hellman protocol to share common secret between nodes."
          icon={<Lock width={40} height={40} color="#479da2" />}
        />
      </Col>
    </Row>
  </Container>
);

export default Benefits;
