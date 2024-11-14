import HeaderHumburger from "./HeaderHumburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuth from "./HeaderAuth";
import Button from "../Button";
import { useCallback, useState } from "react";

const Header = () => {
  const [first, setFirst] = useState(true);
  const myFunction = useCallback(() => {}, [first]);

  return (
    <header className="header --transparent">
      <div className="container-fluid">
        <HeaderHumburger function={myFunction} />
        <HeaderLogo />
        <HeaderAuth />
      </div>
      {/* <Button onClick={() => setFirst(!first)}>Click me 1</Button>
      <p>{first.toString()}</p> */}
    </header>
  );
};

export default Header;
