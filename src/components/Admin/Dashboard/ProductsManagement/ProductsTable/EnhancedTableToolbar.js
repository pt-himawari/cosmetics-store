import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMultipleCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";
import filtersSlice from "../../../../../reducers/filtersSlice";
import { cosmeticsListSelector } from "../../../../../redux-toolkit/selectors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const filters = ["All", "skincare", "makeup", "haircare"];

function EnhancedTableToolbar(props) {
  const { numSelected, selected, setSelected } = props;
  const products = useSelector(cosmeticsListSelector);
  const topProduct = products.slice(0, 10);
  console.log(topProduct);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const timer = React.useRef();
  const [anchorElUser, setAnchorElUser] = useState("");
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleRemoveProduct = () => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(removeMultipleCosmeticsThunkAction(selected));
      timer.current = window.setTimeout(() => {
        setIsCompleted(true);
        setIsLoading(false);
        window.setTimeout(() => {
          setOpen(false);
          setSelected([]);
          setIsLoading(false);
          setIsCompleted(false);
        }, 1000);
      }, 2000);
    }
  };
  return (
    <Toolbar
      sx={{
        gap: "5px",
        borderBottom: "2px solid #e0e0e0",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        alignItems: "center",
        justifyContent: "space-between",
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
          sx={{ flex: "1" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1", fontWeight: 800, color: "#65636d" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Cosmetics
        </Typography>
      )}

      <Autocomplete
        sx={{ width: 300 }}
        freeSolo
        size="small"
        id="free-solo-2-demo"
        disableClearable
        options={topProduct.map((option) => option.name)}
        inputValue={searchText}
        onInputChange={(event, newInputValue) => {
          setSearchText(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  // Xử lý sự kiện khi Enter được nhấn
                  dispatch(
                    filtersSlice.actions.setSearchText(event.target.value)
                  );
                  setSearchText("");
                }
              },
            }}
          />
        )}
      />
      {/* </Box> */}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setOpen(false);
            }}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent
              sx={{
                p: "10px",
                pb: 0,

                width: "450px",
              }}
            >
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  width: "100%",
                  minHeight: "100px",
                }}
              >
                {!isLoading && !isCompleted && (
                  <Alert severity="warning">
                    <AlertTitle>Confirm Deletion</AlertTitle>
                    Are you sure you want to delete?
                    <strong> This action cannot be undone! </strong>
                  </Alert>
                )}

                <Box
                  sx={{
                    textAlign: "center",
                    py: isLoading || isCompleted ? 3 : 0,
                  }}
                >
                  {isLoading && <CircularProgress color="success" size={60} />}
                  {isCompleted && (
                    <>
                      <Fab color="success">
                        <CheckIcon />
                      </Fab>
                      <p>Deletion successful!</p>
                    </>
                  )}
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                pt: 1,
              }}
            >
              <Button
                color="secondary"
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "#8e8c99",
                  "&:hover": {
                    backgroundColor: "#8b8d98",
                    opacity: 0.8,
                    color: "white", // Màu văn bản khi hover
                  },
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="error"
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "#E64D4C",
                  "&:hover": {
                    backgroundColor: "#CC4343",
                    opacity: 0.8,
                    color: "white", // Màu văn bản khi hover
                  },
                }}
                onClick={handleRemoveProduct}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton
              color="secondary"
              onClick={(event) => setAnchorElUser(event.currentTarget)}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "47px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            {filters.map((filter) => (
              <MenuItem
                onClick={() => {
                  dispatch(filtersSlice.actions.setSearchType(filter));
                  // setType(filter);
                  setAnchorElUser(null);
                }}
                key={filter}
              >
                <ListItemText
                  sx={{
                    color: "#121f43",
                    textTransform: "capitalize",
                  }}
                >
                  {filter}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;
