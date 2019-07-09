/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

function Navbar() {
  return (
    <nav
      css={{
        background: "#fff",
        borderBottom: "1px solid #e5edef",
        padding: "10px 15px",
        marginBottom: "2em"
      }}
    >
      <div
        css={{
          maxWidth: "900px",
          margin: "auto"
        }}
      >
        <Link to="/">
          <h2>Kampu</h2>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
