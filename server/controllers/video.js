import Video from "../models/video.js";

export const getVideos = async (req, res) => {
    const { tags, page } = req.query;
    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Video.countDocuments({});

        if(tags.length>0){
            const videos = await Video.find({tag: { $in: tags.split(',')}}).select('title videoID createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: videos, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }else{
            const videos = await Video.find().select('title tag videoID createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: videos, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const getVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Video.findById(id)
            // .populate({
            //     path: 'comments',
            //     populate: {path: 'user'}
            // })
            ;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});      
    }
};


export const likeVideo = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");
 
    const video = await Video.findById(_id);
  
    const index = video.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        video.likes.push(req.userId);
    }else{
        video.likes = video.likes.filter((id) => id !== String(req.userId));
    }

    const updatedVideo = await Video.findByIdAndUpdate(_id, video, {new: true});

    res.json(updatedVideo);
}