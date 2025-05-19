import { User } from '../models/index.js'

const create = async (userData) => {
    return await User.create(userData)
}

const findByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

export default {
    create,
    findByEmail
}