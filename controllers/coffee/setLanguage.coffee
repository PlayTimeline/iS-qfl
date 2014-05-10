module.exports = (server) ->

  ###
  设置语言环境
  ###
  server.get '/setLanguage/:lang', (req, res) ->
    res.cookie 'language', req.param('lang')
    res.redirect '/'