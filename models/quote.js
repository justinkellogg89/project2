module.exports = function(sequelize, DataTypes) {
    const Quote = sequelize.define("Quote", {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Quote.associate = function(models){
        Quote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Quote;
};