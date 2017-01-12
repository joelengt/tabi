import React from 'react';

import SearchBar from './SearchBar.js';
import ProductTable from './ProductTable.js';

export default class FilterableProductTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <SearchBar/>
                <ProductTable products={ this.props.source } />
            </div>
        );
    }
}
