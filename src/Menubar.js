import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Images/logo.png';
function Menubar() {
  return (
    <>
     
      <Navbar className="bg-body-tertiary" > 
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Comsats GPA Calculator
          </Navbar.Brand>

      </Navbar>
    </>
  );
}

export default Menubar;



