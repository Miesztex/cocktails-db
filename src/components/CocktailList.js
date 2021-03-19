import React from 'react';
import Cocktail from './Cocktail';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const CocktailList = () => {
	const { cocktails, loading } = useGlobalContext();
	if (loading) return <Loading />;

	if (!cocktails.length) {
		return <h2 className='section-title'>No cocktails found</h2>;
	}

	const cocktailsList = cocktails.map(item => {
		return <Cocktail key={item.id} {...item} />;
	});

	return (
		<section className='section'>
			<h2 className='section-title'>cocktails</h2>
			<div className='cocktails-center'>{cocktailsList}</div>
		</section>
	);
};

export default CocktailList;
