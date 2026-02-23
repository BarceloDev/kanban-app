import { useState } from "react";
import Header from "../components/Header";
import Pictures from "../components/Pictures";

export default function UserScreen() {
  const [option, setOption] = useState("pictures");

  return (
    <div>
      <Header setOption={setOption} />
      {option === "pictures" ? <Pictures /> : ""}
    </div>
  );
}
