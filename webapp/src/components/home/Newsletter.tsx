import React, { FC } from 'react';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
} from 'reactstrap';
import { AlertCircle, CheckCircle, RefreshCw } from 'react-feather';
import useScript from '../../utils/useScript.js';

const Newsletter: FC = () => {
  useScript('https://sibforms.com/forms/end-form/build/main.js');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.AUTOHIDE = true;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #4FABCE, #4347BA)',
        padding: '80px 40px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        Stay updated on the latest FELT news!
      </h2>

      <Col
        md="6"
        id="sib-form-container"
        className="sib-form-container"
        style={{ margin: 'auto' }}
      >
        <div id="error-message" className="sib-form-message-panel">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <span className="sib-form-message-panel__inner-text">
              <AlertCircle /> Your subscription could not be saved. Please try
              again.
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

        <div
          id="sib-container"
          className="sib-container--large sib-container--horizontal"
        >
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
                <FormFeedback className="entry__error entry__error--primary" />
              </FormGroup>
            </div>
            <input
              type="text"
              name="email_address_check"
              defaultValue=""
              style={{ display: 'none' }}
            />
            <input type="hidden" name="locale" defaultValue="en" />
          </Form>
        </div>
      </Col>
    </div>
  );
};

export default Newsletter;
