const Bcrypt = require('bcrypt');
const admins = require('../data/admin');

const getAdminData = (request, h) => {
    const response = h.response({
        error: false,
        status: 'success',
        message: 'Show all admin data',
        all: admins.map((item) => ({
            username: item.username,
            password: item.password,
            name: item.name,
            id: item.id,
        })),
    });
    response.code(200);
    return response;
};

const getNameAdmin = (request, h) => {
    const response = h.response({
        error: false,
        status: 'success',
        message: 'Login Admin Success',
        adminLogin: {
            username: `${request.auth.credentials.username}`,
            role: `${request.auth.credentials.role}`,
        },
    });
    response.code(200);
    return response;
};

const loginAdmin = async (request, h) => {
    const { username, password } = request.payload;
    const account = admins.find((user) => user.username === username);

    if (!account || !(await Bcrypt.compare(password, account.password))) {
        return h.response({
            error: true,
            status: 'fail',
            message: 'Failed Login',
          }).code(400);
    } 
    request.cookieAuth.set({ id: account.id });
    return h.response({
        error: false,
        status: 'success',
        message: 'Login Admin Success',
        admin: account.username,
    }).code(200);
};

const logoutAdmin = (request, h) => {
    request.cookieAuth.clear();
    const response = h.response({
        error: false,
        status: 'success',
        message: 'Logout Admin Success',
    });
    response.code(200);
    return response;
  };

module.exports = { 
    getAdminData,
    getNameAdmin,
    loginAdmin,
    logoutAdmin,
};