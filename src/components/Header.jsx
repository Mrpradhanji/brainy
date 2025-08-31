import { brainy } from "../assets";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import MenuSvg from "../assets/svg/MenuSvg";
import { links } from "../config";
import { navigation } from "../constants";
import Button from "./Button";
import { HambugerMenu } from "./design/Header";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:bg-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img
            src={brainy}
            width={190}
            height={40}
            alt="Brainy"
            className="pointer-events-none select-none"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.external ? "_blank" : "_self"}
                rel={item.external && "noreferrer noopener"}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile && "lg:hidden"
                } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HambugerMenu />
        </nav>

        {/* Auth Buttons */}
        <div className="ml-auto flex items-center space-x-4">
          {isLoaded && (
            <>
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="hidden lg:flex text-sm text-n-2 hover:text-n-1 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className="hidden lg:block text-sm text-n-3">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                  <Button onClick={handleSignOut} className="hidden lg:flex">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/sign-in" className="hidden lg:block">
                    <Button className="hidden lg:flex">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" className="hidden lg:block">
                    <Button className="hidden lg:flex" white>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}

          <Button
            onClick={toggleNavigation}
            className="ml-auto lg:hidden"
            px="px-3"
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
