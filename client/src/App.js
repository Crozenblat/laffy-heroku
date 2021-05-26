import React, {useEffect, Fragment} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {authLoginUser} from "./store/features/authorizationSlice";
import './App.css';
import {ThemeProvider} from "styled-components";
import axios from "axios";

import {Route, Switch, Redirect} from "react-router-dom";

import NavigationItems from "./components/Navigation/NavigationItems";
import DeleteAccountModal from "./containers/DeleteAccountModal/DeleteAccountModal";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ExplorePage from "./pages/ExplorePage";
import ComedianPage from "./pages/ComedianPage";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  const dispatch = useDispatch();

  axios.defaults.baseURL = "https://laffy-app.herokuapp.com";

  useEffect(() => {
    let triedLogin = false;
    (async() => {
      if(!triedLogin){
        try{
          triedLogin = true;
          let login = await axios.post("/login", {}, {withCredentials: true});
          dispatch(authLoginUser({userId: login.data.userId, username: login.data.username}));
        }catch(err){
          console.log(err);
        };
      };
    })();
  }, []);

  const theme = {
    primaryColor: "rgb(0, 37, 66)",
    secondaryColor: "rgb(0, 153, 216)",
    menuColor: "rgba(20, 20, 20, 0.5)",
    menuBlur: "blur(15px)"
  };

  const ThemedBody = styled.div`
    background: ${props => props.theme.primaryColor};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 92.7vh;
    padding-bottom: 5rem;
    overflow-x: clip;
  `;

  let routes = (
    <Fragment>
      <Route path="/">
        <NavigationItems/>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/favorites" exact>
            <FavoritesPage />
          </Route>
          <Route path="/explore" exact>
            <ExplorePage />
          </Route>
          <Route path="/comedians/:comedianId" exact>
            <ComedianPage/>
          </Route>
          <Route path="/login" exact>
            <LoginPage/>
          </Route>
          <Route path="/change-password" exact>
            <ChangePasswordPage/>
          </Route>
          <Route path="/search">
            <SearchResultsPage/>
          </Route>
          <Redirect to="/" />
        </Switch>
        <DeleteAccountModal/>
        <Footer/>
      </Route>
    </Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <ThemedBody>
        {routes}
      </ThemedBody>
    </ThemeProvider>
  );
}

export default App;
