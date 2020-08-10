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
            notNull: true,
        },
        finished_at: {
            type: 'string',
            notNull: true,
        },
        session_length: {
            type: 'string',
            notNull: true,
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
