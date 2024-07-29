const graphql = require('graphql');
const { getSeriesByKeyword, getSeriesById, getEpisodesByTags, getSeriesByEpisodeTags } = require('../services/seriesService');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql;

const StreamingLinkType = new GraphQLObjectType({
    name: 'StreamingLink',
    fields: () => ({
        platform: { type: GraphQLString },
        link: { type: GraphQLString }
    })
});

const EpisodeType = new GraphQLObjectType({
    name: 'Episode',
    fields: () => ({
        title: { type: GraphQLString },
        season: { type: GraphQLInt },
        episodeNumber: { type: GraphQLInt },
        description: { type: GraphQLString },
        thumbnail: { type: GraphQLString }, // Aggiungi il campo thumbnail
        streamingLinks: { type: new GraphQLList(StreamingLinkType) },
        tags: { type: new GraphQLList(GraphQLString) },
    }),
});

const SeriesType = new GraphQLObjectType({
    name: 'Series',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        languages: { type: new GraphQLList(GraphQLString) },
        reliability: { type: GraphQLInt },
        image: { type: GraphQLString },
        episodes: { type: new GraphQLList(EpisodeType) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        seriesByKeyword: {
            type: new GraphQLList(SeriesType),
            args: { keyword: { type: GraphQLString } },
            resolve(parent, args) {
                return getSeriesByKeyword(args.keyword);
            },
        },
        seriesById: {
            type: SeriesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return getSeriesById(args.id);
            },
        },
        episodesByTags: {
            type: new GraphQLList(EpisodeType),
            args: { tags: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args) {
                return getEpisodesByTags(args.tags);
            },
        },
        seriesByEpisodeTags: {
            type: new GraphQLList(SeriesType),
            args: { tags: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args) {
                return getSeriesByEpisodeTags(args.tags);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
