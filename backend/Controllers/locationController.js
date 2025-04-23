import LocationModel from "../Models/LocationModel.js"

export async function getLocation(req,res)
{
    let Data = await LocationModel.find().populate("totalProperties");
    res.json(Data);
}
export async function getLocationById(req,res)
{
    let Data = await LocationModel.findById(req.params.id).populate("totalProperties");
    res.json(Data);
}
export async function postLocation(req,res)
{
    let NewLocation = new LocationModel(req.body);
    await NewLocation.save()
    res.json(NewLocation);
}
export async function putLocation(req,res)
{
    LocationModel.findByIdAndUpdate(req.params.id,req.body);
    res.json("Data Updated SuccessFully! ");
}
export async function deleteLocation(req,res)
{
    LocationModel.findByIdAndDelete(req.params.id);
    res.json("Data Deleted SuccessFully! ");
}