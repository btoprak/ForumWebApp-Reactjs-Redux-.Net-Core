import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navi.css';


class Navi extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        //console.log(this.props.user)
        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand className="navLogo" href="/"></NavbarBrand>
                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="navItem">
                                <Link className="link" to="/">Home</Link>
                            </NavItem>
                            <NavItem className="navItem">
                                <Link className="link" to="/forum">Forum</Link>
                            </NavItem>
                            {this.props.isAuth && this.props.user.roleNames.some(role => role === "Admin") ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className="link" nav caret>
                                        Settings
                                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link className="dropdownlink" to="/createforum">Create Forum</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link className="dropdownlink" to="/userswithroles">Users</Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                  </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown> : ""}
                        </Nav>
                        <Nav className="ml-auto navbar-nav">
                            {this.props.isAuth ?
                                <NavItem>
                                    <Link className="link" to={"/profile/" + this.props.user.id}>
                                        <img src={this.props.user.profileImageUrl || require('../../assets/image/default-profile.png')} style={{ height: 30, width: 30 }} alt={this.props.user.userName}></img>
                                        <span style={{ paddingLeft: "5px"}}>{this.props.user.userName}</span>
                                    </Link>
                                </NavItem>
                                :
                                <NavItem>
                                    <Link className="link" to="/login">Login</Link>
                                </NavItem>
                            }
                            {this.props.isAuth ?
                                <NavItem>
                                    <Link className="link" to="/logout">Logout</Link>
                                </NavItem> :
                                <NavItem>
                                    <Link className="link" to="/register">Register</Link>
                                </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navi;
