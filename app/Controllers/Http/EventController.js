'use strict'

const Event = use('App/Models/Event')
const AuthorizationService = use('App/Services/AuthorizationService')
const FindingService = use('App/Services/FindingService')

class EventController {
  /**
   * Show a list of all events.
   * GET events
   */
  async index() {
    const events = await Event.all()
    return events
  }

  /**
   * Render a form to be used for creating a new event.
   * GET events/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {auth} ctx.auth
   */
  async create({ params, auth }) {
    const user = await auth.getUser()
    const event = await Event.find(params.id)
    AuthorizationService.verifyPermission(event, user)
    return event
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {auth} ctx.auth
   */
  async store({ request, auth }) {
    const user = await auth.getUser()

    const {
      name, organizer, url, place, event_date, meetup_num, desc
    } = request.all()

    const event = new Event()
    event.fill({
      name, organizer, url, place, event_date, meetup_num, desc
    })
    await user.events().save(event)
    return event
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    const event = await Event.find(params.id)
    FindingService.verifyFinding(event)
    return event
  }

  /**
   * Render a form to update an existing event.
   * GET events/:id/edit
   *
   * @param {object} ctx
   * @param {auth} ctx.auth
   */
  async edit({ params, auth }) {
    const user = await auth.getUser()
    const event = await Event.find(params.id)
    AuthorizationService.verifyPermission(event, user)
    return event
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {auth} ctx.auth
   */
  async update({ params, request, auth }) {
    const user = await auth.getUser()
    const event = await Event.find(params.id)

    AuthorizationService.verifyPermission(event, user)
    event.merge(request.all())
    await event.save()
    return event
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {auth} ctx.auth
   */
  async destroy({ params, auth }) {
    const user = await auth.getUser()
    const event = await Event.find(params.id)

    AuthorizationService.verifyPermission(event, user)
    await event.delete()
    return event
  }
}

module.exports = EventController
