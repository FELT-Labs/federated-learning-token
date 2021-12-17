import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { loadContract } from "../utils/contracts";
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";


function Projects() {
  const [projects, setProjects] = useState([]);
  const { library, chainId } = useWeb3React();

  useEffect(() => {
    let didCancel = false;

    async function fetchProjects() {
      if (library) {

        let manager = await loadContract(chainId, "ProjectManager", library.getSigner());
        if (manager) {
          let len = await manager.getProjectsLength();
          let _projects = [];
          for (let i = 0; i < len; i++) {
            _projects.push(await manager.projects(i));
          }

          if (!didCancel) {
            setProjects(_projects);
          }
        }
      }
    }

    fetchProjects();
    return () => { didCancel = true; };
  }, [library, chainId])

  return (
    <main>
      <Row>
        {projects.map((project) => (
          <Col sm="4">
            <Card body>
              <CardImg
                alt="Card image cap"
                src="https://picsum.photos/318/180"
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5">
                  {project}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This card has supporting text below as a natural lead-in to additional content.
                </CardText>
                <Button>
                  Button
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default Projects;