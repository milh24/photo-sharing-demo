import { ThemeProvider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stack from "@material-ui/core/Stack";
import StyledEngineProvider from "@material-ui/core/StyledEngineProvider";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "components/SnackBar";
import PostContext from "contexts/postContext";
import UserContext from "contexts/userContext";
import { usePost } from "hooks/post";
import { useUser } from "hooks/user";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import { ModalProvider } from "react-modal-hook";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import LoginScreen from "screens/Login";
import PostScreen from "screens/Post";
import { lightTheme } from "theme/theme";

function App() {
  const { user, initialized, loading, register, login, logout } = useUser();
  const { list, create, allLoaded, loadMore, ...post } = usePost(user);
  const classes = useStyles();

  return (
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider SnackbarComponent={Snackbar}>
          <UserContext.Provider
            value={{
              user: user,
              loading: loading,
              register: register,
              login: login,
              logout: logout,
            }}
          >
            <PostContext.Provider
              value={{
                list: list,
                loading: post.loading,
                create: create,
                allLoaded: allLoaded,
                loadMore: loadMore,
              }}
            >
              <ModalProvider rootComponent={TransitionGroup}>
                <Box className={classes.root}>
                  <Router>
                    {initialized && (
                      <Switch>
                        <Route
                          path="/"
                          component={user ? PostScreen : LoginScreen}
                        />
                        <Redirect to="/" />
                      </Switch>
                    )}
                    {!initialized && (
                      <Stack
                        style={{ height: "100%" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CircularProgress />
                      </Stack>
                    )}
                  </Router>
                </Box>
              </ModalProvider>
            </PostContext.Provider>
          </UserContext.Provider>
        </SnackbarProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));
