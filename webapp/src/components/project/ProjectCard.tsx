import { FC } from 'react';
import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { Clock } from 'react-feather';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  address: string;
  name: string;
  description: string;
  time: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ address, name, description, time }) => (
  <Col key={address} sm="12" md="6" lg="4" className="mb-4">
    <Card className="shadow overflow-hidden border-0">
      <div
        className="d-flex align-items-center"
        style={{
          height: '8rem',
          backgroundColor: `#${address.substring(2, 6)}60`,
        }}
      >
        <CardTitle
          tag="h2"
          className="text-center align-middle"
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
        <Link to={`project/${address}`}>
          <Button>Details</Button>
        </Link>
      </CardBody>
    </Card>
  </Col>
);

export default ProjectCard;
