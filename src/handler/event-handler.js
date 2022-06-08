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
        message: 'Show event data by Id',
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
    message: 'Event Failed to update. Event Id not found',
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
    message: 'Event failed to remove. Event Id not found',
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
};