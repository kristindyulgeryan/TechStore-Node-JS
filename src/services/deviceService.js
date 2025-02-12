import Device from "../models/Device.js"

export const getAll = ()=> Device.find({})

export const getLatest = ()=> Device.find({ }).sort({createdAt: 'desc', _id: 'desc'}).limit(3)

export const getOne = (deviceId)=> Device.findById(deviceId)

export const create = (deviceData, userId)=> Device.create({...deviceData, owner: userId})

export const prefer = async (deviceId, userId)=> { 

    const device = await Device.findById(deviceId);
   
// check if onwer
    if(device.owner.equals(userId)){
       throw new Error('Can not prefer own offer!')
}
 // check if already preferred
     if(device.preferredList.includes(userId)){
        throw new Error('You are already preferred this offer!')
 }
    // prefer
    device.preferredList.push(userId);
    return device.save();
};

export const remove = async (deviceId, userId)=>{
    const device = await getOne(deviceId);

    if(!device.owner.equals(userId)){
        throw new Error('Only owner can delete this offer')
    }

    return Device.findByIdAndDelete(deviceId)
}

 const deviceServcie = {
    getAll,
    getLatest,
    getOne,
    create,
    prefer,
    remove,
}

export default deviceServcie;