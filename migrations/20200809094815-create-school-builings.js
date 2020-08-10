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
  return db.createTable('school_buildings', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    school_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        table: 'schools',
        name: 'school_buidings-schools-id_fk',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      }
    },
    building_name: {
      type: 'string',
      notNull: true,
    }
  }).then(() => {
    db.addForeignKey('teachers', 'school_buildings', 'school_buildings_teachers_id_fk',
      {
        'school_building' : 'id'
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    });
  });
};

exports.down = function(db) {
  return db.removeForeignKey('schools', 'school_buidings-schools-id_fk')
    .then(() => { db.dropTable('schools') });
};

exports._meta = {
  "version": 1
};
