import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import FeaturedCard from '../components/FeaturedCard';

function Details() {
  const { event } = useLoaderData();

  return (
    <>
    <div style={{ margin: '0.5em', textAlign: 'center' }}>
      <h1>Details Page</h1>
      <p>Questa è la pagina Details.</p>
    </div>
      <Suspense fallback={
        <div  style={{ margin: '0.5em', textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <div>caricamento...</div>
        </div>
        }>
        <Await resolve={event}>
          {
            (loadedEvent) => 
              <>
              <div  style={{ margin: '0.5em', textAlign: 'center' }} key={loadedEvent.id}>
                <FeaturedCard
                  title={loadedEvent.title}
                  text={loadedEvent.text}
                />
              </div>
              <Card>
                <Form style={{ margin: '0.5em' }}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
        
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Row>
        
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>
        
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>
        
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>
        
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
      
                <div style={{ textAlign: 'center' }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card>
          </>
          }
        </Await>
      </Suspense>
    </>
  );
}

async function getAvailableBookingByid(id) {
  try {

    const response = await fetch('http://localhost:8081/home/getAvailableBookingByid/' + id);

    if (!response.ok) {
      throw json(
        { message: 'Could not fetch bookings.' },
        {
          status: 500,
        }
      );
    } 
    else {
      const resData = await response.json();
      return resData.bookings;
    }
  } catch (error) {
      return {
        "id": "1",
        "title": "Special title treatment 1",
        "text": "With supporting text below as a natural lead-in to additional content."
        };
    }
}

export function loader({ request, params }) {
  const id = params.eventId;
  console.log("event id is: "+id)
  return defer({
    event: getAvailableBookingByid(id),
  });
}


export default Details;