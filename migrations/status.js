'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('status', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            apartment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'apartment',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            status_occupancy: {
                type: Sequelize.ENUM("OCCUPIED", "FREE"),
                defaultValue: "OCCUPIED",
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('status');
    }
};
