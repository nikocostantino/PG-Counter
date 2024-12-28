import { Outlet} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import CustomNavbar from '../components/CustomNavbar';

function Root() {

  return (
    <>
      <CustomNavbar />
      <Container className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <main>
            <Outlet />
          </main>
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default Root;