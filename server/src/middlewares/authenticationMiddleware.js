// middlewares/authenticationMiddleware.js

module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login'); // Redirect to the login page if not authenticated
    },
  };
  