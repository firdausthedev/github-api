import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import { Alert } from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './components/pages/About';
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   //show loading spinner
  //   this.setState({ loading: true });

  //   //get data from github api
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({ users: res.data, loading: false });
  //   // console.log(res.data);
  // }

  //get the text from Search.js and search on github
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  //get a single user
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  //clear users from Search.js
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //set alert
  setAlert = (msg, type) => {
    //set alert state to an object with 2 attributes
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => <User {...props} getUser={this.getUser} user={user} loading={loading} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
