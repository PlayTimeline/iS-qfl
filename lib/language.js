module.exports = function() {
  return function(req, res, next) {
    var language;
    language = req.cookies.language;
    if (language) {
      res.locals.context = res.locals.context || {};
      res.locals.context.locality = language;
    }
    return next();
  };
};
