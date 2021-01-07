import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {}, [dispatch]);
};

export default ProductView;
