import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Formik} from "formik";
import * as yup from "yup";
import LinearProgress from "src/components/LinearProgress";
import Services from "../services/services";

const uploadService = new Services();


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [salida, setSalida] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Progress = (data) => {
        setSalida("Uploading...   " + data);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add File
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Files</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            file: null,
                            type: props.type ? props.type : "multiple",
                            typeDoc: props.typeDoc ? props.typeDoc : ".doc,.docx,application/msword,.xlsx,.xls,.pdf"
                        }}
                        onSubmit={async (values) => {
                            const allImages = [];

                            if (props.type === "single") {
                                const {data} = await uploadService.upload(values.file[0])
                                allImages.push(data.data.image);
                                Progress(values.file[0].name)
                            } else {
                                for (let i = 0; i < values.file.length; i++) {
                                    const {data} = await uploadService.upload(values.file[i])
                                    allImages.push(data.data.image);
                                    Progress(values.file[i].name)
                                }
                            }
                            props.onReturnPhoto(allImages)
                            handleClose()
                        }}
                        validationSchema={yup.object().shape({
                            file: yup.mixed().required(),
                        })}
                        render={({values, handleSubmit, setFieldValue}) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <Button type="submit" className="btn btn-primary">Upload</Button>
                                        <Button onClick={handleClose} color="primary">Close</Button>
                                    </div>
                                    <div className="form-group">
                                        <label for="file">File upload</label>
                                        {props.type !== "single" ?
                                            <input id="file" name="file" type="file" accept={values.typeDoc} multiple
                                                   onChange={(event) => {
                                                       setFieldValue("file", event.currentTarget.files);
                                                   }} className="form-control"/>
                                            :
                                            <input id="file" name="file" type="file" accept={values.typeDoc}
                                                   onChange={(event) => {
                                                       setFieldValue("file", event.currentTarget.files);
                                                   }} className="form-control"/>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                        {salida !== "" && <LinearProgress/>}
                                        {salida}
                                    </div>
                                    <br/>
                                </form>
                            );
                        }}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}
