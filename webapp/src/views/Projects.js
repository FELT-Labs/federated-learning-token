import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { loadContract } from "../utils/contracts";
import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { Clock } from "react-feather";
import { Link } from "react-router-dom";


function Projects() {
  const [projects, setProjects] = useState([]);
  const { library, chainId } = useWeb3React();

  useEffect(() => {
    let didCancel = false;

    async function fetchProjects() {
      let _projects = [];

      if (library) {
        let manager = await loadContract(chainId, "ProjectManager", library.getSigner());
        if (manager) {
          let len = await manager.getProjectsLength();
          for (let i = 0; i < len && !didCancel; i++) {
            try {
              let project = await manager.projects(i);
              _projects.push(project);
            } catch (e) {
              console.log(e);
            }
          }
        }
      }

      if (!didCancel) {
        setProjects(_projects);
      }
    }

    fetchProjects();
    return () => { didCancel = true; };
  }, [library, chainId])

  return (
    <main className="p-3">
      <Row>
        {projects.map(([address, name, description, time]) => (
          <Col key={address} sm="12" md="6" lg="4" className="mb-4">
            <Card className="shadow overflow-hidden border-0">
              <div className="d-flex align-items-center"
                style={{
                  height: "8rem",
                  backgroundColor: `#${address.substr(2, 6)}60`
                }}
              >
                <CardTitle tag="h2"
                  className="text-center align-middle"
                  style={{ height: "auto", width: "100%" }}
                >
                  {(name.length > 50) ? name.substr(0, 50) + "..." : name}
                </CardTitle>
              </div>
              <CardBody>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <Clock height="14" width="14" /> <span className="align-middle">{new Date(time * 1000).toLocaleDateString()}</span>
                </CardSubtitle>
                <CardText>
                  {description}
                </CardText>
                <Link to={"project/" + address}>
                <Button>
                  Details
                </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default Projects;