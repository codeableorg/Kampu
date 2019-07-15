/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

function Navbar() {
  return (
    <nav
      css={{
        background: "#fff",
        borderBottom: "1px solid #e5edef",
        padding: "15px",
        marginBottom: "2em"
      }}
    >
      <div
        css={{
          maxWidth: "900px",
          margin: "auto"
        }}
      >
        <Link to="/" css={{ textDecoration: "none" }}>
          <h2
            css={{
              textDecoration: "none",
              margin: "0",
              fontSize: "35px",
              fontWeight: "500",
              backgroundImage:
                "-webkit-gradient(linear, 0% 0%, 25% 100%,from(#c5e9a1), to(#00b7c6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Kampu
          </h2>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
