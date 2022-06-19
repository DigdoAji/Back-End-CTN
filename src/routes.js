const Joi = require('joi');
const { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
    insertArticleReview,
} = require('./handler/article-handler');
const { 
    insertNewEvent,
    getAllEvents,
    getDetailEventById,
    updateEventById,
    removeEventById,
    insertEventReview,
} = require('./handler/event-handler');

const routes = [
  
  // Article
  {
    method: 'POST',
    path: '/articles',
    handler: insertNewArticle,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          publisherName: Joi.string().required(),
          publishDate: Joi.string().required(),
          categories: Joi.string().required(),
        }),
      },
  },
  },
  {
    method: 'GET',
    path: '/articles',
    handler: getAllArticles,
  },
  {
    method: 'GET',
    path: '/articles/{articleId}',
    handler: getDetailArticleById,
  },
  {
    method: 'PUT',
    path: '/articles/{articleId}',
    handler: updateArticleById,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          publisherName: Joi.string().required(),
          publishDate: Joi.string().required(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/articles/{articleId}',
    handler: removeArticleById,
  },
  
  // Review Article
  {
    method: 'POST',
    path: '/review-articles',
    handler: insertArticleReview,
    options: {
      validate: {
        payload: Joi.object({
          _id: Joi.string().required(),
          name: Joi.string().required(),
          review: Joi.string().required(),
        }),
      },
    },
  },

  // Event
  {
    method: 'POST',
    path: '/events',
    handler: insertNewEvent,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          location: Joi.string().required(),
          date: Joi.string().required(),
          time: Joi.string().required(),
          timezone: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/events',
    handler: getAllEvents,
  },
  {
    method: 'GET',
    path: '/events/{eventId}',
    handler: getDetailEventById,
  },
  {
    method: 'PUT',
    path: '/events/{eventId}',
    handler: updateEventById,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          location: Joi.string().required(),
          date: Joi.string().required(),
          time: Joi.string().required(),
          timezone: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/events/{eventId}',
    handler: removeEventById,
  },
  
  // Review Event
  {
    method: 'POST',
    path: '/review-events',
    handler: insertEventReview,
    options: {
      validate: {
        payload: Joi.object({
          _id: Joi.string().required(),
          name: Joi.string().required(),
          review: Joi.string().required(),
        }),
      },
    },
  },
];
 
module.exports = routes;