module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Comment.associate = function(models) {
  // comment can't be created without a user(being logged in) due to foreign key constraint
      Comment.belongsTo(models.User, {
          foreignKey: {
              allowNull: false
          }
      });
  // comment can't be created without a quote due to foreign key constraint
      Comment.belongsTo(models.Quote, {
          foreignKey: {
              allowNull: false
          }
      });
  };
  return Comment;
};
