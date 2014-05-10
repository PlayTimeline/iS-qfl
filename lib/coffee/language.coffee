module.exports = () ->
  (req, res, next) ->
    language = req.cookies.language

    if language
      res.locals.context = res.locals.context or {}
      res.locals.context.locality = language

    next()