import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
    trim: true,
    minlength: [1, 'Todo text cannot be empty'],
    maxlength: [500, 'Todo text cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true
  }
});

// Add index for better query performance
todoSchema.index({ createdAt: -1 });

export const Todo = mongoose.model('Todo', todoSchema); 