import React, { useEffect, useState } from "react";
import { Row, Spinner,Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { getMarketPosts } from "../../actions/market";
import Breadcrumbs from "../Breadcrumbs";
import LoginModal from "../Modals/LoginModal";
import Paginate from "../Paginate/Paginate";
import Search from "../Search/Search";
import Input from "../SignUp/Input";

import MarketCard from "./MarketCard/MarketCard";

import './styles.scss';
import cars from '../../cars/cars.json';
import { getCars } from "../../actions/carModels";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const categories = ['Автозвук и мультимедиа', 'Автосвет', 'Аксессуары', 'Гаджеты', 'Двигатель и выхлопная система', 'Инструменты', 'Климат', 'Кузов', 'Подвеска', 'Рулевое управление', 'Салон', 'Тормозная система', 'Трансмиссия', 'Шины и диски', 'Электрооборудование', 'Другое'];


const Market = () => {
    const {posts, isLoading, carModels} = useSelector((state) => state.posts);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [show, setShow] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [suits, setSuits] = useState('');
    const [condition, setCondition] = useState('');
    const dispatch = useDispatch();
     
    useEffect(()=>{
        if(!carModels){
            dispatch(getCars());
        }
    }, [carModels]);

    const query = useQuery();
    const page = query.get('page') || 1;

    const addCategory = (e) => {
        if(!selectedCategories.includes(e.target.id) && e.target.checked){
            setSelectedCategories([...selectedCategories, e.target.id]);
        }else if(selectedCategories.includes(e.target.id) && !e.target.checked){
            setSelectedCategories(selectedCategories.filter(item => item != e.target.id));
        }
    }

    const handleConditionChange = (e) =>{
        setCondition(e.target.value);
        console.log(e.target.value);
    }

    const openLoginModal = (e) =>{
        e.preventDefault();
        setShow(true);
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(searchText && searchText.length>0){
            console.log("search");
            dispatch(getMarketPosts(1, searchText, selectedCategories.join(','), suits, condition));
        }
    }

    const [carSelect, setCarSelect] = useState({mark: '', model: '', generation: ''});

    const handleBrandChoose = (e) => {
        e.preventDefault();
        let modells = [];
        if(e.target.value){
            carModels[e.target.value].models.map((model) => {
                modells.push(model.name);
            })
        }
        setModels(modells);
        setGenerations([]);
        setCarSelect({mark: e.target.value, model: '', generation: ''});
        setCarSelect({mark: e.target.value, model: '', generation: ''});
    }
    const handleModelChoose = (e) => {
        e.preventDefault();
        let gens = [];
        if(e.target.value){
            carModels[carSelect.mark].models[e.target.value].generations.map((gen)=>{
                gens.push(gen);
            })
            setGenerations(gens);
        }
        setCarSelect({...carSelect, model: e.target.value, generation: ''});
        setCarSelect({...carSelect, model: e.target.value, generation: ''});
    }
    const handleGenerationChoose = (e) => {
        e.preventDefault();
        setCarSelect({...carSelect, generation: e.target.value});
        setCarSelect({...carSelect, generation: e.target.value});
    }

    useEffect(() => {
        let carFilter = "";
        if(carSelect.mark){
            carFilter += "" + carModels[carSelect.mark].mark;
            if(carSelect.model){
                carFilter+= " " + carModels[carSelect.mark].models[carSelect.model].name;
                if(carSelect.generation)
                    carFilter += " " + carModels[carSelect.mark].models[carSelect.model].generations[carSelect.generation];
            }
        }
        setSuits(carFilter);
    }, [carSelect]);


    const [marks, setMarks] = useState([]);
    const [models, setModels] = useState([]);
    const [generations, setGenerations] = useState([]);

    useEffect(()=>{
        if(carModels){
            let markss = [];
            carModels.map((car) => {
                markss.push(car.mark);
            })
            setMarks(markss);
        }
    }, [carModels]);

    return (
        <Container id="market-list">
            <LoginModal show={show} setShow={setShow} text="Добавить объвления могут только зарегистрированные пользователи." />
            <Breadcrumbs currentPage="Магазин" />
            <h1>Магазин</h1>
            <div className="topbar">
                <Search text={searchText} handleChange={handleSearchChange} handleSubmit={handleSearchSubmit} />
                {user?.result ? (
                    <LinkContainer to="/market/form">
                        <Button>Добавить объявление</Button>
                    </LinkContainer>
                ) : (
                    <Button onClick={openLoginModal} >Добавить объявление</Button>
                )}
            </div>
            <Row>
                <Col xs={3} className="filters">
                    <div className="category-filter">
                        <h3>Категории</h3>
                        {categories.map((category, key) => (
                            <Input key={key} type="checkbox" name={category} label={category} handleChange={addCategory} />
                        ))}
                    </div>
                    <div className="car-filter">
                        <h3>Подходит для</h3>
                        <Input type="select" name="car-brands" label="Всех марок" keyAsValue={true} options={marks} handleChange={handleBrandChoose} />
                        <Input type="select" name="car-models" label="Всех моделей" keyAsValue={true} options={models} handleChange={handleModelChoose} />
                        <Input type="select" name="car-generations" label="Всех поколений" keyAsValue={true} options={generations} handleChange={handleGenerationChoose} />
                    </div>
                    <div className="condition-filter">
                        <h3>Состояние</h3>
                        <Input type="radio" name="condition" options={[{label:'Любое', value: ''}, {label:'Только новое', value:'Новое'}, {label: 'Только б/у', value: 'Б/У'}]} handleChange={handleConditionChange} />
                    </div>
                </Col>
                <Col xs={9}>
                        {(isLoading || !posts) ? (
                            <div className="text-center p-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </Spinner>
                            </div>
                        ) : (
                            (!!posts && posts.length > 0) ? (
                                <Row xs={1} md={3}>
                                    {posts.map((post) => (
                                        <Col key={post._id}>
                                            <MarketCard post={post} />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <h3 className="text-center p-5">Нету товаров по этому запросу</h3>
                            )
                        )
                        }
                </Col>
            </Row>
            <Paginate page={Number(page)} searchText={searchText} condition={condition} category={selectedCategories.join(',')} suits={suits} type="market"/>
        </Container>
    );
};

export default Market;