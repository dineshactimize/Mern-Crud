import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      trim: true
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
   },
   phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
         validator: function (v) {
            return /^\d{10}$/.test(v);
         },
         message: props => `${props.value} is not a valid 10 digit phone number!`
      }
   },
   city: {
      type: String,
      trim: true,
      default: ''
   }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;