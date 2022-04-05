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

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");
 
    const news = await NewsMessage.findById(_id);
  
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedNews = await NewsMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedNews);
}