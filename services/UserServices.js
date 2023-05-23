
class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }
    async create(username, password, score) {
        return await this.User.create({
            Username: username,
            Password: password,
            Score: score
        });
    }
    async getAll() {
        return await this.User.findAll({
        where: {}
        });
    }
    async deleteUser(userId) {
        return this.User.destroy({
            where: {id: userId}
        });
    }
}
module.exports = UserService;