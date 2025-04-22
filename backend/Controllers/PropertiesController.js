import PropertiesModel from "../Models/PropertiesModel.js"
import LocationModel from "../Models/LocationModel.js"


export async function getProperties(req,res)
{
    let Data = await PropertiesModel.find().populate("Location");

    res.json(Data);
}


export async function getPropertiesById(req,res)
{
    let Data = await PropertiesModel.findById(req.params.id);
    res.json(Data);
}


export async function postProperties(req,res)
{
    let NewProperties = new PropertiesModel(req.body);
    await NewProperties.save();

    await LocationModel.findByIdAndUpdate(
        req.body.Location,
        { $push: { totalProperties: NewProperties._id } }
    );

    return res.json({"Message":"Data Added Successfully !"})

    
}


export async function putProperties(req,res)
{
    PropertiesModel.findByIdAndUpdate(req.params.id,req.body);
    res.json("Data Updated SuccessFully! ");
}


export async function deleteProperties(req,res)
{
    PropertiesModel.findByIdAndDelete(req.params.id);
    res.json("Data Deleted SuccessFully! ");
}