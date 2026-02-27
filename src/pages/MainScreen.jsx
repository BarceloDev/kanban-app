import { useState } from "react";
import Header from "../components/Header";
import OptionScreen from "../components/OptionScreen";

export default function UserScreen() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [profileNavBarOpen, setProfileNavBarOpen] = useState(false);

  return (
    <div>
      <Header
        navBarOpen={navBarOpen}
        setNavBarOpen={setNavBarOpen}
        profileNavBarOpen={profileNavBarOpen}
        setProfileNavBarOpen={setProfileNavBarOpen}
      />
      <OptionScreen navBarOpen={navBarOpen} />
    </div>
  );
}
