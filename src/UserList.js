import React, { useState } from "react";
import styled from "styled-components";

export const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
width: 100%;
height: 100vh;  
justify-content:center;
align-items:center;
`;



export const List = styled.div`
  display: flex;
  flex-direction: column;
width: 100%;
justify-content:center;
align-items:center;
`;

export const List__Item = styled.div`
  display: flex;
width: 50%; 
justify-content: space-between;
`;

export const Item__Wrapper = styled.div`
background-color: 	rgb(211,211,211);
width: 100%; 
display: flex;
margin:5px;
justify-content:space-between;
border-radius: 10px;
padding-left: 10px;
padding-right: 10px;
`;


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
    <UserListWrapper>
      <button onClick={onGetUserClick} disabled={isFetchDisabled}>
        Get users
      </button>
      <List>
        {users.length !== 0
          ? users.map((user) => (
              <List__Item key={user.id}>
                <Item__Wrapper>
                <p>{"ID: "+user.id+"."}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <button onClick={() => handleClick(user)}>LIKE</button>
                </Item__Wrapper>
              </List__Item>
            ))
          : "No data"}

        {error && "ERROR"}
      </List>
    </UserListWrapper>
  );
};

export default UserList;
