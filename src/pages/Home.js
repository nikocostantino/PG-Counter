import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import FeaturedCard from '../components/FeaturedCard';
function Home() {
  const { events } = useLoaderData();

  return (
    <div style={{ margin: '0.5em', textAlign: 'center' }}>
      <h1>Home Page</h1>
      <p>Benvenuto nella Home Page.</p>
      <Suspense fallback={
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <div>caricamento...</div>
        </div>
        }>
        <Await resolve={events}>
        {events => (
            <div>
              {events.map(event => (
                <div key={event.id}>
                  <FeaturedCard
                    title={event.title}
                    text={event.text}
                    link={`/details/${event.id}`}
                  />
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadAvailableSlot() {
  try {

    const response = await fetch('http://localhost:8081/home/getTodayAvailableBookings');

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
      return [
        {
        "id": "1",
        "title": "Special title treatment 1",
        "text": "With supporting text below as a natural lead-in to additional content."
        },
        {
          "id": "2",
          "title": "Special title treatment 2",
          "text": "With supporting text below as a natural lead-in to additional content."
        }
      ];
    }
}

export function loader() {
  return defer({
    events: loadAvailableSlot(),
  });
}
export default Home;