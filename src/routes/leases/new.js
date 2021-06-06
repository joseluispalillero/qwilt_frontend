import React from "react";
import { TextField } from "@material-ui/core";
import { SelectInp } from "./../Inputs";
import FormContainer, { makeRowFormElem } from "./../FormContainer";

const rows = [
  makeRowFormElem("Name", () => (
    <TextField id="name" label="Enter a name" fullWidth />
  )),
  makeRowFormElem("Status", () => (
    <SelectInp id="status" label="Choose a status" opts={["Active", "Terminated"]}/>
  )),
  makeRowFormElem("Start date", () => (
    <TextField
      id="startDate"
      label="Enter a date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  )),
  makeRowFormElem("End date", () => (
    <TextField
      id="endDate"
      label="Enter a date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  )),
  makeRowFormElem("Property name", () => (
    <SelectInp id="property" label="Choose a property" />
  )),
  makeRowFormElem("Created at", () => (
    <TextField
      id="createdAt"
      label="Enter a date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  )),
];

const NewLease = () => <FormContainer rows={rows} />;

export default NewLease;
