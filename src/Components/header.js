import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class header extends Component {
    render() {
        const navStyle = {
            color : 'white',
        }
        return (
            <div>
                <nav>
                    <ul className="nav-links">
                        <Link style={navStyle }to="/get">
                            <li>Search</li>
                        </Link>
                        <Link style={navStyle} to="/put">
                            <li>Create</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default header
