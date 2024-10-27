"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true // Унікальне обмеження для email
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "email");
  }
};
