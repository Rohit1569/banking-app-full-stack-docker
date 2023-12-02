'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,

    }),
      await queryInterface.changeColumn('users', 'age', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      await queryInterface.changeColumn('users', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      await queryInterface.changeColumn('users', 'gender', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      await queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      await queryInterface.changeColumn('banks', 'bank_name', {
        type: Sequelize.STRING,
        allowNull: false,
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
