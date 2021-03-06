import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { APP_NAME } from "../config";
import { isAuth, signout } from "../actions/auth";
import Search from "../components/blog/Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <a className="font-weight-bold">{APP_NAME}</a>
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link href="/contact">
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>

            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Sign In</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink className="btn btn-primary text-light">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="/user/crud/blog"
                >
                  Write a blog
                </a>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Search></Search>
    </>
  );
};

export default Header;
