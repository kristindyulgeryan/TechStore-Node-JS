import Device from "../models/Device.js"

export const getLatest = ()=> Device.find({ }).sort({createdAt: 'desc'}).limit(3)

export const create = (deviceData, userId)=> Device.create({...deviceData, owner: userId})


 const deviceServcie = {
    create,
    getLatest,
}

export default deviceServcie;