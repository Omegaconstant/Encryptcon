import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Chip,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DropdownCheck = ({  items, selectedItems, onSelectedItemsChange }) => {

  const handleChange = (event) => {
    onSelectedItemsChange(event.target.value);
  };

  const handleDelete = (item) => () => {
    const newSelectedItems = [...selectedItems];
    const index = newSelectedItems.indexOf(item);
    if (index > -1) {
      newSelectedItems.splice(index, 1);
      onSelectedItemsChange(newSelectedItems);
    }
  };

  return (
    <FormControl sx={{ width: "90%" }} my={2} ms={2} variant="outlined">
      <InputLabel id="dropdown-label">Assets</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="dropdown"
        label="Assets"
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selected.map((item) => (
              <Box key={item}>
                <Chip
                  label={item}
                  onDelete={handleDelete(item)}
                  deleteIcon={<CloseIcon />}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownCheck;
