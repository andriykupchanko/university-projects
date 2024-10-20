"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Створення таблиці Roles
    await queryInterface.createTable("Roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Створення таблиці Sensors
    await queryInterface.createTable("Sensors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: true
      }
    });

    // Створення таблиці Users
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      idRole: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles", // посилання на таблицю Roles
          key: "id"
        },
        allowNull: false,
        onDelete: "CASCADE"
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Створення таблиці Measurements
    await queryInterface.createTable("Measurements", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      sensorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sensors", // посилання на таблицю Sensors
          key: "id"
        },
        allowNull: false,
        onDelete: "CASCADE"
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Видалення таблиць у зворотному порядку
    await queryInterface.dropTable("Measurements");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("Sensors");
    await queryInterface.dropTable("Roles");
  }
};
