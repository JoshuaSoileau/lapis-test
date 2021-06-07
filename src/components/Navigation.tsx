import Link from "next/link";
import tw, { css } from "twin.macro";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";

const links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About us",
    url: "/about-us",
  },
  {
    title: "Current research studies",
    url: "/trials",
  },
  {
    title: "Contact us",
    url: "/about-us#contact",
  },
];

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const navigationClass = [
    tw`items-center md:flex`,
    active && tw`flex`,
    !active && tw`hidden`,
  ].filter(Boolean);

  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <ul css={navigationClass}>
        {links.map(({ url, title }) => {
          const active = router.pathname === url;

          const linkClass = [
            tw`cursor-pointer  font-600  text-lg`,
            tw`hover:text-blue-700`,
            active && tw`text-blue-700`,
          ].filter(Boolean);

          return (
            <li key={url} tw="mr-8 last:mr-0">
              <Link href={url}>
                <a css={linkClass}>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
