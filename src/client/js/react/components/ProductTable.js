import React from 'react';

import ProductCategoryRow from './ProductCategoryRow.js';
import ProductRow from './ProductRow.js'

export default class ProductTable extends React.Component {
	constructor() {
		super();
	}

	render() {
		let rows = []
		let last_value = null;

		let products = this.props.products

		if(products != null) {

			products.forEach((product) => {

				if(product.category != last_value) {
					rows.push(<ProductCategoryRow category={ product.category } key={product.category} />);
				}

				rows.push(<ProductRow product={ product } key={ product.name } />);

			})

		} else {
			rows.push(<h1> Cargando ... </h1>);
		}

		return (
			<div>
				{ rows }
			</div>
		);
	}
}