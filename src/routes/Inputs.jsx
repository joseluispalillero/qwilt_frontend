import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export const SelectInp = ({
  label,
  id,
  opts = [
    "One", "Two", "Three"
  ],
}) => {
  const [selectValue, setSelectValue] = useState("");
  const handleChangeValue = (e) => {
    setSelectValue(e.target.value);
  };
  const labelId = id + "-label";
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={selectValue}
        onChange={handleChangeValue}
        labelId={labelId}
        id={id}
      >
        {opts.map((opt, i) => (
          <MenuItem key={i} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
