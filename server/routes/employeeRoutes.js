import express from 'express';
import employeeController from '../controllers/employeeController.js';
import Employee from '../models/Employee.js'; 

const router = express.Router();

console.log("employeeRoutes file loaded");

// Routes
router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.singleEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;