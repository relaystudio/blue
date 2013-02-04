/*
 * GET blog page.
 */

exports.blog = function(req, res){
  res.render('blog', { title: 'Express' });
};