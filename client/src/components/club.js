/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Card } from "./ui";
import { Heart, MapPin } from "./icons";
import { favorite, unfavorite } from "../services/club";
import { useSetFavorite, useSetUnfavorite } from "../actions/action-hooks";
import { Link } from "@reach/router";

function Club({ club }) {
  const setFavorite = useSetFavorite();
  const setUnfavorite = useSetUnfavorite();

  const styleFavorited = {
    cursor: "pointer",
    fill: "tomato",
    color: "tomato"
  };

  const styleMapPin = {
    cursor: "pointer",
    color: "#414141",
    marginLeft: "auto"
  };

  async function handleClick() {
    if (club.favorited) {
      setFavorite(await unfavorite(club.id));
    } else {
      setUnfavorite(await favorite(club.id));
    }
  }

  return (
    <Card
      css={{
        marginTop: "2rem",
        alignItems: "center",
        padding: "0",
        width: "30%",
        boxShadow: "0 7px 30px -7px rgba(0, 64, 128, 0.2)",
        "@media screen and (max-width: 750px)": {
          width: "45%"
        },
        "@media screen and (max-width: 520px)": {
          width: "100%"
        }
      }}
      role="listitem"
    >
      <img
        src={club.image[0]}
        alt={club.name}
        css={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "5px 5px 0 0",
          display: "block"
        }}
      />
      <div
        css={{
          padding: "16px"
        }}
      >
        <Link
          to={`/clubs/${club.id}`}
          css={{ textDecoration: "none", color: "inherit" }}
        >
          <h3
            css={{
              fontSize: "1em",
              color: "hsla(0, 0%, 15%, 1)",
              wordSpacing: "1.25px",
              letterSpacing: ".5px",
              margin: "8px 0",
              lineHeight: "1.5"
            }}
          >
            {club.name}
          </h3>
        </Link>
        <div>{club.address}</div>
        <div css={{ marginTop: "8px" }}>Price: {club.price}</div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            marginTop: "8px"
          }}
        >
          <Heart
            width="18px"
            height="18px"
            css={club.favorited ? styleFavorited : { cursor: "pointer" }}
            aria-label="like"
            onClick={handleClick}
          />
          <span
            css={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#657786",
              marginLeft: "5px"
            }}
          >
            {club.favorited_count > 0 && club.favorited_count}
          </span>
          {club.distance && (
            <>
              <MapPin width="18px" height="18px" css={styleMapPin} />
              <span css={{ paddingLeft: "5px" }}>
                {club.distance !== 0 ? `${club.distance / 1000.0}km` : null}
              </span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

export default Club;
