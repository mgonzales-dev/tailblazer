import {Button, Container, Navbar} from "react-bootstrap";
import "./Header.css";
import logoFullWhite from "@assets/logo-full-white.svg";

function Header({setShowCreateModal}: { setShowCreateModal: (value: boolean) => void; }) {
  return (
      <header>
        <Navbar fixed="top">
          <Container>
            <Navbar.Brand href="#">
              <img src={logoFullWhite} alt="TailBlazer Logo"/>
            </Navbar.Brand>
            <Button
                className="mt-2"
                variant="light"
                onClick={() => setShowCreateModal(true)}
            >
              + Report Lost Animal
            </Button>
          </Container>
        </Navbar>
        <h1 hidden>TailBlazer</h1>
      </header>
  );
}

export default Header;