import React, { useEffect, useState } from "react";
import {Box,Button,Card,CardContent,Container,Grid,TextField,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";


import { getEmployeeDataActionInitiate } from "../src/redux/actions/getEmployeeAction";
import { postEmployeeDataActionInitiate } from "../src/redux/actions/addEmployeeAction";
import { deleteEmployeeDataActionInitiate } from "../src/redux/actions/deleteEmployeeAction";
import { putEmployeeDataActionInitiate } from "../src/redux/actions/updateEmployeeAction"; 
const EmployeeTable = () => {
  const dispatch = useDispatch();

  const { data: employees, loading, error } = useSelector(
    (state) => state.getemployeedata
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getEmployeeDataActionInitiate());
  }, [dispatch]);

  const resetForm = () => {
    setForm({ name: "", email: "", city: "", phone: "" });
    setErrors({});
    setEditingId(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      await dispatch(putEmployeeDataActionInitiate(form, editingId));
    } else {
      await dispatch(postEmployeeDataActionInitiate(form));
    }


    dispatch(getEmployeeDataActionInitiate());
    resetForm();
  };

 
  const handleEdit = (emp) => {
    setEditingId(emp.id || emp._id); 
    setForm(emp);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await dispatch(deleteEmployeeDataActionInitiate(id));

      dispatch(getEmployeeDataActionInitiate());
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Management
      </Typography>

      
      <Card sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editingId ? "Edit Employee" : "Add New Employee"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                {editingId ? "Update Employee" : "Add Employee"}
              </Button>
              {editingId && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{ ml: 2 }} 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Card>

      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Card>
        <CardContent>
          <Typography variant="h6">Employee List</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees && employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  employees && employees.map((emp, index) => (
                    <TableRow key={emp.id || emp._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.city}</TableCell>
                      <TableCell>{emp.phone}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(emp)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(emp.id || emp._id)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeTable;