const { nanoid } = require('nanoid');
const articles = require('../data/content-article');

// Adding New Article
const insertNewArticle = (request, h) => {
    const {
      name,
      description,
      pictureId,
      publisherName,
      publishDate,
      categories,
    } = request.payload;

    const id = nanoid(16).toLowerCase();
    const userReviews = [];

    if (!name) {
      return h.response({
        error: true,
        status: 'fail',
        message: 'Failed Adding Article. Please insert name of the article',
      }).code(400);
    }

    articles.push({
      id,
      name,
      description,
      pictureId,
      publisherName,
      publishDate,
      categories,
      userReviews,
    });

    const isDataInserted = articles.filter((articleInserted) => articleInserted.id === id).length > 0;
    if (isDataInserted) {
      return h.response({
        error: false,
        status: 'success',
        message: 'New Article has been Added',
        articleId: id,
      }).code(201);
    }

    const response = h.response({
      error: true,
      status: 'fail',
      message: 'Article failed to add',
    });
    response.code(500);
    return response;
};

// Get All Articles
const getAllArticles = (request, h) => {
    const response = h.response({
        error: false,
        status: 'success',
        message: 'Show all article data',
        contentArticles: articles.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          pictureId: item.pictureId,
          publisherName: item.publisherName,
          publishDate: item.publishDate,
          categories: item.categories,
        })),
    });
    response.code(200);
    return response;
  };

// Get Detail Article By Id
const getDetailArticleById = (request, h) => {
    const { articleId } = request.params;
    const isArticleFound = articles.filter((articleDetail) => articleDetail.id === articleId)[0];

    if (isArticleFound) {
      return h.response({
        error: false,
        status: 'success',
        message: 'Show article data by ID',
        detailArticle: isArticleFound, 
      }).code(200);
    }
    
    const response = h.response({
      error: true,
      status: 'fail',
      message: 'Article Not Found',
    });
    response.code(404);
    return response;
};

// Update or Edit Article Item By Id
const updateArticleById = (request, h) => {
  const { articleId } = request.params;
  const {
    name,
    description,
    pictureId,
    publisherName,
    publishDate,
    categories,
  } = request.payload;
  
  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Failed Update Article. Please insert name of the article',
    }).code(400);
  }
  
  const isArticleUpdated = articles.findIndex((articleUpdated) => articleUpdated.id === articleId);
  if (isArticleUpdated !== -1){
    articles[isArticleUpdated] = {
      ...articles[isArticleUpdated],
      name,
      description,
      pictureId,
      publisherName,
      publishDate,
      categories,
    };
    return h.response({
      error: false,
      status: 'success',
      message: 'Article has been updated',
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'fail',
    message: 'Article failed to update. Article ID not found',
  });
  response.code(404);
  return response;
};

// Delete Article By Id
const removeArticleById = (request, h) => {
  const { articleId } = request.params;
  const isArticleDeleted = articles.findIndex((articleDeleted) => articleDeleted.id === articleId);

  if (isArticleDeleted !== -1){
    articles.splice(isArticleDeleted, 1);
    return h.response({
      error: false,
      status: 'success',
      message: 'Selected article has been removed',
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'fail',
    message: 'Selected article failed to remove. Article ID Not Found',
  });
  response.code(404);
  return response;
};

// Adding Review Article
const insertArticleReview = (request, h) => {
  const {
    id,
    name,
    review,
  } = request.payload;

  const reviewId = nanoid(6).toLowerCase();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('en-GB', options);

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review article failed to added. Please insert your name',
    }).code(400);
  }

  if (!id) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review article failed to added. Article ID not found',
    }).code(400);
  }

  const findIdArticle = articles.findIndex((articleIndex) => articleIndex.id === id);
  articles[findIdArticle].userReviews.push({
    reviewId,
    name,
    date,
    review,
  });

  const isReviewInserted = articles.filter((articleReview) => articleReview.id === id)[0];
  if (isReviewInserted) {
    return h.response({
      error: false,
      status: 'success',
      message: 'show commment of selected article',
      userReviews: articles[findIdArticle].userReviews.map((item) => ({
        reviewId: item.reviewId,
        name: item.name,
        date: item.date,
        review: item.review,
      })),
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'error',
    message: 'Review Article failed to add',
  });
  response.code(500);
  return response;
};

module.exports = { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
    insertArticleReview,
};