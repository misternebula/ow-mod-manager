import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  makeStyles,
  Tooltip,
} from '@material-ui/core';

import runOwml from '../services/run-owml';
import { useAppState } from './AppState';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const TopBar: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();
  const { modMap } = useAppState();

  const requiredMods = Object.values(modMap).filter((mod) => mod.isRequired);
  const isMissingRequiredMod = requiredMods.some(
    (mod) => mod.localVersion === undefined,
  );
  const requiredModNames = requiredMods.map((mod) => mod.name).join(', ');

  return (
    <>
      <AppBar color="default">
        <Toolbar>
          <Container className={classes.container}>
            {children}
            <Tooltip
              title={
                isMissingRequiredMod
                  ? `Please install ${requiredModNames} before starting the game`
                  : ''
              }
            >
              <span>
                <Button
                  onClick={runOwml}
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={isMissingRequiredMod}
                >
                  Start Game
                </Button>
              </span>
            </Tooltip>
          </Container>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default TopBar;
