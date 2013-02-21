/**
 * ParkUrban - Mobile Web Application
 *
 * Top-level application routes
 *
 * This file contains the controller information for all of the top-level 
 * web application views not otherwise implemented in one of the application
 * modules.
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
 
/**
 * Application home page
 *
 */
exports.index = function(req, res){
  res.render('index', { title: 'ParkUrban' });
};
