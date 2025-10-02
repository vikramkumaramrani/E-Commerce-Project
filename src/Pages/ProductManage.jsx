import React, { useState } from "react";
import { FiBox, FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { Container, Row, Col, Table, Button, Form, InputGroup, Badge, Modal } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import headphoneImg from "../assets/images/headphone.jpg";
import mobileImg from "../assets/images/mobile.jpg";
import shoesImg from "../assets/images/shoes.jpg";
import coffeeImg from "../assets/images/coffee.jpg";
import yogaImg from "../assets/images/yoga.jpg";
import lampImg from "../assets/images/lamp.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialProducts = [
	{
		id: 1,
		name: "Wireless Bluetooth Headphones",
		desc: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
		category: "Electronics",
		price: 99.99,
		stock: 50,
		featured: true,
		inStock: true,
		image: headphoneImg,
	},
	{
		id: 2,
		name: "Smartphone Case",
		desc: "Durable protective case for smartphones with shock absorption technology.",
		category: "Electronics",
		price: 24.99,
		stock: 100,
		featured: false,
		inStock: true,
		image: mobileImg,
	},
	{
		id: 3,
		name: "Running Shoes",
		desc: "Comfortable running shoes with advanced cushioning technology.",
		category: "Sports",
		price: 79.99,
		stock: 30,
		featured: true,
		inStock: true,
		image: shoesImg,
	},
	{
		id: 4,
		name: "Coffee Maker",
		desc: "Programmable coffee maker with built-in grinder and thermal carafe.",
		category: "Home",
		price: 129.99,
		stock: 25,
		featured: false,
		inStock: true,
		image: coffeeImg,
	},
	{
		id: 5,
		name: "Yoga Mat",
		desc: "Non-slip yoga mat made from eco-friendly materials.",
		category: "Sports",
		price: 39.99,
		stock: 75,
		featured: true,
		inStock: true,
		image: yogaImg,
	},
	{
		id: 6,
		name: "Desk Lamp",
		desc: "LED desk lamp with adjustable brightness and color temperature.",
		category: "Home",
		price: 49.99,
		stock: 40,
		featured: false,
		inStock: true,
		image: lampImg,
	},
];

const categories = ["All Categories", "Electronics", "Sports", "Home"];

const ProductManage = () => {
	const [products, setProducts] = useState(initialProducts);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("All Categories");
	const [showModal, setShowModal] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		desc: "",
		image: "",
		category: "",
		stock: "",
		featured: false,
	});

	
	React.useEffect(() => {
	  const saved = localStorage.getItem("products");
	  if (saved) setProducts(JSON.parse(saved));
	}, []);
	
	
	React.useEffect(() => {
	  localStorage.setItem("products", JSON.stringify(products));
	}, [products]);

	const handleDelete = (id) => {
		setProducts(products.filter((p) => p.id !== id));
	};

	const handleEdit = (product) => {
		alert(`Edit product: ${product.name}`);
		
	};

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => {
		setShowModal(false);
		setNewProduct({ name: "", price: "", desc: "", image: "", category: "", stock: "", featured: false });
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setNewProduct((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleAddProduct = (e) => {
		e.preventDefault();
		
		setProducts([
			...products,
			{
				id: Date.now(),
				name: newProduct.name,
				price: parseFloat(newProduct.price),
				desc: newProduct.desc,
				image: newProduct.image,
				category: newProduct.category,
				stock: parseInt(newProduct.stock),
				featured: newProduct.featured,
				inStock: parseInt(newProduct.stock) > 0,
			},
		]);
		handleCloseModal();
	};

	const filteredProducts = products.filter(
		(p) =>
			(category === "All Categories" || p.category === category) &&
			(p.name.toLowerCase().includes(search.toLowerCase()) ||
				p.desc.toLowerCase().includes(search.toLowerCase()))
	);

	return (
		<div style={{ background: "#f8f9fb", minHeight: "100vh", paddingBottom: 40, marginTop: 85, paddingTop: 20 }}>
			<MyNavbar />
			<Container fluid className="py-4">
				<Row className="justify-content-center">
					<Col xs={12} md={10} lg={9}>
						<h1 className="fw-bold mb-1" style={{ fontSize: 32 }}>Product Management</h1>
						<div className="text-secondary mb-4">Manage your product inventory</div>
						<Row className="g-2 align-items-center mb-4">
							<Col xs={12} md={6}>
								<InputGroup>
									<InputGroup.Text><FiSearch /></InputGroup.Text>
									<Form.Control
										type="text"
										placeholder="Search products..."
										value={search}
										onChange={e => setSearch(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col xs={12} md={4}>
								<Form.Select value={category} onChange={e => setCategory(e.target.value)}>
									{categories.map(c => (
										<option key={c} value={c}>{c}</option>
									))}
								</Form.Select>
							</Col>
							<Col xs={12} md={2} className="text-md-end mt-2 mt-md-0">
										<Button variant="dark" className="w-100 w-md-auto d-flex align-items-center justify-content-center" onClick={handleShowModal}>
											<FiPlus className="me-2" /> Add Product
										</Button>
			
			<Modal show={showModal} onHide={handleCloseModal} centered size="lg">
				<Modal.Body style={{ padding: 32 }}>
					<div className="d-flex justify-content-between align-items-start mb-2">
						<div>
							<h4 className="fw-bold mb-1">Add New Product</h4>
							<div className="text-secondary mb-3" style={{ fontSize: 15 }}>Create a new product for your store</div>
						</div>
						<Button variant="link" onClick={handleCloseModal} style={{ fontSize: 22, color: '#222', textDecoration: 'none', marginTop: -8, marginRight: -8 }}>&times;</Button>
					</div>
					<Form onSubmit={handleAddProduct}>
						<Row className="g-3">
							<Col xs={12} md={6}>
								<Form.Label className="fw-semibold">Product Name *</Form.Label>
								<Form.Control
									name="name"
									value={newProduct.name}
									onChange={handleInputChange}
									required
									autoFocus
								/>
							</Col>
							<Col xs={12} md={6}>
								<Form.Label className="fw-semibold">Price *</Form.Label>
								<Form.Control
									name="price"
									type="number"
									min="0"
									value={newProduct.price}
									onChange={handleInputChange}
									required
								/>
							</Col>
							<Col xs={12}>
								<Form.Label className="fw-semibold">Description *</Form.Label>
								<Form.Control
									as="textarea"
									name="desc"
									value={newProduct.desc}
									onChange={handleInputChange}
									required
									rows={2}
								/>
							</Col>
							<Col xs={12}>
								<Form.Label className="fw-semibold">Image URL</Form.Label>
								<Form.Control
									name="image"
									value={newProduct.image}
									onChange={handleInputChange}
									placeholder="https://example.com/image.jpg"
								/>
							</Col>
							<Col xs={12} md={6}>
								<Form.Label className="fw-semibold">Category *</Form.Label>
								<Form.Select
									name="category"
									value={newProduct.category}
									onChange={handleInputChange}
									required
								>
									<option value="">Select category</option>
									{categories.filter(c => c !== "All Categories").map(c => (
										<option key={c} value={c}>{c}</option>
									))}
								</Form.Select>
							</Col>
							<Col xs={12} md={6}>
								<Form.Label className="fw-semibold">Stock Quantity *</Form.Label>
								<Form.Control
									name="stock"
									type="number"
									min="0"
									value={newProduct.stock}
									onChange={handleInputChange}
									required
								/>
							</Col>
							<Col xs={12} className="d-flex align-items-center">
								<Form.Check
									type="checkbox"
									name="featured"
									checked={newProduct.featured}
									onChange={handleInputChange}
									className="me-2"
									id="featuredProduct"
								/>
								<Form.Label htmlFor="featuredProduct" className="mb-0">Featured Product</Form.Label>
							</Col>
						</Row>
						<div className="d-flex gap-2 mt-4">
							<Button type="submit" variant="dark" className="flex-grow-1 py-2 fw-semibold">Add Product</Button>
							<Button variant="light" onClick={handleCloseModal} className="py-2 fw-semibold">Cancel</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
							</Col>
						</Row>
						<div className="bg-white rounded-4 shadow-sm p-0 overflow-auto">
							<div className="d-flex align-items-center gap-2 px-4 pt-4 fw-semibold" style={{ fontSize: 18 }}>
								<FiBox style={{ fontSize: 22 }} />
								Products <span className="text-secondary">({filteredProducts.length})</span>
							</div>
							<Table responsive hover className="align-middle mt-3 mb-0">
								<thead>
									<tr className="text-secondary" style={{ fontWeight: 600, fontSize: 16 }}>
										<th>Product</th>
										<th>Category</th>
										<th>Price</th>
										<th>Stock</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredProducts.map(product => (
										<tr key={product.id}>
											<td>
												<div className="d-flex align-items-center gap-2">
													<img src={product.image} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid #eee" }} />
													<div>
														<div className="fw-semibold" style={{ fontSize: 16 }}>{product.name}</div>
														<div className="text-secondary" style={{ fontSize: 14 }}>{product.desc}</div>
													</div>
												</div>
											</td>
											<td>
												<Badge bg="light" text="dark" className="fw-semibold px-3 py-2 rounded-3" style={{ fontSize: 14 }}>{product.category}</Badge>
											</td>
											<td className="fw-semibold">${product.price.toFixed(2)}</td>
											<td className="fw-semibold">{product.stock}</td>
											<td>
												{product.featured && <Badge bg="dark" className="me-1">Featured</Badge>}
												{product.inStock && <Badge bg="light" text="dark">In Stock</Badge>}
											</td>
											<td>
												<Button variant="light" className="me-2 p-2" onClick={() => handleEdit(product)}><FiEdit2 /></Button>
												<Button variant="outline-danger" className="p-2" onClick={() => handleDelete(product.id)}><FiTrash2 /></Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>
            <Footer />
		</div>
        
        
	);
    
};

export default ProductManage;
