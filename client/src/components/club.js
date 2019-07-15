/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Card } from "./ui";
import { Heart } from "./icons";
import { favorite, unfavorite } from "../services/club";
import { useSetFavorite, useSetUnfavorite } from "../actions/action-hooks";

function Club({ club }) {
  const setFavorite = useSetFavorite();
  const setUnfavorite = useSetUnfavorite();

  const styleFavorited = {
    cursor: "pointer",
    fill: "tomato",
    color: "tomato"
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
        display: "flex",
        alignItems: "center",
        padding: "1rem"
      }}
      role="listitem"
    >
      <div
        css={{
          width: "50px",
          height: "50px",
          background: "#ddd",
          borderRadius: "50%",
          marginRight: "1em"
        }}
      />
      <div>
        <h3>{club.name}</h3>
        <div>Address: {club.address}</div>
        <div>Price: {club.price}</div>
        <div
          css={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Heart
            width="18px"
            height="18px"
            css={club.favorited ? styleFavorited : { cursor: "pointer" }}
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
        </div>
      </div>
    </Card>
  );
}

export default Club;