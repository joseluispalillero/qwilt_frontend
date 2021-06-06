import React from "react";
import { TextField } from "@material-ui/core";
import FormContainer, { makeRowFormElem } from "./../FormContainer";
import { SelectInp } from "./../Inputs";

const rows = [
  makeRowFormElem("Nickname", () => (
    <TextField id="nickname" label="Enter a nickname" fullWidth />
  )),
  makeRowFormElem("Address", () => (
    <TextField id="address" label="Enter an address" fullWidth />
  )),
  makeRowFormElem("Portfolio", () => (
    <SelectInp label="Choose a portfolio" id="portfolio" />
  )),
  makeRowFormElem("Type", () => <SelectInp label="Choose a type" id="type" opts={["Apartment", "Residential", "Mobile homes", "Fourplex"]}/>),
  makeRowFormElem("Category", () => (
    <SelectInp label="Choose a category" id="category" opts={["Residential", "Commercial"]} />
  )),
  makeRowFormElem("Status", () => (
    <SelectInp label="Choose a status" id="status" opts={["Vaccant", "Occupied"]}/>
  )),
  makeRowFormElem("Target Rent", () => (
    <TextField
      id="targetRent"
      label="Enter a target rent"
      type="number"
      fullWidth
    />
  )),
  makeRowFormElem("Rent Unit", () => (
    <TextField
      id="rentUnit"
      label="Enter a rent unit"
      type="number"
      fullWidth
    />
  )),
];

const newProperties = () => <FormContainer rows={rows} />;

export default newProperties;
