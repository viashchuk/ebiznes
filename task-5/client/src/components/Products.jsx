import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import axios from 'axios'

import plusIcon from '../assets/plus.svg'
import minusIcon from '../assets/minus.svg'


const Produkty = () => {
    const [products, setProducts] = useState([])
    const { cartItems, addToCart, removeFromCart } = useCart()

    useEffect(() => {
        axios.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    const getItemQuantity = (id) => {
        const item = cartItems.find(i => i.ID === id)
        return item ? item.quantity : 0
    }

    return (
        <>
            <h1 className="text-xl font-semibold mb-8">Nasze Produkty</h1>

            {products.length === 0 && (
                <p data-testid="no-products">Brak produktów</p>
            )}

            <ul className="grid grid-cols-4 gap-6">
                {products.map(product => {
                    const quantity = getItemQuantity(product.ID)

                    return (
                        <li key={product.ID} className="border border-[#fc6a32] p-2 rounded-xl">
                            <img src={`${axios.defaults.baseURL}/${product.image_url}`} alt={product.title} className="w-full h-auto object-cover rounded-md bg-gray-100 mb-4" />
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-medium text-lg">{product.title}</h2>
                                <span className="text-lg font-semibold">{product.price} <span className="text-sm font-normal">zł</span></span>
                            </div>
                            {quantity > 0 ? (
                                <div className="flex items-center justify-between gap-4">
                                    <button onClick={() => removeFromCart(product)}
                                        className="cursor-pointer w-10 h-10 rounded-md bg-orange-100 transition duration-200 hover:bg-[#fc6a32] flex items-center justify-center"
                                        data-testid="delete-item-from-cart">
                                        <img src={minusIcon} className="w-5 relative" alt="Delete from cart" />
                                    </button>
                                    <span className="grow text-center" data-testid="item-quantity-in-cart">{quantity}</span>
                                    <button onClick={() => addToCart(product)}
                                        className="cursor-pointer w-10 h-10 rounded-md bg-orange-100 transition duration-200 hover:bg-[#fc6a32] flex items-center justify-center"
                                        data-testid="add-item-to-cart">
                                        <img src={plusIcon} className="w-5 relative" alt="Add to cart" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(product)}
                                    className="rounded-md bg-orange-100 text-[#fc6a32] font-medium w-full py-2 text-center cursor-pointer transition duration-200 hover:bg-[#fc6a32] hover:text-white"
                                    data-testid="add-to-cart"
                                >
                                    Dodać do koszyka
                                </button>
                            )}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Produkty
