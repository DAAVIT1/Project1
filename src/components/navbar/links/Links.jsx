"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLinkClick = () => setOpen(false);

  // TEMPORARY
  // const session = true;
  // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} onClick={handleLinkClick} />
          ))}
          {session?.user ? (
            <>
              {session.user?.isAdmin && (
                <NavLink
                  item={{ title: "Admin", path: "/admin" }}
                  onClick={handleLinkClick}
                />
              )}
              <form action={handleLogout} className={styles.logoutForm}>
                <button className={styles.logout} onClick={handleLinkClick}>
                  Logout
                </button>
              </form>
            </>
          ) : (
            <NavLink
              item={{ title: "Login", path: "/login" }}
              onClick={handleLinkClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
