import React from "react";
import { TextField } from "@material-ui/core";
import { SelectInp } from "./../Inputs";
import FormContainer, { makeRowFormElem } from "./../FormContainer";

const rows = [
  makeRowFormElem("Owner", () => (
    <TextField id="owner" label="Enter fullname" fullWidth />
  )),
  makeRowFormElem("Nickname", () => (
    <TextField id="nickname" label="Enter a nickname" fullWidth />
  )),
  makeRowFormElem("Bank account", () => (
    <SelectInp label="Choose a bank account" id="bankAccount" />
  )),
  makeRowFormElem("Portfolio min", () => (
    <TextField id="portfolioMin" label="Enter a portfolio minimum" fullWidth />
  )),
  makeRowFormElem("Legal docs", () => (
    <SelectInp label="Choose legal documents" id="legalDocs" />
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

const newPortfolio = () => <FormContainer rows={rows} />;

export default newPortfolio;
