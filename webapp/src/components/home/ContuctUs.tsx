import { FC, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

const ContuctUs: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submitForm = (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
      _url: e.target[3].value,
    };

    fetch('https://usebasin.com/f/e6dddc96a124', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const json = await res.json();
        if (json.error) {
          setSubmitted(false);
          setError(json.error);
        }
        setSubmitted(true);
        setError('');
      })
      .catch((err) => {
        setSubmitted(false);
        setError(err);
      });
  };

  return (
    <Container style={{ maxWidth: 700 }}>
      <Card className="bg-gradient-secondary shadow">
        <CardBody className="p-lg-5">
          <h4 className="mb-1">Want to work with us?</h4>
          <p className="mt-0">Your project is very important to us.</p>
          {!submitted ? (
            <Form onSubmit={submitForm}>
              <FormGroup className="mt-5">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-user-run" />
                  </InputGroupText>
                  <Input placeholder="Your name" type="text" name="name" />
                </InputGroup>
              </FormGroup>
              <FormGroup className="test">
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
                  invalid={!!error}
                />
                <FormFeedback>{error}</FormFeedback>
              </FormGroup>
              <div>
                <input type="textarea" name="url" style={{ display: 'none' }} />
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
          ) : (
            <div className="text-center">
              <h4 className="text-primary font-weight-light mt-5 mb-4">
                Thank you for submitting your message.
              </h4>
            </div>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default ContuctUs;
