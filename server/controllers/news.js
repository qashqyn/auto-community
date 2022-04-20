import NewsMessage from "../models/newsMessage.js";
import NewsComment from "../models/newsComment.js";

export const getNews = async (req, res) => {
    const { tags, page } = req.query;
    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await NewsMessage.countDocuments({});

        if(tags.length>0){
            const newsMessages = await NewsMessage.find({tags: { $in: tags.split(',')}}).select('title description tags selectedFile createdAt').limit(LIMIT).skip(startIndex);
            res.status(200).json({data: newsMessages, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }else{
            const newsMessages = await NewsMessage.find().select('title description tags selectedFile createdAt').limit(LIMIT).skip(startIndex);
            res.status(200).json({data: newsMessages, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const getSingleNews = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await NewsMessage.findById(id)
            .populate({
                path: 'comments',
                populate: {path: 'user'}
            });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};


export const likeNews = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");
 
    const news = await NewsMessage.findById(_id);
  
    const index = news.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        news.likes.push(req.userId);
    }else{
        news.likes = news.likes.filter((id) => id !== String(req.userId));
    }

    const updatedNews = await NewsMessage.findByIdAndUpdate(_id, news, {new: true});

    res.json(updatedNews);
}