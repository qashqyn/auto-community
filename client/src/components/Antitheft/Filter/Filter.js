import React from "react";
import { Button, Form } from "react-bootstrap";

import "./styles.scss";

const cityOptions = ["Нур-Султан", "Алматы", "Туркестан"];
const sortOptions = [{name: "Сначало новые", value: "new"}, {name: "Сначало старые", value: "old"}];

const Filter = ({handleFilter, handleChange, }) => {
    return (
        <Form onSubmit={handleFilter} id="antitheftFilter">
            <Form.Group controlId="city">
                <Form.Label>Город</Form.Label>
                <Form.Select name="city" onChange={handleChange}>
                    <option value="">Выберите город</option>
                    {cityOptions.map((cityOption, key) => (
                        <option value={cityOption} key={key}>{cityOption}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="sort">
                <Form.Label>Дата</Form.Label>
                <Form.Select name="sort" onChange={handleChange}>
                    {sortOptions.map((sortOption, key) => (
                        <option value={sortOption.value} key={key}>{sortOption.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="amount">
                <Form.Label>Вознаграждение</Form.Label>
                <Form.Control placeholder="Введите сумму от" name="amount" type="text" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Button type="submit">Найти</Button>
        </Form>
    );
}

export default Filter;