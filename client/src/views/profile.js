/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { getUserAllInfo } from "../services/user";
import { Title, Card, Line } from "../components/ui";
function Profile() {
  const [userInfo, setUserInfo] = React.useState({});
  const [userBookings, setUserBookings] = React.useState([]);

  React.useEffect(() => {
    getUserAllInfo().then(user => {
      setUserInfo(user);
      setUserBookings(user.bookings);
    });
  }, []);

  function format(hour) {
    return ("0" + hour.toString() + ":00").slice(-5);
  }

  return (
    <div>
      <h2>Profile</h2>
      <Title>My Info</Title>
      <p>{userInfo.name}</p>
      <p>{userInfo.email}</p>
      <p>{userInfo.role}</p>
      <Title>My Bookings</Title>
      {userBookings.reverse().map(booking => {
        return (
          <Card
            key={booking.id}
            css={{
              marginBottom: "1em",
              boxShadow: "0 7px 30px -7px rgba(0,64,128,.2)"
            }}
          >
            <p>
              <span css={{ fontWeight: "bold" }}>Club: </span>
              {booking.club_name}
            </p>
            <p>
              <span css={{ fontWeight: "bold" }}>Sports Field: </span>
              {booking.sport_field_name}
            </p>
            <Line />
            <p>
              <span css={{ fontWeight: "bold" }}>Date: </span>
              {booking.date}
            </p>
            <p>
              <span css={{ fontWeight: "bold" }}>Hour: </span>
              {format(booking.start_hour)} - {format(booking.end_hour)}
            </p>
            <p>
              <span css={{ fontWeight: "bold" }}>Price: </span>${booking.amount}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export default Profile;
