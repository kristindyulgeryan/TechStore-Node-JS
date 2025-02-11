import Device from "../models/Device.js"

export const getAll = ()=> Device.find({})

export const getLatest = ()=> Device.find({ }).sort({createdAt: 'desc', _id: 'desc'}).limit(3)

export const getOne = (deviceId)=> Device.findById(deviceId)
export const create = (deviceData, userId)=> Device.create({...deviceData, owner: userId})


 const deviceServcie = {
    getAll,
    getLatest,
    getOne,
    create,
    
}

export default deviceServcie;