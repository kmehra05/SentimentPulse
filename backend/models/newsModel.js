// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  headlinesAndSentiments: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        sentiment: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  sentimentStats: {
    type: {
      averageScore: {
        type: Number,
        required: true
      },
      negatives: {
        type: Number,
        required: true
      },
      neutrals: {
        type: Number,
        required: true
      },
      positives: {
        type: Number,
        required: true
      },
    },
    required: true
  },

  addTime: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);
