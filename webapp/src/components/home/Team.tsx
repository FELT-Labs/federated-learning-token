import { FC, useState } from 'react';
import { Container } from 'reactstrap';
import breta from '../../assets/team/breta.jpeg';
import filip from '../../assets/team/filip.jpeg';

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
        margin: '0 20px 0 20px',
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

  return (
    <Container>
      <h1 className="text-center">Our Team</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Profile name="Břetislav Hájek" image={breta} linkedin={bretaLinkedIn} />
        <Profile name="Filip Masár" image={filip} linkedin={filipLinkedIn} />
      </div>
    </Container>
  );
};

export default Team;
