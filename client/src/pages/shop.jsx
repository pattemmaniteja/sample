import ProductBox from '../components/productBox'
import Navbar from '../components/Navbar';
import Share from '../components/share';
import MyButton from '../components/button';
import CartSummary from '../components/CartSummary';
import '../styles/shop.css';
export default function shop(){
    return(
        <>
            <Navbar btn1="Home" btn2="Profile"/>
            <Share title="Rewards Shop" desc="Use your donation points to get discounts on electronics and restaurant coupons"/>
            <div className="shop-btns">
                <MyButton btnName="All Products" className="btn btn-success"/>
                <MyButton btnName="Electronics" className="btn btn-outline-secondary"/>
                <MyButton btnName="Coupons" className="btn btn-outline-secondary"/>
            </div>
            <div className='shopItems'>
                <ProductBox
                    id="headphones"
                    category="Electronics"
                    image="/assets/headphones.jpg"
                    title="Wireless Headphones"
                    desc="High-quality wireless headphones with noise cancellation"
                    offerPrice={799}
                    price={1499}
                    points={500}
                    finalPrice={699}
                    rating={4.5}
                    reviews={243}
                />
                <ProductBox
                    id="Smartphone Stand"
                    category="Electronics"
                    image="/assets/smartphone.jpg"
                    title="Smartphone Stand"
                    desc="Adjustable smartphone stand for desk and bedside"
                    offerPrice={899}
                    price={299}
                    points={300}
                    finalPrice={199}
                    rating={4.6}
                    reviews={223}
                />
                <ProductBox
                    id="USB-C Cable"
                    category="Electronics"
                    image="/assets/usbcable.jpg"
                    title="USB-C Cable"
                    desc="Fast charging USB-C cable, 6ft length, supports higher speeds and wattage"
                    offerPrice={99}
                    price={199}
                    points={100}
                    finalPrice={99}
                    rating={4.25}
                    reviews={123}
                />
                <ProductBox
                    id="Pizza Palace Coupon"
                    category="Electronics"
                    image="/assets/pizzaCoupon.jpg"
                    title="Pizza Palace Coupon"
                    desc="$25 voucher for Pizza Palace - Valid for 6 months"
                    offerPrice={299}
                    price={499}
                    points={400}
                    finalPrice={399}
                    rating={4.35}
                    reviews={223}
                />
                <ProductBox
                    id="Burger House Coupon"
                    category="Electronics"
                    image="/assets/burgerCoupon.jpg"
                    title="Burger House Coupon"
                    desc="$20 voucher for Burger House - Valid for 3 months"
                    offerPrice={999}
                    price={1499}
                    points={500}
                    finalPrice={599}
                    rating={4.5}
                    reviews={223}
                />
                <ProductBox
                    id="Coffee Shop Coupon"
                    category="Electronics"
                    image="/assets/coffeCoupon.jpg"
                    title="Coffee Shop Coupon"
                    desc="$15 voucher for premium coffee and pastries"
                    offerPrice={299}
                    price={499}
                    points={500}
                    finalPrice={299}
                    rating={4.35}
                    reviews={213}
                />
            </div>
            <CartSummary/>
        </>
    );
}