/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Text } from "../../styles/text";
import { useParams } from "react-router-dom";
import { ICartProduct, IProductType } from "../../types/product";
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	EmailShareButton,
	EmailIcon,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	addToWishlist,
	removeFromWishlist,
	selectWishlist,
} from "../../features/wishlist/wishlistSlice";
import { findIndex } from "lodash";
import {
	ContainerExtended,
	Image,
	Layout,
	InfoDiv,
	Category,
	Title,
	Price,
	Regular,
	Sale,
	PriceOff,
	InStock,
	Color,
	ColorVariation,
	AddToCart,
	AddToWishlist,
	SizeVariation,
	Share,
	ShareIcons,
	DetailsContainer,
	Description,
	Information,
	InfoHeader,
	Specifications,
	SpecInfo,
	Key,
	Value,
	SpecContainer,
	RelatedProducts,
	RelatedProductsContainer,
} from "./SingleProduct.styled";
import {
	addProductToCart,
	addToCart,
	removeFromCart,
} from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/currencyFormatter";
import { successToast } from "../../utils/showToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productColorName } from "../../utils/productColorName";
import { ProductCard } from "../../components";
import { getSingleItem } from "../../services/singleItem";
import Loader from "../../components/Loader";

//Add react toast on successfull add to cart

const SingleProduct = () => {
	const { id } = useParams();
	const [cartAmount, setCartAmount] = useState<number>(1);
	const [isFavourite, setIsFavourite] = useState<boolean>(false);
	const [product, setProduct] = useState<IProductType>();
	const [stock, setStock] = useState<boolean>(true);
	const [isSale, setIsSale] = useState<boolean>(false);
	const [salePrice, setSalePrice] = useState<number>(0);
	const [color, setColor] = useState<string>();
	const [size, setSize] = useState<string>();
	const dispatch = useAppDispatch();
	const { wishlistProducts } = useAppSelector(selectWishlist);
	const [relatedProducts, setRelatedProducts] = useState<IProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const url = "https://mhabdullah.vercel.app";

	const handleCartAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let { value } = e.target;
		let intValue = parseInt(value);
		if (intValue >= 1) setCartAmount(intValue);
	};

	const handleAddToCart = async (): Promise<void> => {
		if (product) {
			if (color && size) {
				const cartData: ICartProduct = {
					productId: product._id,
					title: product.title,
					img: product.img,
					quantity: cartAmount,
					color: color,
					size: size,
					price: isSale ? salePrice : product.price,
				};
				dispatch(addToCart(cartData));
				try {
					const response = await dispatch(
						addProductToCart({
							productId: product._id,
							title: product.title,
							img: product.img,
							quantity: cartAmount,
							color: color,
							size: size,
							price: isSale ? salePrice : product.price,
						})
					).unwrap();
					if (response) successToast("product added to cart");
				} catch (error) {
					dispatch(removeFromCart(cartData));
					console.log({ cartError: error });
				}
			}
		}
	};

	const handleColorSelection = (e: React.MouseEvent, color: string): void => {
		e.preventDefault();
		setColor(color);
		console.log(color);
	};

	//Wishlist
	const handleAddToWishlist = (item: IProductType): void => {
		dispatch(addToWishlist(item));
		successToast("product added to wishlist");
	};
	const handleRemoveFromWishlist = (item: IProductType): void => {
		dispatch(removeFromWishlist({ id: item._id }));
	};

	const setItemData = (item: IProductType) => {
		setProduct(item);
		setStock(item.inStock);
		setColor(item.color[0]);
		setSize(item.size[0]);
	};

	const setSaleData = (item: IProductType) => {
		if (!item.sale) return;
		setIsSale(item.sale.active);
		const saleAmount =
			item.sale.type === "flat"
				? item.price - item.sale.amount
				: (item.sale.amount / 100) * item.price;
		setSalePrice(item.price - saleAmount);
	};

	const fetchProduct = async (id: string) => {
		setLoading(true);
		try {
			const response = await getSingleItem(id);
			const { product: item, relatedProducts: relatedProductsFromAPI } =
				response.data;
			setItemData(item);
			setRelatedProducts(relatedProductsFromAPI);
			setSaleData(item);
		} catch (error) {
			console.error("single product fetch error", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			fetchProduct(id);
		}
	}, [id]);

	useEffect(() => {
		const isFound: number = findIndex(
			wishlistProducts,
			(item) => product?._id === item._id
		);
		if (isFound > -1) {
			setIsFavourite(true);
		} else {
			setIsFavourite(false);
		}
	}, [handleRemoveFromWishlist, handleAddToWishlist]);

	//Add a nice error message here if product not available
	if (loading) {
		return <Loader />;
	}
	if (product === undefined) {
		return <h2>The product you're looking for is not available</h2>;
	}

	return (
		<ContainerExtended>
			<Layout>
				<div>
					<Image src={product?.img} alt={product?.title} />
				</div>
				<InfoDiv>
					<Category>
						{product?.categories.map((cat, idx) => (
							<span key={idx}>{cat}</span>
						))}
					</Category>
					<Title>{product?.title}</Title>
					{/* <Brand>IGUERA</Brand> */}
					{/* convert price from cents to price and also add localization  */}
					<Price>
						<Regular sale={isSale}>{formatPrice(product?.price)}</Regular>
						{isSale && (
							<>
								<Sale>${formatPrice(salePrice)}</Sale>
								<PriceOff>
									{product?.sale?.type === "flat" ? (
										<>-{formatPrice(product?.sale?.amount)} FLAT OFF</>
									) : (
										<span>-{product?.sale?.amount}% OFF</span>
									)}
								</PriceOff>
							</>
						)}
					</Price>
					<Text>{product?.desc}</Text>
					<InStock stock={stock}>
						{product?.inStock ? (
							<>
								<BsPatchCheck />
								<span>In stock</span>
							</>
						) : (
							<>
								<GiCancel />
								<span>Out of stock</span>
							</>
						)}
					</InStock>
					<ColorVariation>
						<p>Color: </p>

						{product.color?.map((currentColor, idx) => {
							return (
								<Color
									onClick={(e) => handleColorSelection(e, currentColor)}
									key={idx}
									bgColor={currentColor}
									type="button"
									style={{
										outlineColor: `${
											currentColor === color
												? "rgba(0,0,0,0.15)"
												: "transparent"
										}`,
									}}
								></Color>
							);
						})}
						{color && <span>({productColorName[color.toLowerCase()]})</span>}
					</ColorVariation>

					<SizeVariation>
						<label htmlFor="sizes">Choose a size: </label>
						<select
							value={size}
							name="sizes"
							id="sizes"
							onChange={(e) => setSize(e.target.value)}
						>
							{product?.size.map((item, idx) => (
								<option value={item} key={idx}>
									<>{item}</>
								</option>
							))}
						</select>
					</SizeVariation>
					{stock && (
						<AddToCart>
							<input
								type="number"
								value={cartAmount}
								onChange={handleCartAmount}
							/>
							<button disabled={!product?.inStock} onClick={handleAddToCart}>
								Add to cart
							</button>
						</AddToCart>
					)}
					<AddToWishlist>
						{isFavourite ? (
							<>
								<AiFillHeart
									onClick={() => handleRemoveFromWishlist(product)}
								/>
								<span>Added to Wishlist</span>
							</>
						) : (
							<>
								<AiOutlineHeart onClick={() => handleAddToWishlist(product)} />
								<span>Add to Wishlist</span>
							</>
						)}
					</AddToWishlist>
					<Share>
						<span>Share</span>
						<ShareIcons>
							<FacebookShareButton url={url}>
								<FacebookIcon size={20} round />
							</FacebookShareButton>
							<TwitterShareButton url={url}>
								<TwitterIcon size={20} round />
							</TwitterShareButton>
							<LinkedinShareButton url={url}>
								<LinkedinIcon size={20} round />
							</LinkedinShareButton>
							<EmailShareButton url={url}>
								<EmailIcon size={20} round />
							</EmailShareButton>
						</ShareIcons>
					</Share>
				</InfoDiv>
				<DetailsContainer>
					<Description>
						<h2>Description</h2>
						<Text>
							Compellingly grow performance based mindshare through parallel
							potentialities. Rapidiously underwhelm top-line catalysts for
							change before best-of-breed materials. Competently brand timely
							catalysts for change through sustainable systems. Completely
							expedite ubiquitous bandwidth after integrated action items.
							Progressively transform leading-edge supply chains whereas
							flexible niche markets.
						</Text>
					</Description>
					<Information>
						<h2>Information</h2>
						<InfoHeader>Shipping</InfoHeader>
						<Text>
							We currently offer free shipping worldwide on all orders over
							$100.
						</Text>
						<InfoHeader>Return & exchange</InfoHeader>
						<Text>
							If you are not satisfied with your purchase you can return it to
							us within 14 days for an exchange or refund. More info.
						</Text>
						<InfoHeader>Assistance</InfoHeader>
						<Text>
							Contact us on (+44) 555 88 65, or email us at
							support@reytheme.com.
						</Text>
					</Information>
					<Specifications>
						<h2>Specification</h2>
						<SpecContainer>
							<SpecInfo>
								<Key>Brand</Key>
								<Value>Iguera</Value>
							</SpecInfo>
							<SpecInfo>
								<Key>Material</Key>
								<Value>Lether</Value>
							</SpecInfo>
							<SpecInfo>
								<Key>Color</Key>
								<Value>Grey,Musterds</Value>
							</SpecInfo>
						</SpecContainer>
					</Specifications>
				</DetailsContainer>

				<RelatedProductsContainer>
					<h2>Related Products</h2>
					<RelatedProducts>
						{relatedProducts.length ? (
							(relatedProducts.length > 4
								? relatedProducts.slice(0, 4)
								: relatedProducts
							).map((item, idx) => <ProductCard item={item} key={idx} />)
						) : (
							<h2> No Related Products Found</h2>
						)}
					</RelatedProducts>
				</RelatedProductsContainer>
			</Layout>
			<ToastContainer />
		</ContainerExtended>
	);
};

export default SingleProduct;
