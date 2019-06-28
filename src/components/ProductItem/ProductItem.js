import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class ProductItem extends Component {

	onDelete = (id) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Bạn chắc chắn muốn xóa ?')) {
			this.props.onDelete(id)
		}
	}

	render() {
		let { product, index } = this.props
		const statusName = product.status ? 'Còn Hàng' : 'Hết Hàng'
		const statusClass = product.status ? 'warning' : 'default'
		return (
			<tr>
				<td>{index + 1}</td>
				<td>{product.id}</td>
				<td>{product.name}</td>
				<td>{product.price} $</td>
				<td>
					<span className={`label label-${statusClass}`}>{statusName}</span>
				</td>
				<td>
					<Link
						to={`/products/${product.id}/edit`}
						className="btn btn-success mr-10"
					>
						<span className="fa fa-edit mr-5"/>
						Sửa
					</Link>
					<button
						type="button"
						className="btn btn-danger mr-10"
						onClick={() => this.onDelete(product.id)}
					>
						<span className="fa fa-trash mr-5"/>
						Xóa
					</button>
				</td>
			</tr>
		)
	}
}

export default ProductItem;
