const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamingLinkSchema = new Schema({
    platform: String,
    link: String
});

const episodeSchema = new Schema({
    title: String,
    season: Number,
    episodeNumber: Number,
    description: String,
    thumbnail: String,  // Aggiungi il campo thumbnail
    streamingLinks: [streamingLinkSchema],  // Modifica streamingLink in un array di oggetti
    tags: [String]
});

const seriesSchema = new Schema({
    title: String,
    languages: [String],
    reliability: Number,
    episodes: [episodeSchema],
});

module.exports = mongoose.model('Series', seriesSchema);
