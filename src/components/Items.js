import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemService from "../service/ItemService";
import theme from "../style/themes/theme";

export default function Items() {
  const [items, setItems] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [newItem, setNewItem] = useState({
    itemId: "",
    itemDescription: "",
    itemMake: "",
    issueStatus: "N",
    itemCategory: "",
    itemValuation: 0,
  });
  useEffect(() => {
    async function fetchItems() {
      try {
        ItemService.getItems().then((response) => {
          setItems(response.data);
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewItem({
      itemId: "",
      itemDescription: "",
      itemMake: "",
      issueStatus: "N",
      itemCategory: "",
      itemValuation: 0,
    });
  };

  const handleAddItem = async () => {
    try {
      const addedItem = await ItemService.createItem(newItem);

      newItem.itemId = addedItem.data.itemId;

      setItems([...items, newItem]);
      console.log("new item is", newItem);
      console.log("Added Item is", addedItem);
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleOpenEditModal = (item) => {
    if (item.issueStatus === "Y") {
      alert("Can't Edit the Item. Item is already issued!!");
    } else {
      setSelectedItem(item);

      setOpenEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setOpenEditModal(false);
  };

  const handleEditItem = async () => {
    try {
      console.log(selectedItem);
      console.log(selectedItem.itemId);
      const updatedItem = await ItemService.updateItem(
        selectedItem,
        selectedItem.itemId
      );
      console.log(updatedItem);
      const updatedItems = items.map((item) =>
        item.itemId === selectedItem.itemId
          ? { ...item, ...selectedItem }
          : item
      );

      setItems(updatedItems);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing  item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      console.log(itemId);
      const response = await ItemService.deleteItem(itemId);
      console.log(response);
      if (response.data.hasOwnProperty("true")) {
        const updatedItems = items.filter((item) => item.itemId !== itemId);
        console.log(updatedItems);
        setItems(updatedItems);
        // Show alert or notification
        alert("Item Deleted Successfully");
      } else {
        alert(response.data.false);
      }
    } catch (error) {
      console.error("Error deleting Item:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      textAlign: "center",
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        Items
      </Typography>
      <Tooltip title="Add New Item">
        <Fab
          color="secondary"
          onClick={handleOpenAddModal}
          aria-label="add"
          size="small"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid grey",
          boxShadow: theme.shadows[10],
          marginTop: "20px",
          marginBottom: "20px",
          minimumHeight: 600,
          width: { xs: "100%", md: "75%" },
        }}
      >
        <Table aria-label="items table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Item Description</StyledTableCell>
              <StyledTableCell>Item Make</StyledTableCell>
              <StyledTableCell>Item Status</StyledTableCell>
              <StyledTableCell>Item Category</StyledTableCell>
              <StyledTableCell>Item Value</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <StyledTableRow key={item.itemId}>
                <StyledTableCell>{item.itemId}</StyledTableCell>
                <StyledTableCell>{item.itemDescription}</StyledTableCell>
                <StyledTableCell>{item.itemMake}</StyledTableCell>
                <StyledTableCell>{item.issueStatus}</StyledTableCell>
                <StyledTableCell>{item.itemCategory}</StyledTableCell>
                <StyledTableCell>{item.itemValuation}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Edit the Item">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(item)}
                      disabled={item.issueStatus === "Y"}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete the Item">
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleDeleteItem(item.itemId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Item Description"
              fullWidth
              margin="dense"
              required
              //select
              value={newItem.itemDescription}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  itemDescription: e.target.value.toUpperCase(),
                })
              }
            ></TextField>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Item Make"
              fullWidth
              margin="dense"
              required
              //select
              value={newItem.itemMake}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  itemMake: e.target.value.toUpperCase(),
                })
              }
            ></TextField>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Item Category"
              fullWidth
              margin="dense"
              required
              //select
              value={newItem.itemCategory}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  itemCategory: e.target.value.toUpperCase(),
                })
              }
            ></TextField>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Item Valuation"
              fullWidth
              margin="dense"
              required
              //select
              value={newItem.itemValuation}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  itemValuation: e.target.value.toUpperCase(),
                })
              }
            ></TextField>
          </Box>
          <DialogActions>
            <Button onClick={handleCloseAddModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddItem} color="primary">
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="ID"
              fullWidth
              margin="dense"
              value={selectedItem ? selectedItem.itemId : ""}
              disabled
            />

            <TextField
              label="Item Description"
              fullWidth
              margin="dense"
              required
              //select
              value={
                selectedItem ? selectedItem.itemDescription.toUpperCase() : ""
              }
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  itemDescription: e.target.value.toUpperCase(),
                })
              }
            />

            <TextField
              label="Item Make"
              fullWidth
              margin="dense"
              required
              //select
              value={selectedItem ? selectedItem.itemMake.toUpperCase() : ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  itemMake: e.target.value.toUpperCase(),
                })
              }
            />

            <TextField
              label="Item Status"
              fullWidth
              margin="dense"
              //select
              value={selectedItem ? selectedItem.issueStatus.toUpperCase() : ""}
              disabled
              // onChange={(e) => setSelectedItem({ ...selectedItem, issueStatus: e.target.value.toUpperCase() })}
            />

            <TextField
              label="Item Category"
              fullWidth
              margin="dense"
              required
              //select
              value={
                selectedItem ? selectedItem.itemCategory.toUpperCase() : ""
              }
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  itemCategory: e.target.value.toUpperCase(),
                })
              }
            />

            <TextField
              label="Item Valuation"
              fullWidth
              margin="dense"
              required
              //select
              value={selectedItem ? selectedItem.itemValuation : ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  itemValuation: e.target.value.toUpperCase(),
                })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
