import Employee from '../models/Employee.js';

const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;

        const employee = new Employee({
            name,
            email,
            phone,
            city
        });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.error("there is an error:", error);
        res.status(500).json({ message: 'server error' });
    }
};

const getEmployees = async (req, res) => {
    console.log("GET /employees route hit");
    try {
        console.log("get touched");
        const employee = await Employee.find();
        res.status(200).json(employee);
    } catch (error) {
        console.error("there is an error :", error);
        res.status(500).json({ message: "server error" });
    }
};

const singleEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    }
    catch (error) {
        console.error("there is an error :", error);
        res.status(500).json({ message: "server error" });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;
        const myEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, city },
            { new: true }
        );
        if (!myEmployee) {
            return res.status(404).json({ message: "employee not found" });
        }
        res.status(200).json(myEmployee);
    }
    catch (error) {
        console.error("there is an error :", error);
        res.status(500).json({ message: "server error" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted" });
    } catch (error) {
        console.error("there is an error:", error);
        res.status(500).json({ message: "server error" });
    }
};

// Exporting as a default object to match your routes import
export default {
    createEmployee,
    getEmployees,
    singleEmployee,
    updateEmployee,
    deleteEmployee
};