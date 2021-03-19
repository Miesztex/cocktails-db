import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [cocktail, setCocktail] = useState(null);
	useEffect(() => {
		setLoading(true);
		const getCocktails = async () => {
			try {
				const resp = await fetch(`${url}${id}`);
				const data = await resp.json();
				if (data.drinks) {
					//destructure
					const {
						strDrink: name,
						strDrinkThumb: image,
						strAlcoholic: info,
						strCategory: category,
						strGlass: glass,
						strInstructions: instructions,
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					} = data.drinks[0];
					// set ingr array
					const ingredients = [
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					];
					// set new cocktail
					const newCocktail = {
						name,
						image,
						info,
						category,
						glass,
						instructions,
						ingredients,
					};
					setCocktail(newCocktail);
				} else setCocktail(null);
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		};
		getCocktails();
	}, [id]);

	if (loading) return <Loading />;
	if (!cocktail) {
		return <h2 className='section-title'>No cocktail to display</h2>;
	}

	// destructure
	const {
		name,
		image,
		category,
		info,
		glass,
		ingredients,
		instructions,
	} = cocktail;
	return (
		<section className='section cocktail-section'>
			<Link to='/' className='btn btn-primary'>
				back home
			</Link>
			<h2 className='section-title'>{name}</h2>
			<div className='drink'>
				<img src={image} alt={name} />
				<div className='drink-info'>
					<p>
						<span className='drink-data'>name:</span> {name}
					</p>
					<p>
						<span className='drink-data'>category:</span> {category}
					</p>
					<p>
						<span className='drink-data'>info:</span> {info}
					</p>
					<p>
						<span className='drink-data'>glass:</span> {glass}
					</p>
					<p>
						<span className='drink-data'>instructions:</span> {instructions}
					</p>
					<p>
						<span className='drink-data'>ingredients:</span>
						{ingredients.map((item, idx) => {
							return item ? <span key={idx}>{item}</span> : null;
						})}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
