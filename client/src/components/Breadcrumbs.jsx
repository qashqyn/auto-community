import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Breadcrumbs = ({currentPage, links}) => {
    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </LinkContainer>
            {links && 
                links.map((el) => (
                    <LinkContainer to={el.link}>
                        <Breadcrumb.Item>{el.name}</Breadcrumb.Item>
                    </LinkContainer>                                        
                ))
            }
            <Breadcrumb.Item active>{currentPage}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Breadcrumbs;