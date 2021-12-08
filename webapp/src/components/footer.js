import React from "react";
import { GitHub, AlertCircle, RefreshCw, CheckCircle } from "react-feather";
import { Helmet } from "react-helmet";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  UncontrolledTooltip,
  FormFeedback
} from "reactstrap";

import useScript from '../utils/useScript';


const SimpleFooter = props => {
  useScript("https://sibforms.com/forms/end-form/build/main.js");
  window.AUTOHIDE = true;

  return (
    <>
      <Helmet>
        {/*<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css"></link>*/}
      </Helmet>
      <footer className="footer">
        <Container>
          <Row className="row-grid align-items-center mb-5">
            <Col lg="10">
              <h4 className="mb-2 font-weight-light">
                Let's get in touch on any of these platforms.
              </h4>
              <h3 className="text-primary font-weight-light mb-0">
                Subscribe to our newsletter!
              </h3>
            </Col>
            <Col className="text-lg-center btn-wrapper" lg="2">
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="github"
                href="https://github.com/Breta01/federated-learning-token"
                id="tooltip_footer_github"
                target="_blank"
              >
                <span className="btn-inner--icon text-white">
                  <GitHub />
                </span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip_footer_github">
                Star on Github
              </UncontrolledTooltip>
            </Col>
          </Row>



          <Row className="sib-form justify-content-center">
            <Col md="6" id="sib-form-container" className="sib-form-container">
              <div id="error-message" className="sib-form-message-panel">
                <div className="sib-form-message-panel__text sib-form-message-panel__text--center">

                  <span className="sib-form-message-panel__inner-text">
                    <AlertCircle /> Your subscription could not be saved. Please try again.
                  </span>
                </div>
              </div>
              <div id="success-message" className="sib-form-message-panel">
                <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                  <CheckCircle className="mx-2" />
                  <span className="sib-form-message-panel__inner-text">
                    Your subscription has been successful.
                  </span>
                </div>
              </div>

              <div id="sib-container" className="sib-container--large sib-container--horizontal">
                <Form
                  id="sib-form"
                  method="POST"
                  action="https://5334624e.sibforms.com/serve/MUIEAO7svM643TUAt9VR4F9imcCfLcRdasXRS0vPAgf7Y1CzbG7nLjpNsA7CeLVHOuFqfto1C8GGgwnF40-GBciy6Yvm7tz-OWu_09vrDXq7JJpgL6AbpDmMUwKWtef_aGwG6XUkHMoHJ4dPg3ingPj_xaawktmQZ2n-3deXozyK_cEsgQEyOQuBB9xmTG0fxZ1TFNv-nSrzLv5A"
                  data-type="subscription"
                >
                  <div className="sib-input sib-form-block">
                    <FormGroup className="form__entry entry_block">
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="EMAIL"
                          className="input"
                          name="EMAIL"
                          type="email"
                          placeholder="Enter your email address"
                          data-required="true"
                          required
                        />

                        <Button
                          className="sib-form-block__button sib-form-block__button-with-loader"
                          color="default"
                          form="sib-form"
                          type="submit"
                        >
                          <RefreshCw className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" />
                          Subscribe
                        </Button>
                      </InputGroup>
                      <FormFeedback className="entry__error entry__error--primary">
                      </FormFeedback>
                    </FormGroup>
                  </div>
                  <input type="text" name="email_address_check" defaultValue="" style={{ display: "none" }} />
                  <input type="hidden" name="locale" defaultValue="en" />
                </Form>
              </div>
            </Col>
          </Row>



          <hr />
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://github.com/Breta01"
                  target="_blank"
                  rel="noreferrer"
                >
                  Breta
                </a>
              </div>
            </Col>
            <Col md="6">
              <Nav className="nav-footer justify-content-end">
                <NavItem>
                  <NavLink
                    href="#"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://bretahajek.com"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://github.com/Breta01/federated-learning-token/blob/main/LICENSE"
                    target="_blank"
                  >
                    GPL-3.0 License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}


export default SimpleFooter;
