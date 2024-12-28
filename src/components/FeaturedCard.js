import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const FeaturedCard = ({ key, title, text, link }) => {
    return (
      <>
      <Card >
        <Card.Header as="h5">Featured Header</Card.Header>
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {text}
            </Card.Text>
            </Card.Body>
        </Link>
      </Card>      
      <br />
      </>
    );
  };

export default FeaturedCard;