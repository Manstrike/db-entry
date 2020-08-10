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
    return db.createTable('schools', {
      columns: {
        id: {
          type: 'int',
          primaryKey: true,
          autoIncrement: true,
        },
        level: {
            type: 'string',
            notNull: true,
        },
        community: {
            type: 'int',
            notNull: true,
        },
        street: {
            type: 'string',
            notNull: true,
        },
        postalCode: {
            type: 'int',
            notNull: false,
        },
        city: {
            type: 'string',
            notNull: true,
        },
        telephone: {
          type: 'string',
        },
        website: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      },
      ifNotExists: true
    });
};

exports.down = function(db) {
  return db.removeForeignKey('schools', 'schools-communities-id_fk')
    .then(() => { db.dropTable('schools'); });
};

exports._meta = {
  "version": 1
};
