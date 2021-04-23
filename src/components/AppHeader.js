import React, { Component } from 'react'; 
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'; 
class AppHeader extends Component { 
    state = { 
        isOpen: false
    };
    toggle = this.toggle.bind(this); 
    toggle() { 
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() { 
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
               
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Item</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        Item2
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/">Item 3</DropdownItem>
                            <DropdownItem>Item 4</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppHeader; 
