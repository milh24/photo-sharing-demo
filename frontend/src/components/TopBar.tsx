import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FC, ReactNode } from "react";

const TopBar: FC<{ title: string; extra?: ReactNode }> = (props) => {
  const { title, extra } = props;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{title}</Typography>
            {extra}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
