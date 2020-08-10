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
  return db.createTable('teachers', {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: 'string',
      notNull: true,
    },
    secondName: {
      type: 'string',
      notNull: true,
    },
    gender: {
      type: 'string',
      notNull: true,
    },
    position: {
      type: 'string'
    },
    school: {
      type: 'int',
      notNull: true,
      foreignKey: {
        table: 'schools',
        name: 'schools_teachers_id_fk',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    school_building: {
      type: 'int',
    },
    subject: {
      type: 'string'
    },
    email: {
      type: 'string',
      notNull: true,
    }
  });
};

exports.down = function(db) {
  return db.removeForeignKey('teachers', 'schools_teachers_id_fk')
    .then(() => {
      db.removeForeignKey('teachers', 'school_buildings_teachers_id_fk');
    })
    .then(() => {
      db.dropTable('teachers');
    });
};

exports._meta = {
  "version": 1
};
