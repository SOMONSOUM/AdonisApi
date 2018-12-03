'use strict'

const Speaker = use('App/Models/Speaker')
const AuthorizationService = use('App/Services/AuthorizationService')
const FindingService = use('App/Services/FindingService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with speakers
 */
class SpeakerController {
  /**
   * Show a list of all speakers.
   * GET speakers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const speakers = await Speaker.all()
    return speakers
  }

  /**
   * Render a form to be used for creating a new speaker.
   * GET speakers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, auth }) {
    const user = await auth.getUser()
    const speakers = await Speaker.all()
    AuthorizationService.verifyPermission(speakers, user)
    return speakers
  }

  /**
   * Create/save a new speaker.
   * POST speakers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response, auth }) {
    const user = await auth.getUser()
    const { photo, name, title } = request.all()
    const speaker = new Speaker()
    speaker.fill({ photo, name, title })
    await user.speakers().save(speaker)
    return speaker
  }

  /**
   * Display a single speaker.
   * GET speakers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const speaker = await Speaker.find(params.id)
    FindingService.verifyFinding(speaker)
    return speaker
  }

  /**
   * Render a form to update an existing speaker.
   * GET speakers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const speaker = await Speaker.find(params.id)
    FindingService.verifyFinding(speaker)
    return speaker
  }

  /**
   * Update speaker details.
   * PUT or PATCH speakers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const user = await auth.getUser()
    const speaker = await Speaker.find(params.id)

    AuthorizationService.verifyPermission(speaker, user)
    speaker.merge(request.all())
    await speaker.save()
    return speaker
  }

  /**
   * Delete a speaker with id.
   * DELETE speakers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const user = await auth.getUser()
    const speaker = await Speaker.find(params.id)

    AuthorizationService.verifyPermission(speaker, user)
    await speaker.delete()
    return speaker
  }
}

module.exports = SpeakerController
