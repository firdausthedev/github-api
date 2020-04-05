import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import GitHubContext from './../../context/github/githubContext';

const Search = ({ setAlert }) => {
  const githubContext = useContext(GitHubContext);
  const [text, setText] = useState('');

  // const { searchUsers, users, clearUsers } = githubContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert(' Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search users...'
          value={text}
          onChange={onChange}
        />
        <input type='submit' value='Search' className='btn btn-dark btn-block' />
      </form>
      {githubContext.users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propType = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
