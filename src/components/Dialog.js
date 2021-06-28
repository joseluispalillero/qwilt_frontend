import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Formik} from "formik";
import * as yup from "yup";


import Services from "../services/services";
const uploadService = new Services();


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageThumb = ({ image }) => {  
    return <img src={URL.createObjectURL(image)} alt={image.name} style={{height:200, width: 200, border:0}}/>;
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
                
                const allImages = [];
                for (let i = 0; i < values.file.length; i++) {
                  console.log("Subiendo imagen ", i," >>>> ",values.file.name)
                  const {data} = await uploadService.upload(values.file[i]) 
                  allImages.push(data.data.image);                  
                }
          
                props.onReturnPhoto(allImages) 
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
                      <input id="file" name="file" type="file" multiple onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files);
                        }} className="form-control" />
                        <br/>
                     {values.files && <ImageThumb image={values.files} />}
                    </div>
                    <br/>
                  </form>
                );
              }} />           
        </DialogContent>
      </Dialog>
    </div>
  );
}
