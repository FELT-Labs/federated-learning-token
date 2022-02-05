import { FC } from 'react';
import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { Clock } from 'react-feather';
import { Link } from 'react-router-dom';

function isDark(color: string): boolean {
  const c = (color.charAt(0) === '#') ? color.substring(1, 7) : color;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return ((r * 0.299) + (g * 0.587) + (b * 0.114)) < 186;
}

function getColor(address: string): string {
  return `#${address.substring(2, 6)}60`;
}

interface ProjectCardProps {
  chainId: number;
  address: string;
  name: string;
  description: string;
  time: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ chainId, address, name, description, time }) => (
  <Col key={address} sm="12" md="6" lg="4" className="mb-4">
    <Card className="project-card shadow overflow-hidden border-0">
      <div
        className="d-flex align-items-center"
        style={{
          height: '8rem',
          backgroundColor: getColor(address),
        }}
      >
        <CardTitle
          tag="h2"
          className={`text-center align-middle ${isDark(getColor(address)) ? 'light' : ''}`}
          style={{ height: 'auto', width: '100%' }}
        >
          {name.length > 50 ? `${name.substring(0, 50)}...` : name}
        </CardTitle>
      </div>
      <CardBody>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          <Clock height="14" width="14" />
          <span className="align-middle" style={{ marginLeft: 8 }}>
            {new Date(time * 1000).toLocaleDateString()}
          </span>
        </CardSubtitle>
        <CardText>{description}</CardText>
        <Link to={`project/${chainId}/${address}`}>
          <Button>Details</Button>
        </Link>
      </CardBody>
    </Card>
  </Col>
);

export default ProjectCard;
