'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpeakerSchema extends Schema {
  up() {
    this.create('speakers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('photo')
      table.string('name', 200).notNullable()
      table.string('title', 200).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('speakers')
  }
}

module.exports = SpeakerSchema
