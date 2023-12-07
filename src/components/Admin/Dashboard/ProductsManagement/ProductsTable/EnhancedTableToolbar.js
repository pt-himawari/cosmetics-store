import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMultipleCosmeticsThunkAction,
  fetchCosmeticsThunkAction,
} from "../../../../../reducers/cosmeticSlice";

import { useNavigate } from "react-router-dom";

function EnhancedTableToolbar(props) {
  const { numSelected, selected, setSelected } = props;
  console.log(props);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeMultipleProduct = () => {
    dispatch(removeMultipleCosmeticsThunkAction(selected));

    setSelected([]);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeMultipleProduct}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;
