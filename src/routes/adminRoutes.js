const { 
  getAdminData, 
  getNameAdmin,
  loginAdmin,
  logoutAdmin,
} = require('../handler/admin-handler');

const AdminRoutes = [

  // Admin
  {
    method: 'GET',
    path: '/admins',
    handler: getAdminData,
  },
  {
    method: 'GET',
    path: '/getadmin',
    handler: getNameAdmin,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginAdmin,
    options: {
      auth: {
          mode: 'try',
      },
    },
  },
  {
    method: 'GET',
    path: '/logout',
    handler: logoutAdmin,
    options: {
      auth: {
          mode: 'try',
      },
    },
  },
];
 
module.exports = AdminRoutes;