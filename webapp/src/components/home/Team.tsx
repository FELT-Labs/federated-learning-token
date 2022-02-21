import { FC, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import breta from '../../assets/team/breta.jpeg';
import filip from '../../assets/team/filip.jpeg';
import mato from '../../assets/team/mato.jpeg';

interface ProfileProps {
  name: string;
  image: string;
  linkedin: string;
}

const Profile: FC<ProfileProps> = ({ name, image, linkedin }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '10px 20px 10px 20px',
        border: 0,
        background: 'none',
      }}
      href={linkedin}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={image}
        alt="profile"
        style={{
          borderRadius: 200,
          width: 200,
          height: 200,
          marginBottom: 12,
          boxShadow: hover
            ? '0 20px 60px -20px rgb(7 29 43 / 30%)'
            : 'none',
        }}
      />
      <h5>{name}</h5>
    </a>
  );
};

const Team: FC = () => {
  const bretaLinkedIn = 'https://www.linkedin.com/in/břetislav-hájek-75167111b/';
  const filipLinkedIn = 'https://www.linkedin.com/in/filip-masar-776a0a174/';
  const matoLinkedIn = 'https://www.linkedin.com/in/martin-ondejka/';

  return (
    <Container>
      <h1 className="text-center">Our Team</h1>

      <Row style={{ margin: 'auto', maxWidth: 900 }}>
        <Col md={4} xs={12}>
          <Profile name="Břetislav Hájek" image={breta} linkedin={bretaLinkedIn} />
        </Col>
        <Col md={4} xs={12}>
          <Profile name="Filip Masár" image={filip} linkedin={filipLinkedIn} />
        </Col>
        <Col md={4} xs={12}>
          <Profile name="Martin Ondejka" image={mato} linkedin={matoLinkedIn} />
        </Col>
      </Row>
    </Container>
  );
};

export default Team;
