import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductList from '../../components/ProductList/ProductList'
import ProductItem from '../../components/ProductItem/ProductItem'
import {actDeleteProductRequest, actFetchProductsRequest} from "../../actions";

class ProductListPage extends Component {

	componentDidMount() {
			this.props.fetchAllProducts()
	}

	showProducts = (products) => {
		let result = null

		if (products.length > 0) {
			result = products.map((product, index) => {
				return (
					<ProductItem
						key={index}
						product={product}
						index={index}
						onDelete={this.onDelete}
					/>
				)
			})
		}
		return result
	}

	onDelete = (id) => {
		this.props.onDeleteProduct(id)
	}

	render() {
		const { products } = this.props

		return (
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<Link to={'/products/add'} className="btn btn-info mb-10">
					<span className="fa fa-plus mr-5"/>
					Thêm Sản Phẩm
				</Link>
				{/*Bảng Danh Sách Sản Phẩm*/}
				<ProductList>
					{this.showProducts(products)}
				</ProductList>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllProducts: () => {
			dispatch(actFetchProductsRequest())
		},
		onDeleteProduct: (id) => {
			dispatch(actDeleteProductRequest(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
