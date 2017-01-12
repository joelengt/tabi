import React from 'react';

export default class ProductRow extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<p> { this.props.product.name } </p>
			</div>
		);
	}
}