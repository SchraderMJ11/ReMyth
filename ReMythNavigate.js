var Url = require('url');
var http = require('http');
var restUtil = require('./ReMythRestUtil');

var support = {
  methods: ['navigate'],
  actions: ['up', 'down', 'left', 'right', 'select', 
    'guide', 'livetv', 'mainmenu', 
    'commercialSkipBack', 'commercialSkip', 
    'pause', 'play', 'stop',
    'increaseSpeed', 'decreaseSpeed',
    'volumeUp', 'volumeDown']
};

module.exports = function setup(mount, root) {
  return function handle(req, res, next) {

    var service = restUtil.validate(req, res, next, support);
    if(!service) {
      return next();
    }

    var action = service.action;

    var submitAction;
    if(action === 'up') {
      submitAction = "UP";
    } else if(action === "down") {
      submitAction = "DOWN";
    } else if(action === "left") {
      submitAction = "LEFT";
    } else if(action === "right") {
      submitAction = "RIGHT";
    } else if(action === 'select') {
      submitAction = "SELECT";
    } else if(action === 'guide') {
      submitAction = "Program Guide";
    } else if(action === 'livetv') {
      submitAction = "Live TV";
    } else if(action === 'mainmenu') {
      submitAction = "Main Menu";
    } else if(action === 'commercialSkipBack') {
      submitAction = "SKIPCOMMBACK";
    } else if(action === 'commercialSkip') {
      submitAction = "SKIPCOMMERCIAL";
    } else if(action === 'pause') {
      submitAction = "PAUSE";
    } else if(action === 'play') {
      submitAction = "PLAY";
    } else if(action === 'stop') {
      submitAction = "STOPPLAYBACK";
    } else if(action === 'increaseSpeed') {
      submitAction = "SPEEDINC";
    } else if(action === 'decreaseSpeed') {
      submitAction = "SPEEDDEC";
    } else if(action === 'volumeUp') {
      submitAction = "VOLUMEUP";
    } else if(action === 'volumeDown') {
      submitAction = "VOLUMEDOWN";
    }

    restUtil.sendRequest(res, 'Frontend', 'SendAction', {
      Action: submitAction
    }, undefined, service.query.frontend);

    res.writeHead(200);
    res.end("executed action: " + action + "\n" + "Submitted action to frontend: " + submitAction);
  };
};
