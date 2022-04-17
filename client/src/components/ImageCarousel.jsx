import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import NoImage from "../images/noimg.jpg";

const ImageCarousel = ({images}) => {
    const [currentImage, setCurrentImage] =  useState(NoImage);

    useEffect(() => {
        if(images && images.length > 0)
            setCurrentImage(images[0]);
    }, [images])
    return (
        <div className="image-carousel">
            <div className="current-image">
                <Image src={currentImage} />
            </div>
            {images.length>0 && (    
                <div className="image-previews" >
                    {images.map((image, key) => (
                        <div className="image-preview" key={key} onClick={(e) => {
                                e.preventDefault();
                                setCurrentImage(image)
                            }}>
                            <Image src={image}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;