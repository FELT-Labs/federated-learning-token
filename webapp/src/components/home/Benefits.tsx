import { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Card from '../Card';
import anonymousIcon from '../../assets/icons/anonymous.png';
import accountableIcon from '../../assets/icons/accountable.png';
import encryptedIcon from '../../assets/icons/encrypted.png';

const Benefits: FC = () => {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Benefits</h1>
      <Row>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            title="Anonymous"
            text="Nodes doesn’t need to run server with public API which minimize possible attacks"
            icon={
              <img src={anonymousIcon} alt="anonymous" width={40} height={40} />
            }
          />
        </Col>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            title="Accountable"
            text="Nodes receive rewards for active participation. At same time they can vote and penalize bad behavior of other nodes"
            icon={
              <img
                src={accountableIcon}
                alt="accountable"
                width={40}
                height={40}
              />
            }
          />
        </Col>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            title="Encrypted"
            text="Using Diffie-Hellman protocol to share common secret between nodes."
            icon={
              <img src={encryptedIcon} alt="encrypted" width={40} height={40} />
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Benefits;
