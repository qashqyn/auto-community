import Market from '../models/market.js';

export const getPosts = async (req, res) => {
    const {page} = req.query;
    try{
        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Market.countDocuments({});

        const posts = await Market.find().limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts, currentpage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}
export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Market.findById(id)
            .populate({
                path: 'author',
                select: 'avatar firstname lastname'
            });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const createPost = async (req, res) => {
    if(!req.userId) return res.json({message: "Unaithenticated"});
    const post = req.body;
    try {
        const newPost = new Market({...post, author: req.userId});
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({error});
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No product post with that Id");

    await Market.findByIdAndRemove(_id);

    res.json({message: 'Product post deleted successfully'});
};