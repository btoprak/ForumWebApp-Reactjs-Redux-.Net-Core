import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsersWithRoles, updateRoles } from '../../redux/actions/adminActions';
import { Tabs, Tab } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./UsersWithRoles.css"
import { Link } from 'react-router-dom';

class UsersWtihRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            users: [],
            user: {},
            availableRoles: [
                { name: "Admin", value: "Admin", isChecked: false },
                { name: "Moderator", value: "Moderator", isChecked: false },
                { name: "Member", value: "Member", isChecked: false },
            ],
        }
    }

    componentDidMount() {
        this.props.getUsersWithRoles();

        this.setState({ users: this.props.usersWithRoles });
    }


    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.users !== prevState.users
        ) {
            this.props.getUsersWithRoles();
        }
    }


    toggle = (user) => {
        this.setState({ user: user })

        for (let i = 0; i < this.state.availableRoles.length; i++) {
            let isMatch = false;
            if (user.roleNames) {
                for (let j = 0; j < user.roleNames.length; j++) {
                    if (this.state.availableRoles[i].name === user.roleNames[j]) {
                        isMatch = true;
                        const { availableRoles } = this.state;
                        availableRoles[i].isChecked = true;
                        this.setState({ availableRoles });
                        // this.state.availableRoles[i].isChecked = true;
                        break;
                    }
                }
            }
            if (!isMatch) {
                const { availableRoles } = this.state;
                availableRoles[i].isChecked = false;
                this.setState({ availableRoles });
                // this.state.availableRoles[i].isChecked = false;
            }
        }
        let modal = this.state.modal
        this.setState({ modal: !modal });
    }

    handleCheckChieldElement = (event) => {
        let roles = this.state.availableRoles
        roles.forEach(role => {
            if (role.value === event.target.value)
                role.isChecked = event.target.checked
        })
        this.setState({ availableRoles: roles })
    }

    updateRoles = () => {
        const rolesToUpate = {
            roleNames: [...this.state.availableRoles.filter(el => el.isChecked === true).map(el => el.name)]
        }
        console.log(rolesToUpate)
        this.props.updateRoles(this.state.user, rolesToUpate);
        let modal = this.state.modal
        this.setState({ modal: !modal });
    }

    render() {
        console.log("asdas");
        return (
            <div className="container mt-5 frontPage">
                <h2>Admin Panel</h2>
                <div className="tabs-container">
                    <Tabs className="tabs" defaultActiveKey="UserManagment" id="profile-tab">
                        <Tab eventKey="UserManagment" title="User Managment">
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%" }}>User ID</th>
                                            <th style={{ width: "30%" }}>Username</th>
                                            <th style={{ width: "30%" }}>Active roles</th>
                                            <th style={{ width: "20%" }}></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.usersWithRoles.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td><Link to={"/profile/" + user.id}>{user.userName}</Link></td>
                                                <td> <ul className="roleUl">{user.roleNames.map(role => (
                                                    <li key={role} className="roleli">{role}</li>
                                                ))}</ul></td>
                                                <td><button onClick={() => this.toggle(user)} className="btn btn-info">Edit Roles</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}>Roles</ModalHeader>
                                    <ModalBody>
                                        <form>
                                            <div className="form-check">
                                                {this.state.availableRoles.map(role => (
                                                    <div key={role.name}>
                                                        <input type="checkbox" className="form-check-input" value={role.value} checked={role.isChecked} onChange={this.handleCheckChieldElement} />
                                                        <label>{role.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <button className="btn btn-primary" onClick={this.updateRoles}>Do Something</button>{' '}
                                        <button className="btn btn-primary" onClick={this.toggle}>Cancel</button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </Tab>
                    </Tabs>
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        usersWithRoles: state.adminReducer.usersWithRoles,
    };
};

const mapDispatchToProps = {
    getUsersWithRoles,
    updateRoles
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersWtihRoles);
