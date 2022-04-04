import NewsMessage from "../models/newsMessage.js";

export const getNews = async (req, res) => {
    try {
        const newsMessages = await NewsMessage.find();
        
        res.status(200).json(newsMessages);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const likeNews = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");
 
    const news = await NewsMessage.findById(_id);
    const updatedNews = await NewsMessage.findByIdAndUpdate(_id, {likeCount: news.likeCount + 1}, {new: true});

    res.json(updatedNews);
}