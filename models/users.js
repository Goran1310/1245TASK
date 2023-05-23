module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
         Password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        Score: {
           type: Sequelize.DataTypes.INTEGER     }
    },{
        timestamps: false
    });
    return User
}