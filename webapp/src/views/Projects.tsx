import { FC, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import { Clock } from 'react-feather';
import { Link } from 'react-router-dom';

import { loadContract } from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';

type ProjectType = [string, string, string, number];

const Projects: FC = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const { library, chainId } = useWeb3React();

  useEffect(() => {
    let didCancel = false;

    async function fetchProjects() {
      const newProjects = [];

      if (library && chainId) {
        const manager = await loadContract(
          chainId,
          'ProjectManager',
          library.getSigner(),
        );
        if (manager) {
          const len = await manager.getProjectsLength();
          for (let i = 0; i < len && !didCancel; i++) {
            newProjects.push(manager.projects(i));
          }
        }
      }

      if (!didCancel) {
        setProjects(await Promise.all(newProjects));
      }
    }

    fetchProjects();
    return () => {
      didCancel = true;
    };
  }, [library, chainId]);

  return (
    <main>
      <Row className="m-0">
        <Breadcrumbs title="All Projects" />
        <Col className="d-flex align-items-center">
          <Button color="default" outline to="/app/create-project" tag={Link}>
            Create Project
          </Button>
        </Col>
      </Row>
      <Row className="px-3">
        {projects.map(([address, name, description, time]) => (
          <Col key={address} sm="12" md="6" lg="4" className="mb-4">
            <Card className="shadow overflow-hidden border-0">
              <div
                className="d-flex align-items-center"
                style={{
                  height: '8rem',
                  backgroundColor: `#${address.substr(2, 6)}60`,
                }}
              >
                <CardTitle
                  tag="h2"
                  className="text-center align-middle"
                  style={{ height: 'auto', width: '100%' }}
                >
                  {name.length > 50 ? `${name.substr(0, 50)}...` : name}
                </CardTitle>
              </div>
              <CardBody>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <Clock height="14" width="14" />{' '}
                  <span className="align-middle">
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
        ))}
      </Row>
    </main>
  );
};

export default Projects;
