import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { BookOpen, Search } from "react-feather";


class Index extends Component {
  state = {
    submitted: false,
    error: "",
  }

  submitForm = (e) => {
    e.preventDefault();

    let data = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
      _url: e.target[3].value
    };

    fetch("https://usebasin.com/f/e6dddc96a124", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(async res => {
        const json = await res.json();
        if (json.error) {
          this.setState({
            submitted: false,
            error: json.error
          });
        }
        this.setState({
          submitted: true,
          error: ""
        });
      })
      .catch(error => this.setState({
        submitted: false,
        error: error
      }));
  }


  render() {
    return (
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
                      Token for secure and anonymous federated learning. Create new project, provide data, develop new models and more.
                    </p>
                    <div className="btn-wrapper">
                      <Button
                        className="btn-icon mb-3 mb-sm-0 text-white"
                        color="info"
                        href="#"
                        disabled
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
                        disabled
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
                    {!this.state.submitted ?
                      <Form onSubmit={this.submitForm}>
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
                              name="name"
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
                              id="email"
                              name="email"
                              placeholder="Email address"
                              type="email"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-4">
                          <Input
                            className="form-control-alternative"
                            cols="80"
                            name="message"
                            placeholder="Type a message..."
                            rows="4"
                            type="textarea"
                            invalid={!!this.state.error}
                          />
                          <FormFeedback>{this.state.error}</FormFeedback>
                        </FormGroup>
                        <div>
                          <input type="textarea" name="url" style={{ display: "none" }} />
                          <Button
                            block
                            className="btn-round"
                            color="default"
                            size="lg"
                            type="submit"
                          >
                            Send Message
                          </Button>
                        </div>
                      </Form>
                      : <div className="text-center">
                        <h4 className="text-primary font-weight-light mt-5 mb-4">
                          Thank you for submitting your message.
                        </h4>
                      </div>
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>


        <section className="section section-lg pt-0 section-contact-us">
          <Container className="container-lg">
            <Row className="justify-content-center">
              <Col lg="4">
                <h1 className="display-4">
                  Chainlink Hackathon Presentation
                </h1>
                <p className="lead">
                  The project started as a part of Chainlink Hackathon. You can watch the presentation of the project submission.
                </p>
              </Col>
              <Col lg="8" className="p-3 ps-lg-6">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/3TFzvjnEDAA"
                    title="FELT Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

      </main>
    );
  }
}

export default Index;