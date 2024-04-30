// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    // type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, { timestamps: true, versionKey: false });

// Index for geoLocation for efficient querying
postSchema.index({ geoLocation: '2dsphere' });

const Post = mongoose.model('post', postSchema);

module.exports = Post;
