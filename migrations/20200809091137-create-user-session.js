'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('user_sessions', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'user_session-users-id_fk',
                table: 'users',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id'
            },
        },
        started_at: {
            type: 'string',
        },
        finished_at: {
            type: 'string',
        },
        session_length: {
            type: 'string',
        }
    });
};

exports.down = function(db) {
    return db.removeForeignKey('user_sessions', 'user_session-users-id_fk')
        .then(() => { db.dropTable('user_sessions'); });
};

exports._meta = {
  "version": 1
};
