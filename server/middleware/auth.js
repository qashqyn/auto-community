import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        let decodedData = jwt.verify(token, 'test');

        req.userId = decodedData?.id;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
    }
}

export default auth;