import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeMultipleCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function EnhancedTableToolbar(props) {
  const { numSelected, selected, setSelected } = props;
  console.log(props);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timer = React.useRef();

  const removeMultipleProduct = () => {};
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleRemoveProduct = () => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(removeMultipleCosmeticsThunkAction(selected));

      // setSelected([]);
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
        borderBottom: "2px solid #e0e0e0",
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
          sx={{ flex: "1 1 100%", fontWeight: 800, color: "#65636d" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Cosmetics
        </Typography>
      )}

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
              {/* <CircularProgress color="success" /> */}
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
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;
