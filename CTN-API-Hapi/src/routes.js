const { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
} = require('./handler/article-handler');
const { 
    insertNewEvent,
    getAllEvents,
    getDetailEventById,
    updateEventById,
    removeEventById,
} = require('./handler/event-handler');

const routes = [
  // Article
  {
    method: 'POST',
    path: '/articles',
    handler: insertNewArticle,
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
  },
  {
    method: 'DELETE',
    path: '/articles/{articleId}',
    handler: removeArticleById,
  },
  // Event
  {
    method: 'POST',
    path: '/events',
    handler: insertNewEvent,
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
  },
  {
    method: 'DELETE',
    path: '/events/{eventId}',
    handler: removeEventById,
  },
];
 
module.exports = routes;