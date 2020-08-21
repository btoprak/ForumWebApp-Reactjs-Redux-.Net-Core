import React, { Component } from 'react'
import './Footer.css'
import { Container } from 'reactstrap'
export default class Footer extends Component {
    render() {
        return (
            <Container className="footer">
                <div className="footerLogo"></div>
                <div>Footer</div>
            </Container>
        )
    }
}
