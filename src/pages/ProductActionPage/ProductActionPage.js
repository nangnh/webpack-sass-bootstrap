import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import {actAddProductRequest, actGetProductRequest, actUpdateProductRequest} from "../../actions";

class ProductActionPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			txtName: '',
			txtPrice: '',
			chkbStatus: false
		}
	}

	componentDidMount() {
		let { match } = this.props
		if (match) {
			const id = match.params.id
			this.props.onEditProduct(id)			
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log('nextContext', nextContext)
		console.log('nextProps', nextProps)

		let { itemEditing } = nextProps

		this.setState({
			id: itemEditing.id,
			txtName: itemEditing.name,
			txtPrice: itemEditing.price,
			chkbStatus: itemEditing.status
		})
	}

	onChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.type === 'checkbox' ? target.checked : target.value
		this.setState({
			[name]: value
		})
	}

	onSave = (event) => {
		const { id, txtName, txtPrice, chkbStatus } = this.state
		const { history } = this.props
		const product = {
			id: id,
			name: txtName,
			price: txtPrice,
			status: chkbStatus
		}

		event.preventDefault()
		if (txtName === '' || txtPrice === '') {
			alert('Thông tin sản phầm còn thiếu. Vui lòng điền thêm!')

		} else if (id === '') {
			//add
			this.props.onAddProduct(product)
			history.goBack()
		} else {
			//update
			this.props.onUpdateProduct(product)
			history.push("/products")
		}
	}

	render() {
		const { txtName, txtPrice, chkbStatus } = this.state

		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<form onSubmit={this.onSave}>
					<legend>Thêm Sản Phẩm</legend>

					<div className="form-group">
						<label>Tên Sản Phẩm</label>
						<input
							type="text"
							className="form-control"
							name={'txtName'}
							value={txtName}
							onChange={this.onChange}

						/>
					</div>
					<div className="form-group">
						<label>Giá</label>
						<input
							type="number"
							className="form-control"
							name={'txtPrice'}
							value={txtPrice}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Trạng Thái</label>
					</div>
					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								name={'chkbStatus'}
								value={chkbStatus}
								onChange={this.onChange}
								checked={chkbStatus}
							/>
								Còn Hàng
						</label>
					</div>

					<Link to="/products" className={"btn btn-danger mt-10 mr-5"}>Cancel</Link>
					<button type="submit" className="btn btn-primary mt-10 mr-5">Save</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		itemEditing: state.itemEditing
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddProduct: (product) => {
			dispatch(actAddProductRequest(product))
		},
		onUpdateProduct : (product) => {
			dispatch(actUpdateProductRequest(product))
		},
		onEditProduct : (id) => {
			dispatch(actGetProductRequest(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)
