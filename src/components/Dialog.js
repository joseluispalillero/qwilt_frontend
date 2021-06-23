import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Formik} from "formik";
import * as yup from "yup";

//import upload from "../services/services";

import Services from "../services/services";
const uploadService = new Services();

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add Photo
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Image</DialogTitle>
        <DialogContent>
            <Formik 
              initialValues={{ file: null }}
              onSubmit={async (values) => {             
               
                const {data} = await uploadService.upload(values.file)  
                props.onReturnPhoto(data.data.image) 
                handleClose()
              }} 
              validationSchema={yup.object().shape({
                file: yup.mixed().required(),
              })}
              render={({ values, handleSubmit, setFieldValue }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Button type="submit" className="btn btn-primary">Upload</Button>
                        <Button onClick={handleClose} color="primary">Close</Button> 
                    </div>
                    <div className="form-group">
                      <label for="file">File upload</label>     
                      <input id="file" name="file" type="file" onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }} className="form-control" />
                      <Thumb file={values.file} />
                    </div>
                    <br/>
                  </form>
                );
              }} />           
    
              <div className="images-bar">
                <div className="masking-box gradient-to-left">
                    <img src={props.data} style={{height:200, width: 200, border:0}} />
                </div>
              </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
