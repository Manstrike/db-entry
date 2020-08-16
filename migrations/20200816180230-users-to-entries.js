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
    return db.createTable('users_to_entries', {
        id: {
            type: 'int',
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'users_to_entries-users-id_fk',
                table: 'users',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        entry_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'users_to_entries-teachers-id_fk',
                table: 'teachers',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        }
    });
};

exports.down = function(db) {
  return db.removeForeignKey('users_to_entries', 'users_to_entries-teachers-id_fk')
    .then(() => db.removeForeignKey('users_to_entries', 'users_to_entries-users-id_fk'))
    .then(() => db.dropTable('users_to_entries'));
};

exports._meta = {
  "version": 1
};
