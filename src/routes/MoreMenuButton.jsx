import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const MoreMenuButton = ({ i, opts = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const id = "more-menu-" + i;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <TableCell>
      <IconButton aria-controls={id} onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {opts.map(({ str = "", onClickFunc = handleClose }, i) => (
          <MenuItem key={i} onClick={onClickFunc}>
            {str}
          </MenuItem>
        ))}
      </Menu>
    </TableCell>
  );
};

export default MoreMenuButton;
