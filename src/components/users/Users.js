import React, { useContext } from 'react';
import UserItem from './UserItem';
import styled from 'styled-components';
import Spinner from './../layout/Spinner';
import GitHubContext from './../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GitHubContext);

  const { users, loading } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <UserStyled>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </UserStyled>
    );
  }
};

const UserStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

// const userStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3,1fr)',
//   gripGap: '1rem'
// };

export default Users;
