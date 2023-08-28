import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "../style/themes/theme";
import EmployeeService from "../service/EmployeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        EmployeeService.getEmployees().then((response) => {
          setEmployees(response.data);
        });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchEmployees();
  }, []);

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);

    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedEmployee(null);
    setOpenEditModal(false);
  };

  const handleEditEmployee = async () => {
    try {
      console.log(selectedEmployee);
      console.log(selectedEmployee.employeeId);
      const updatedEmployee = await EmployeeService.updateEmployee(
        selectedEmployee,
        selectedEmployee.employeeId
      );
      console.log(updatedEmployee);
      const updatedEmployees = employees.map((employee) =>
        employee.employeeId === selectedEmployee.employeeId
          ? { ...employee, ...selectedEmployee }
          : employee
      );
      console.log("Updated Loans is: ", updatedEmployees);
      setEmployees(updatedEmployees);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing employee details:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employees ?"
    );
    if (confirmDelete) {
      try {
        console.log(employeeId);
        const response = await EmployeeService.deleteEmployee(employeeId);
        if (response.data.hasOwnProperty("true")) {
          const updatedEmployees = employees.filter(
            (employee) => employee.employeeId !== employeeId
          );
          console.log(updatedEmployees);
          setEmployees(updatedEmployees);

          alert("Employee Deleted Successfully");
        } else {
          alert(response.data.false);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
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

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid grey",
          boxShadow: theme.shadows[10],
          marginTop: "20px",
          marginBottom: "20px",
          minimumHeight: 600,
          width: { xs: "100%" },
        }}
      >
        <Table aria-label="loans table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Designation </StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Date of joining</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Date 0f birth</StyledTableCell>
              <StyledTableCell>Phone no.</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.employeeId}>
                <StyledTableCell>{employee.employeeId}</StyledTableCell>
                <StyledTableCell>
                  {employee.fname + " " + employee.lname}
                </StyledTableCell>
                <StyledTableCell>{employee.designation}</StyledTableCell>
                <StyledTableCell>{employee.department}</StyledTableCell>
                <StyledTableCell>{employee.dateOfJoining}</StyledTableCell>
                <StyledTableCell>{employee.gender}</StyledTableCell>
                <StyledTableCell>{employee.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{employee.phoneNo}</StyledTableCell>
                <StyledTableCell>{employee.email}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Edit the Employee Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(employee)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete the Employee">
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleDeleteEmployee(employee.employeeId)}
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

      {/* Edit Employee Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Employee Details</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="ID"
              fullWidth
              margin="dense"
              value={selectedEmployee ? selectedEmployee.employee_id : ""}
              disabled
            />
            <Stack spacing={2} direction="row">
              <TextField
                label="Full Name"
                margin="dense"
                value={selectedEmployee ? selectedEmployee.fname : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    fname: e.target.value,
                  })
                }
              ></TextField>
              <TextField
                label="Last Name"
                margin="dense"
                value={selectedEmployee ? selectedEmployee.lname : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    lname: e.target.value,
                  })
                }
              ></TextField>
            </Stack>
            <TextField
              label="Designation"
              margin="dense"
              value={selectedEmployee ? selectedEmployee.designation : ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  designation: e.target.value,
                })
              }
            ></TextField>
            <TextField
              label="Department"
              margin="dense"
              value={selectedEmployee ? selectedEmployee.department : ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  department: e.target.value,
                })
              }
            ></TextField>
            <TextField
              label="Gender"
              margin="dense"
              value={selectedEmployee ? selectedEmployee.gender : ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  gender: e.target.value,
                })
              }
            ></TextField>
            <Stack spacing={2} direction="row">
              <TextField
                label="Date of Birth"
                margin="dense"
                value={selectedEmployee ? selectedEmployee.dateOfBirth : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    dateOfBirth: e.target.value,
                  })
                }
              ></TextField>
              <TextField
                label="Date of joining"
                margin="dense"
                value={selectedEmployee ? selectedEmployee.dateOfJoining : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    dateOfJoining: e.target.value,
                  })
                }
              ></TextField>
            </Stack>
            <TextField
              label="Phone no."
              margin="dense"
              value={selectedEmployee ? selectedEmployee.phoneNo : ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  phoneNo: e.target.value,
                })
              }
            ></TextField>
            <TextField
              label="Email"
              margin="dense"
              value={selectedEmployee ? selectedEmployee.email : ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  email: e.target.value,
                })
              }
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditEmployee} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Employees;
