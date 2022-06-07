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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const categories = ['Автозвук и мультимедиа', 'Автосвет', 'Аксессуары', 'Гаджеты', 'Двигатель и выхлопная система', 'Инструменты', 'Климат', 'Кузов', 'Подвеска', 'Рулевое управление', 'Салон', 'Тормозная система', 'Трансмиссия', 'Шины и диски', 'Электрооборудование', 'Другое'];


const Market = () => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [show, setShow] = useState(false);

    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const query = useQuery();
    const page = query.get('page') || 1;

    const addCategory = (e) => {
        if(!selectedCategories.includes(e.target.id) && e.target.checked){
            setSelectedCategories([...selectedCategories, e.target.id]);
        }else if(selectedCategories.includes(e.target.id) && !e.target.checked){
            setSelectedCategories(selectedCategories.filter(item => item != e.target.id));
        }
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
            dispatch(getMarketPosts(1, searchText));
        }
    }

    const [carSelect, setCarSelect] = useState({brand: '', brandId: null, model: '',modelId: null, generation: '', generationId: null});
    const [carOptions, setCarOptions] = useState({brands: [], models: [], generations: []});

    const setBrands = () =>{
        let brandds = [];
        cars.brands.map((brand) => brandds.push(brand.name));
        setCarOptions({...carOptions, brands: brandds});
    }
    
    useEffect(() => {
        setBrands();
    }, [carSelect.brands]);

    const handleBrandChoose = (e) => {
        e.preventDefault();
        let brandId = e.target.value;
        if(brandId !== carSelect.brandId){
            let modells = [];
            setCarSelect({...carSelect, brandId: brandId, brand: cars.brands[brandId].name, model: '', modelId: null, generation: '', generationId: null});
            cars.brands[brandId].models.map((model) => modells.push(model.name));
            setCarOptions({...carOptions, models: modells});
        }
    }
    const handleModelChoose = (e) => {
        e.preventDefault();
        let modelId = e.target.value;
        if(modelId !== carSelect.modelId){
            let generationns = [];
            setCarSelect({...carSelect, modelId: modelId, model: cars.brands[carSelect.brandId].models[modelId].name, generation: '', generationId: null});
            cars.brands[carSelect.brandId].models[modelId].generations.map((generation) => generationns.push(generation));
            setCarOptions({...carOptions, generations: generationns});
        }
    }
    const handleGenerationChoose = (e) => {
        e.preventDefault();
        let generationId = e.target.value;
        if(generationId !== carSelect.generationId)
            setCarSelect({...carSelect, generationId: generationId, generation: cars.brands[carSelect.brandId].models[carSelect.modelId].generations[generationId]});
    }

    useEffect(() => {
        console.log(carSelect);
    }, [carSelect]);

    return (
        <Container className="market-list">
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
                <Col xs={3}>
                    <div className="category-filter">
                        <h3>Категории</h3>
                        {categories.map((category, key) => (
                            <Input key={key} type="checkbox" name={category} label={category} handleChange={addCategory} />
                        ))}
                    </div>
                    <div className="car-filter">
                        <h3>Подходит для</h3>
                        <Input type="select" name="car-brands" label="Всех марок" keyAsValue={true} options={carOptions.brands} handleChange={handleBrandChoose} />
                        <Input type="select" name="car-models" label="Всех моделей" keyAsValue={true} options={carOptions.models} handleChange={handleModelChoose} />
                        <Input type="select" name="car-generations" label="Всех поколений" keyAsValue={true} options={carOptions.generations} handleChange={handleGenerationChoose} />
                    </div>
                    <div className="condition-filter">
                        <h3>Состояние</h3>
                        <Input type="radio" name="condition" options={[{label:'Любое', value: 'any'}, {label:'Только новое', value:'Новое'}, {label: 'Только б/у', value: 'Б/У'}]} handleChange={addCategory} />
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
            <Paginate page={Number(page)} searchText={searchText} type="market"/>
        </Container>
    );
};

export default Market;