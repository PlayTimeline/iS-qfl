module.exports = function(server) {

  /*
  设置语言环境
   */
  return server.get('/setLanguage/:lang', function(req, res) {
    res.cookie('language', req.param('lang'));
    return res.redirect('/');
  });
};

//# sourceMappingURL=setLanguage.js.map
