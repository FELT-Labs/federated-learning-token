import { FC, useState, useEffect } from 'react';
import { Row, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import { loadContract } from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import ProjectCard from '../components/project/ProjectCard';
import { Project } from '../utils/contractTypes';
import { hooks } from '../connectors/priorityConnector';

const { usePriorityChainId, usePriorityProvider } = hooks;

const Projects: FC = () => {
  const [projects, setProjects] = useState<Array<Project>>([]);

  const provider = usePriorityProvider();
  const chainId = usePriorityChainId();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;

    async function fetchProjects() {
      setLoading(true);
      const newProjects = [];

      if (provider && chainId) {
        const manager = await loadContract(chainId, 'ProjectManager', provider);
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
      setLoading(false);
    }

    fetchProjects();
    return () => {
      didCancel = true;
    };
  }, [provider, chainId]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs title="All Projects" />
        <Button color="default" outline to="/app/create-project" tag={Link} style={{ marginRight: 40 }}>
          Create Project
        </Button>
      </div>

      <Row className="px-3">
        {chainId && projects.map(([address, name, description, time]) => (
          <ProjectCard
            chainId={chainId}
            address={address}
            name={name}
            description={description}
            time={time}
            key={address}
          />
        ))}
      </Row>

      {loading && <Spinner />}
    </>
  );
};

export default Projects;
