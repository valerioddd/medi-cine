const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: String,
    season: Number,
    episodeNumber: Number,
    description: String,
    streamingLink: String,
    tags: [String]
});

const seriesSchema = new Schema({
    title: String,
    languages: [String],
    reliability: String,
    episodes: [episodeSchema],
});

module.exports = mongoose.model('Series', seriesSchema);
