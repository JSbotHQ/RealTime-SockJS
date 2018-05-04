'use strict'

const Controller = require('trails/controller')

/**
 * @module SockjsController
 * @description TODO document Controller.
 */
module.exports = class SockjsController extends Controller {

    chat(req,res){
        return res.sendFile('chat.html', {root: './public'});
    }

    group(req, res) {
        return res.sendFile('group.html', {root: './public'});
    }

}

