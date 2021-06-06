import React from "react";
import { TextField } from "@material-ui/core";
import FormContainer, { makeRowFormElem } from "./../FormContainer";
import { SelectInp } from "./../Inputs";

const rows = [
  makeRowFormElem("Name", () => (
    <TextField id="name" label="Enter a name" fullWidth />
  )),
  makeRowFormElem("Email", () => (
    <TextField id="email" label="Enter an email" fullWidth />
  )),
  makeRowFormElem("Phone", () => (
    <TextField id="phone" label="Enter a phone number" fullWidth />
  )),
  makeRowFormElem("Type", () => (
    <SelectInp
      id="type"
      label="Choose a type"
    />
  )),
  makeRowFormElem("Created date", () => (
    <TextField
      id="createdDate"
      label="Enter a created date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  )),
];

const NewContact = () => <FormContainer rows={rows} />;

export default NewContact;
