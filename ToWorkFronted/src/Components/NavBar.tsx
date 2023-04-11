import {  Container, Dropdown,  Nav, Navbar } from "react-bootstrap";
import { AutoComplete } from "./AutoComplete";
import React from "react";
import { useUserStore } from "../store/UsersStore";
import { Link } from "react-router-dom";
export function NavBar() {

  const state = useUserStore()
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            className="text-light text-decoration-none mt-1 d-flex flex-row" onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand ><Link className="text-decoration-none text-white" to={"/inicio"}>To-Work</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-center flex-grow-1 ">

                        <Nav.Item><AutoComplete /></Nav.Item>

                    </Nav>
                    <Nav >

                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} key="down-centered"  variant="dark"  >
                            <p className="fs-5 pe-2">{state.user.username}</p>
                                
                                <img className="rounded-circle"
                                    style={{ width: 30 + "px", height: 30 + "px" }}
                                    src={"https://picsum.photos/200/300"}
                                    alt="user pic"
                                />


                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item > <Link className="text-decoration-none text-dark" to={"/perfil"}>Perfil</Link></Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
