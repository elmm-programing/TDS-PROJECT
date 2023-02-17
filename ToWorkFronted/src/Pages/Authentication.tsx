import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Login from "../Components/Login";
import Register from "../Components/Register";

export function Autenticacion() {
    return (
        <div className=' m-0 d-flex align-items-center justify-content-center bg-dark' style={{height: "100vh"}}>
          <Row className='p-5 shadow-xl no-gutters vw-100'>
            <Col className='col-md-6 p-5 shadow-lg bg-dark text-white'>
              <Login />
            </Col>
            <Col className='col-md-6 shadow-lg p-5' style={{backgroundColor: '#198754'}}>
              <Register />
            </Col>
          </Row>
        </div>
    );
}
