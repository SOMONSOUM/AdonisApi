'use strict'

const Event = use('App/Models/Event')

class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    /* Need to authenticate user */
    /* const user = await auth.getUser()
    return await user.events().fetch() */

    /* No need to authenticate */
    const events = await Event.all()
    return events
  }

  /**
   * Render a form to be used for creating a new event.
   * GET events/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, auth }) {
    const user = await auth.getUser()

    const {
      name,
      organizer,
      url,
      place,
      event_date,
      meetup_num,
      desc } = request.all()

    const event = new Event()
    /* event.name = name
    event.organizer = organizer
    event.url = url
    event.place = place
    event.event_date = event_date
    event.meet_num = meet_num
    event.desc = desc */
    event.fill({
      name,
      organizer,
      url,
      place,
      event_date,
      meetup_num,
      desc
    })
    await user.events().save(event)
    return event
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing event.
   * GET events/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = EventController
