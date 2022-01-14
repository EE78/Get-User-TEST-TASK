import React, { useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isFetchDisabled, setFetchDisabled] = useState(false);
  const [error, setError] = useState(null);

  const onGetUserClick = () => {
    if (isFetchDisabled) return;

    setFetchDisabled(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.filter((user) => user.username !== "Delphine"));
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleClick = (user) => {
    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        likeTime: new Date().toISOString(),
        senderId: "Evgeny",
      }),
    });
  };

  return (
    <div>
      <button onClick={onGetUserClick} disabled={isFetchDisabled}>
        Get users
      </button>
      <div>
        {users.length !== 0
          ? users.map((user) => (
              <div key={user.id}>
                {user.name}
                <button onClick={() => handleClick(user)}>LIKE</button>
              </div>
            ))
          : "No data"}

        {error && "ERROR"}
      </div>
    </div>
  );
};

export default UserList;
