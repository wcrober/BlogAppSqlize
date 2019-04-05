'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};