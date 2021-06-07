import Image from "next/image";
import "twin.macro";
import { useMediaValue } from "../hooks/useMedia";
import Navigation from "./Navigation";
import Container from "./Container";

const Header = () => {
  const logoHeight = useMediaValue({
    default: 40,
    md: 80,
  });
  const logoWidth = (220 / 101) * logoHeight;

  return (
    <header>
      <Container>
        <div tw="flex justify-between items-center  p-4">
          <Image
            src="/images/darklogo.svg"
            width={logoWidth}
            height={logoHeight}
          />
          <nav>
            <Navigation />
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
