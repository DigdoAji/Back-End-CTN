const { nanoid } = require('nanoid');
const events = require('../data/content-events');

// Adding New Event
const insertNewEvent = (request, h) => {
    const {
      name,
      location,
      date,
      time,
      description,
      pictureId,
      categories,
    } = request.payload;

    const id = nanoid(16).toLowerCase();
    const userReviews = [];

    if (!name) {
      return h.response({
        error: true,
        status: 'fail',
        message: 'Failed Adding Event. Please insert name of the event',
      }).code(400);
    }

    events.push({
      id,
      name,
      location,
      date,
      time,
      description,
      pictureId,
      categories,
      userReviews
    });

    const isDataInserted = events.filter((eventInserted) => eventInserted.id === id).length > 0;
    if (isDataInserted) {
      return h.response({
        error: false,
        status: 'success',
        message: 'New Event has been Added',
        eventId: id,
      }).code(201);
    }

    const response = h.response({
      error: true,
      status: 'error',
      message: 'Event failed to add',
    });
    response.code(500);
    return response;
};

// Get All events
const getAllEvents = (request, h) => {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show all event data',
        contentEvents: events.map((item) => ({
          id: item.id,
          name: item.name,
          location: item.location,
          date: item.date,
          time: item.time,
          description: item.description,
          pictureId: item.pictureId,
          categories: item.categories,
        })),
    });
    response.code(200);
    return response;
  };

// Get Detail Event By Id
const getDetailEventById = (request, h) => {
    const { eventId } = request.params;
    const isEventFound = events.filter((eventDetail) => eventDetail.id === eventId)[0];

    if (isEventFound) {
      return h.response({
        error: false,
        status: 'success',
        message: 'Show event data by ID',
        detailEvent: isEventFound, 
      }).code(200);
    }
    
    const response = h.response({
      error: true,
      status: 'fail',
      message: 'Event not found',
    });
    response.code(404);
    return response;
};

// Update or Edit Event Item By Id
const updateEventById = (request, h) => {
  const { eventId } = request.params;
  const {
    name,
    location,
    date,
    time,
    description,
    pictureId,
    categories,
  } = request.payload;
  
  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Event failed to Update. Please insert name of the event',
    }).code(400);
  }
  
  const isEventUpdated = events.findIndex((eventUpdated) => eventUpdated.id === eventId);
  if (isEventUpdated !== -1){
    events[isEventUpdated] = {
      ...events[isEventUpdated],
      name,
      location,
      date,
      time,
      description,
      pictureId,
      categories,
    };
    return h.response({
      error: false,
      status: 'success',
      message: 'Event has been updated',
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'fail',
    message: 'Event Failed to update. Event ID not found',
  });
  response.code(404);
  return response;
};

// Delete Event By Id
const removeEventById = (request, h) => {
  const { eventId } = request.params;
  const isEventDeleted = events.findIndex((eventDeleted) => eventDeleted.id === eventId);

  if (isEventDeleted !== -1){
    events.splice(isEventDeleted, 1);
    return h.response({
      error: false,
      status: 'success',
      message: 'Event has been removed',
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'fail',
    message: 'Event failed to remove. Event ID not found',
  });
  response.code(404);
  return response;
};

// Adding Review Event
const insertEventReview = (request, h) => {
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
      message: 'Review event failed to added. Please insert your name',
    }).code(400);
  }

  if (!id) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review event failed to added. Event ID not found',
    }).code(400);
  }

  const findIdEvent = events.findIndex((eventIndex) => eventIndex.id === id);
  events[findIdEvent].userReviews.push({
    reviewId,
    name,
    date,
    review
  });

  const isReviewInserted = events.filter((eventReview) => eventReview.id === id)[0];
  if (isReviewInserted) {
    return h.response({
      error: false,
      status: 'success',
      message: 'show comment of selected event',
      userReviews: events[findIdEvent].userReviews.map((item) => ({
        reviewId : item.reviewId,
        name: item.name,
        date: item.date,
        review: item.review
      })),
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'error',
    message: 'Review event failed to add',
  });
  response.code(500);
  return response;
};

// Delete Review Event
const removeEventReview = (request, h) => {
  const { 
    id,
    reviewId,
   } = request.payload;

  if (!id) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review event failed to added. Event ID not found',
    }).code(400);
  }
  
  const isReviewDeleted = events.findIndex((eventIndex) => eventIndex.id === id);
  const findReviewUser = events[isReviewDeleted].userReviews.findIndex((user) => user.reviewId === reviewId);
  if (isReviewDeleted !== -1){
    events[isReviewDeleted].userReviews.splice(findReviewUser, 1);
    return h.response({
      error: false,
      status: 'success',
      message: 'Review event has been removed',
      userReviews: events[isReviewDeleted].userReviews.map((item) => ({
        reviewId : item.reviewId,
        name: item.name,
        date: item.date,
        review: item.review
      })),
    }).code(200);
  }

  const response = h.response({
    error: true,
    status: 'fail',
    message: 'Review event failed to removed. Event ID not found',
  });
  response.code(404);
  return response;
};

module.exports = { 
  insertNewEvent,
  getAllEvents,
  getDetailEventById,
  updateEventById,
  removeEventById,
  insertEventReview,
  removeEventReview,
};