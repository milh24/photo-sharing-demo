import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import CreatePostModal from "components/modals/CreatePostModal";
import PostCard from "components/PostCard";
import Snackbar from "components/SnackBar";
import TopBar from "components/TopBar";
import PostContext from "contexts/postContext";
import UserContext from "contexts/userContext";
import React, { FC, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useModal } from "react-modal-hook";

const PostScreen: FC = () => {
  const { list, allLoaded, loadMore } = useContext(PostContext);
  const { user, logout } = useContext(UserContext);
  const classes = useStyles();
  const [showCreatePost, hideCreatePost] = useModal(({ in: open }) => (
    <CreatePostModal visible={open} onClose={hideCreatePost} />
  ));

  return (
    <Box className={classes.root}>
      <TopBar
        title="InstaPic"
        extra={
          <Button color="secondary" onClick={logout}>
            Logout
          </Button>
        }
      />
      <Container className={classes.body}>
        <Snackbar message={"123"} />
        <InfiniteScroll
          dataLength={list.length}
          next={loadMore}
          hasMore={!allLoaded}
          loader={
            <Typography textAlign="center" color="textSecondary" p={2}>
              Loading...
            </Typography>
          }
          endMessage={
            <Typography textAlign="center" color="textSecondary" p={2}>
              All post loaded
            </Typography>
          }
        >
          <List>
            {list.map((e, i) => (
              <PostCard key={e.id} post={e} />
            ))}
          </List>
        </InfiniteScroll>
      </Container>
      <AppBar className={classes.bottomBar} position="fixed" elevation={0}>
        <Toolbar>
          <Container className={classes.bottomBarContainer}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Avatar alt={user?.name} src="/broken-image.jpg" />
              <Fab
                className={classes.fab}
                color="secondary"
                onClick={showCreatePost}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PostScreen;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  body: {
    paddingTop: 60,
    paddingBottom: 60,
    position: "relative",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 60,
  },
  bottomBar: {
    backgroundColor: "white",
    borderTop: `1px solid ${theme.palette.divider}`,
    top: "auto",
    bottom: 0,
    color: "black",
  },
  bottomBarContainer: {
    position: "relative",
  },
}));
