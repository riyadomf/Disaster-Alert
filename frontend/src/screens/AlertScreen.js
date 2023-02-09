import React, { useState } from "react";
import { Row, Col, Card, ListGroup, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
const AlertScreen = () => {
  const { search } = useLocation();
  const city = search ? search.split("&")[0].split("=")[1] : "/";
  const lat = search ? search.split("&")[1].split("=")[1] : "/";
  const lon = search ? search.split("&")[2].split("=")[1] : "/";

  const [phone, setPhone] = useState("");
  const [phoneSubscribed, setPhoneSubscribed] = useState(false);

  const [email, setEmail] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const [msg, setMsg] = useState("");

  const phoneSubscribeHandler = async (e) => {
    e.preventDefault();
    try {
      if (phone === "") return;

      const {
        data: { subscriptionStatus },
      } = await axios.post(`/api/alerts/phone-subscription-status`, {
        phone,
      });

      if (subscriptionStatus) {
        setMsg("This number is already subscribed!");
        setPhoneSubscribed(true);
      } else {
        const { data } = await axios.post(`/api/alerts/subscribeByPhone`, {
          phone,
          latitude: lat,
          longitude: lon,
        });
        setMsg("This number has been subscribed!");
        setPhoneSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const phoneUnsubscribeHandler = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { subscriptionStatus },
      } = await axios.post(`/api/alerts/phone-subscription-status`, {
        phone,
      });
      if (subscriptionStatus) {
        const { data } = await axios.post(`/api/alerts/unsubscribeByPhone`, {
          phone,
        });
        setMsg("This number has been unsubscribed!");
        setPhoneSubscribed(false);
      } else {
        setPhoneSubscribed(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailSubscribeHandler = async (e) => {
    e.preventDefault();
    try {
      if (email === "") return;

      const {
        data: { subscriptionStatus },
      } = await axios.post(`/api/alerts/email-subscription-status`, {
        email,
      });

      if (subscriptionStatus) {
        setMsg("This email is already subscribed!");
        setEmailSubscribed(true);
      } else {
        const { data } = await axios.post(`/api/alerts/subscribeByEmail`, {
          email,
          latitude: lat,
          longitude: lon,
        });
        setMsg("This Email has been subscribed!");
        setEmailSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailUnsubscribeHandler = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { subscriptionStatus },
      } = await axios.post(`/api/alerts/email-subscription-status`, {
        email,
      });
      if (subscriptionStatus) {
        const { data } = await axios.post(`/api/alerts/unsubscribeByemail`, {
          email,
        });
        setMsg("This email has been unsubscribed!");
        setEmailSubscribed(false);
      } else {
        setEmailSubscribed(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col sm={3} md={8} lg={10}>
        <h2 className="my-3">{`Alert Subscription for ${city}`}</h2>
        {/*  */}

        <div className="col-md-8 ">
          <div className="card mb-3">
            {msg ? <Message variant="info">{msg}</Message> : <></>}
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h3 className="mb-0">Subscribe using Phone</h3>
                  {!phoneSubscribed ? (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Form>
                          <Form.Group controlId="PhoneNumber">
                            <Form.Control
                              type="phone"
                              placeholder="Enter Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Form>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn-block col-12"
                          onClick={phoneSubscribeHandler}
                        >
                          Subscribe
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  ) : (
                    <ListGroup>
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn-block col-12"
                          onClick={phoneUnsubscribeHandler}
                        >
                          Unsubscribe
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </div>
                {/* <div className="col-sm-9 text-secondary">{city}</div> */}
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h3 className="mb-0">Subscribe using Email</h3>
                  {!emailSubscribed ? (
                    <Card className="my-3 p-3 rounded">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Form>
                            <Form.Group controlId="Email">
                              <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Form>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Button
                            type="button"
                            className="btn-block col-12"
                            onClick={emailSubscribeHandler}
                          >
                            Subscribe
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  ) : (
                    <ListGroup>
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn-block col-12"
                          onClick={emailUnsubscribeHandler}
                        >
                          Unsubscribe
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </div>
                {/* <div className="col-sm-9 text-secondary">{city}</div> */}
              </div>
              <hr />
            </div>
          </div>
        </div>

        {/*  */}
      </Col>
    </Row>
  );
};

export default AlertScreen;
