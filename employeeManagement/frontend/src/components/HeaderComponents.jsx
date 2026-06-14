import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponents() {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <Link to="/employees" className="navbar-brand">
                        Employee Management
                    </Link>

                    <div className="ml-auto">
                        <Link to="/employees" className="btn btn-outline-light btn-sm mr-2">
                            Home
                        </Link>
                        <Link to="/departments" className="btn btn-outline-info btn-sm">
                            Department
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponents;
