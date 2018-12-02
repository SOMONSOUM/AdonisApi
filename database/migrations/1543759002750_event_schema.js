'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 255).notNullable()
      table.string('organizer', 255).notNullable()
      table.string('url', 300).notNullable()
      table.string('place', 300).notNullable()
      table.date('event_date').notNullable()
      table.string('desc', 500)
      table.integer('meetup_num')
      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventSchema
