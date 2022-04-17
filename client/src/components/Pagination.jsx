import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const  Paginate = () => {
    return (
        <Pagination>
            <LinkContainer to="">
                <Pagination.Item></Pagination.Item>
            </LinkContainer>
        </Pagination>
    );
}