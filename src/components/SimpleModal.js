import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Button,
  } from "@material-ui/core";

import Gallery from "src/components/gallery/Gallery";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log("SimpleModal.............",props.type)
  console.log("Docs.............",props.data)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Progress = (data) => {
    var sample = [];
    if (data){
      for (let i = 0; i < data.length; i++) {
        sample.push(<div><a href={data[i]}  target="_blank" rel="noreferrer">Document upload: {(i+1)}</a></div> );
      }
    }
    return sample;
  };

  return (
    <div>
      <Button type="button" color="primary" onClick={handleOpen}>
          See Docs
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.type !== "docs" ?  "Gallery": "Documents" }   </h2><br/>
            {props.type !== "docs" ?  <Gallery data={props}/> :  Progress(props.data)  }

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
