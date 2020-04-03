import React from 'react';
import UserItem from './UserItem';
import styled from 'styled-components';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types'; //impt

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <UserStyled>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </UserStyled>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}; //ptar

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
