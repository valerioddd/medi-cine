const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/series.json');

const getSeriesByKeyword = (keyword) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.series.filter(series => 
        series.title.toLowerCase().includes(keyword.toLowerCase())
    );
};

const getSeriesById = (id) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.series.find(series => series.id === id);
};

const getEpisodesByTags = (tags) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let episodes = [];
    data.series.forEach(series => {
        series.episodes.forEach(episode => {
            if (episode.tags && episode.tags.some(tag => tags.includes(tag.toLowerCase()))) {
                episodes.push(episode);
            }
        });
    });
    return episodes;
};

module.exports = { getSeriesByKeyword, getSeriesById, getEpisodesByTags };
