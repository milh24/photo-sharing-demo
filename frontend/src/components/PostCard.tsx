import Divider from "@material-ui/core/Divider";
import Stack from "@material-ui/core/Stack";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Post } from "models/post";
import { FC } from "react";

const PostCard: FC<{ post: Post }> = (props) => {
  const { post } = props;
  const classes = useStyles();

  return (
    <Stack className={classes.root} justifyContent="space-between" spacing={2}>
      <img className={classes.img} src={post.photoUrl} alt="" />
      <Divider />
      <Typography variant="caption">{post.authorName}</Typography>
      <Typography>{post.caption}</Typography>
      <Typography color="textSecondary" variant="caption">
        {post.createdAt}
      </Typography>
    </Stack>
  );
};

export default PostCard;

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    padding: theme.spacing(2),
    margin: `${theme.spacing(2)} 0`,
  },
  img: {
    maxWidth: "100%",
    borderRadius: 12,
  },
}));
