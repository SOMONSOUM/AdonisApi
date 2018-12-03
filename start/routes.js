'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')
  Route.get('users', 'UserController.index')
  // Route.get('events', 'EventController.index')
  // Route.get('event/:id', 'EventController.show')
  // Route.get('event/:id/edit', 'EventController.edit').middleware(['auth'])
  // Route.patch('event/:id', 'EventController.update').middleware(['auth'])
  // Route.post('events', 'EventController.create').middleware(['auth'])
  // Route.delete('events/:id', 'EventController.destroy').middleware(['auth'])
  Route.resource('events', 'EventController')
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']]
    ]))
  Route.resource('speakers', 'SpeakerController')
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']]
    ]))

}).prefix('api')
