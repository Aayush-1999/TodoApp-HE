import React, { useState } from 'react';
import clsx from 'clsx';
import {Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ArchiveIcon from '@material-ui/icons/Archive';
import styles from './SideDrawer.styles';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(styles)

function SideDrawer(props) {
  const classes = useStyles();
  const [selectedIndex,setSelectedIndex] = useState(1);

  const handleListItemClick = (event,index) => {
      setSelectedIndex(index);
  }

  return (
    <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
        })}
        classes={{
            paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
            }),
        }}
    >
        <Toolbar />
        <List>
            <ListItem button
                classes={{root:classes.listItem}} 
                component={RouterLink} 
                to='/task' 
                selected={selectedIndex === 1} 
                onClick={(event)=>handleListItemClick(event,1)}  
            > 
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem button
                component={RouterLink} 
                classes={{root:classes.listItem}} 
                to='/archive'
                selected={selectedIndex === 0} 
                onClick={(event)=>handleListItemClick(event,0)}  
                >
                <ListItemIcon><ArchiveIcon /></ListItemIcon>
                <ListItemText primary="Archive" />
            </ListItem>
        </List>
    </Drawer>
  );
}

export default SideDrawer;