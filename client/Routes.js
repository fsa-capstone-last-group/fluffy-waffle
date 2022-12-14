import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import UserTranslatePage from './components/UserTranslatePage/UserTranslatePage';
import PromptSelection from './components/PromptSelection';
import UserProfile from './components/UserProfile/UserProfile';
import Results from './components/Results';
import LandingPage from './components/LandingPage/LandingPage';
import { UserResults } from './components/UserResults';
import { Leaderboard } from './components/Leaderboard';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { About } from './components/About';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/About' component={About} />
            <Route path='/LandingPage' component={LandingPage} />
            <Route path='/prompts/:id' component={UserTranslatePage} />
            <Route exact path='/prompts' component={PromptSelection} />
            <Route path='/myprofile/userResults' component={UserResults} />
            <Route exact path='/myprofile' component={UserProfile} />
            <Route path='/results' component={Results} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/*' component={NotFoundPage} />
            {/* <Redirect to="/error" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='About' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/*' component={NotFoundPage} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
