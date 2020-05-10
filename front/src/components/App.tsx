import React, { useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/core';
import { AppState, AppThunkDispatch } from 'store';
import { fetchfollowedShowsAction } from 'store/user/actions';
import Header from 'components/header/Header';
import SearchPage from 'components/search/SearchPage';

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  fetchfollowedShows: () => void;
}

type Props = StateProps & DispatchProps;

const App = ({ isLoggedIn, fetchfollowedShows }: Props) => {
  useEffect(() => {
    if (isLoggedIn) {
      fetchfollowedShows();
    }
  }, [isLoggedIn, fetchfollowedShows]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <SearchPage />
        </Route>
        <Route path="/calendar">
          <Box>Calendar</Box>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = (
  state: AppState
): StateProps => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
  fetchfollowedShows: () => dispatch(fetchfollowedShowsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
