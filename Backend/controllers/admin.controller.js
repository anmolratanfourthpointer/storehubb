const tabledata = require('../models/table_data');


exports.addtableData=async(req,res)=>{
    try{
        const table_data= new tabledata(req.body);
        await table_data.save();
        res.status(201).json(table_data);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.gettableData=async(req,res)=>{
try{
    const all_table_data = await tabledata.find({});
    res.status(201).json(all_table_data);
}catch(err){
    res.status(400).json({message:err.message});
}
}

exports.updatetabledata=async(req,res)=>{
    try{
        const {_id , ...updateData}=req.body;
        if(_id){
            const update = await tabledata.findOneAndUpdate({ _id }, updateData  , 
                {new:true}
            );
        }
        
        if(!update){
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(201).json({message:'Updated successfully '});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}



