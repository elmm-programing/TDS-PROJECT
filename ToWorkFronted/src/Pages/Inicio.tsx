import frog from '../assets/frog.png';
import logo1 from '../assets/logo 1.png';
import computer from '../assets/computer.png';
import user from '../assets/userIcon.png';
import money from '../assets/dollar.png';
import video from '../assets/showoff.mp4';
import '../Styles/Inicio.css';
import { Container, Row, Nav, Navbar, Col } from 'react-bootstrap';


export function Inicio() {
    return (
        <>
            <div className=' pb-5'>
                <Navbar className='shadow' fixed="top" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand><Nav.Link href="/"><img src={frog} style={{ height: 50, cursor: 'pointer' }} /></Nav.Link></Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="/login" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>Inicia Sesion</Nav.Link>
                            <Nav.Link href="" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>||</Nav.Link>
                            <Nav.Link href="/login" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>¡Registrate!</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div className='d-flex align-items-center justify-content-center bg-dark'>
                <Row>
                    <Col className='video-background position-relative'>
                        <div className='vw-100 min-vh-50'>
                            <div id='video' className='bg-dark'>
                                <video playsInline autoPlay loop muted>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </Col>
                    <Col className="p-5 rounded-0 col-md-6 position-absolute" style={{ marginTop: "10vh" }}>
                        <div className="text-center font-weight-bold text-uppercase text-light fs-1" style={{ fontFamily: 'monospace' }}>Contrata o Labora en cualquier area con nuestra plataforma</div>
                        <div className='d-flex justify-content-center'>
                            <img src={logo1} className='img-fluid'></img>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='p-5 bg-dark text-white'>
                <br></br>
                <br></br>
                <br></br>
                <div><h1 className='font-weight-bold text-uppercase h1'>¿Que es To-Work?</h1></div>
                <br></br>
                <br></br>
                <div className="text-uppercase pb-4" style={{ fontFamily: 'Lucida Console', textAlign: "justify", textJustify: "inter-word" }}>El número de desempleados en la Republica Dominicana pasó de los 273.922 en 2020 a los 362.954 en 2021, según los datos del Boletín de Estadísticas Oficiales de Pobreza Monetaria en República Dominicana 2021. </div>
                <div className="text-uppercase pb-4" style={{ fontFamily: 'Lucida Console', textAlign: "justify", textJustify: "inter-word" }}>Todo ello supone un incremento de 89.032 personas desocupadas en búsqueda de trabajo.
                    Esto nos pone en la necesidad de ofrecer medios para que las personas independientemente de su situación tengan un medio inmediato de solicitar empleo sin mayor dificultad, muchas plataformas profesionales como LinkedIn solicitan cierto nivel de experiencia para aplicar a sus empleos, no obstante, muchas veces no se toma en cuenta a aquellas personas en necesidad de un trabajo. Por ello esta idea será menos centralizada y más abierta al público en la cual se solicitarán empleos desde alto hasta bajo nivel.</div>
                <div className="text-uppercase pb-4" style={{ fontFamily: 'Lucida Console', textAlign: "justify", textJustify: "inter-word" }}>To-Work consiste en una plataforma web en la que la comunidad podrá postear solicitudes de trabajo al igual que propuestas, proyectos o ideas de emprendimiento para de tal forma darlas a conocer y reunir personas que suplan con la necesidad. De igual forma se podrá aceptar dichas solicitudes y mantener comunicación con las personas involucradas mediante un chat en tiempo real.</div>
            </div>
            <div className="p-5">
                <br></br>
                <br></br>
                <br></br>
                <div ><h1 className='font-weight-bold text-uppercase h1'>¿Como funciona?</h1></div>
                <br></br>
                <br></br>
                <Container fluid>
                    <Row className='text-center h-100 mh-100' >
                        <Col md={4} sm={6}>
                            <img src={computer} className='img-fluid'></img>
                            <br></br>
                            <br></br>
                            <p className='text-uppercase' style={{ fontFamily: 'Lucida Console', fontSize: "1rem" }}>Publica un trabajo</p>
                        </Col>
                        <Col md={4} sm={6}>
                            <img src={user} className='img-fluid'></img><br></br>
                            <br></br>
                            <p className='text-uppercase' style={{ fontFamily: 'Lucida Console', fontSize: "1rem" }}>Selecciona un freelancer</p>
                        </Col>
                        <Col md={4} sm={6}>
                            <img src={money} className='img-fluid'></img><br></br>
                            <br></br>
                            <p className='text-uppercase' style={{ fontFamily: 'Lucida Console', fontSize: "1rem" }}>Gana dinero facilmente</p>
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Container>
            </div>
        </>
    );
}
