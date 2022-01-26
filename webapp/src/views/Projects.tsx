import { FC, useState, useEffect } from 'react';
import { Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { hooks } from '../connectors/metaMask';
import { loadContract } from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import ProjectCard from '../components/project/ProjectCard';

type ProjectType = [string, string, string, number];

const Projects: FC = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const { useChainId, useProvider } = hooks;

  const provider = useProvider();
  const chainId = useChainId();

  useEffect(() => {
    let didCancel = false;

    async function fetchProjects() {
      const newProjects = [];

      if (provider && chainId) {
        const manager = await loadContract(chainId, 'ProjectManager', provider.getSigner());
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
  }, [provider, chainId]);

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs title="All Projects" />
        <Button color="default" outline to="/app/create-project" tag={Link} style={{ marginRight: 40 }}>
          Create Project
        </Button>
      </div>

      <Row className="px-3">
        {projects.map(([address, name, description, time]) => (
          <ProjectCard address={address} name={name} description={description} time={time} key={address} />
        ))}
      </Row>
    </main>
  );
};

export default Projects;
