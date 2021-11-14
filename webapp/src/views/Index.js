import React, {Component} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import {BookOpen, Search} from "react-feather";

// core components
import MainNavbar from "../components/navbar.js";
import SimpleFooter from "../components/footer.js";

class Index extends Component {
  render() {
    return (
      <>
        <MainNavbar />
        <main>
          <div className="position-relative">
            <section className="section section-md section-shaped pb-250">
              <div className="shape shape-default">
              </div>
              <Container className="py-lg d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="10">
                      <h1 className="display-4 text-uppercase text-bold text-white">
                        Next Discovery Awaits
                      </h1>
                      <h2 className="text-white">
                        Federated Learning Token
                      </h2>
                      <p className="lead text-white">
                        Token for secure and anonymous federated learning. Create new project, become provide data or buy share in an existing project.
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="#"
                        >
                          <span className="btn-inner--icon">
                            <BookOpen />
                          </span>
                          <span className="btn-inner--text align-middle">Getting started</span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="#"
                        >
                          <span className="btn-inner--icon">
                            <Search />
                          </span>
                          <span className="btn-inner--text align-middle">
                            Browse projects
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          </div>

          <section className="section section-lg pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to work with us?</h4>
                      <p className="mt-0">
                        Your project is very important to us.
                      </p>
                      <Form>
                      <FormGroup
                        className={"mt-5"}
                      >
                        <InputGroup className="input-group-alternative">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          <Input
                            placeholder="Your name"
                            type="text"
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={"test"}
                      >
                        <InputGroup className="input-group-alternative">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          <Input
                            placeholder="Email address"
                            type="email"
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Send Message
                        </Button>
                      </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;