const fs = require('fs');
const path = require('path');
const logger = require('../logger'); // Assicurati che il percorso sia corretto

const filePath = path.join(__dirname, '../../data/series.json');

const getSeriesByKeyword = (keyword) => {
    logger.info(`getSeriesByKeyword called with keyword: ${keyword}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data || !data.series) {
        logger.error('No series data found');
        return [];
    }
    return data.series.filter(series => 
        series.title.toLowerCase().includes(keyword.toLowerCase())
    );
};

const getSeriesById = (id) => {
    logger.info(`getSeriesById called with id: ${id}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data) {
        logger.error('No series data found');
        return null;
    }
    return data.find(series => series.id === id);
};

const getEpisodesByTags = (tags) => {
    logger.info(`getEpisodesByTags called with tags: ${tags}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data || !data.series) {
        logger.error('No series data found');
        return [];
    }
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

const getSeriesByEpisodeTags = (tags) => {
    logger.info(`getSeriesByEpisodeTags called with tags: ${tags}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    logger.info(`getSeriesByEpisodeTags data: ${data}`);

    if (!data) {
        logger.error('No series data found');
        return [];
    }
    const seriesMap = new Map();

    data.forEach(series => {
        const matchingEpisodes = series.episodes.filter(episode => {
            logger.info(`Checking episode: ${episode.title} with tags: ${episode.tags}`);
            return episode.tags && episode.tags.some(tag => tags.includes(tag.toLowerCase()));
        });

        if (matchingEpisodes.length > 0) {
            logger.info(`Series: ${series.title} has matching episodes`);
            seriesMap.set(series.id, {
                ...series,
                episodes: matchingEpisodes,
            });
        }
    });

    logger.info(`Series map size: ${seriesMap.size}`);
    return Array.from(seriesMap.values());
};

module.exports = { getSeriesByKeyword, getSeriesById, getEpisodesByTags, getSeriesByEpisodeTags };
