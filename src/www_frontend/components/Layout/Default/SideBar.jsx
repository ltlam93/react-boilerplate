import React, {Component} from 'react';
import Link from 'shared/Link';
class SideBar extends Component {
    render() {
        return (
            <aside className="main-sidebar">

                <section className="sidebar">

                    <ul className="sidebar-menu">
                        <li>
                            <a target="_blank" href="/?_escaped_fragments_=/">
                                <i className="ti-home mr-5"></i><span>Dashboard SSR</span>
                            </a>
                        </li>
                        <li>
                            <Link to="/profile">
                                <i className="ti-info-alt mr-5"></i><span>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        )
    }
}
export default SideBar