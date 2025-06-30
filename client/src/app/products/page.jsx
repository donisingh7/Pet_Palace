'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error)
  }, [])

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-4 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mr-6 whitespace-nowrap capitalize">
              dog food
            </h2>
            {['Brand','Shop For','Life Stage','Breed Size','Product Type','Special Diet','Protein Source','Price Range']
              .map(label => (
                <button
                  key={label}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 whitespace-nowrap rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  data-slot="button"
                >
                  {label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down w-4 h-4 ml-1"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              ))
            }
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm sticky top-24">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sliders-horizontal w-5 h-5 text-gray-600"
                  aria-hidden="true"
                >
                  <line x1="21" y1="4" x2="14" y2="4" />
                  <line x1="10" y1="4" x2="3" y2="4" />
                  <line x1="21" y1="12" x2="12" y2="12" />
                  <line x1="8" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="20" x2="16" y2="20" />
                  <line x1="12" y1="20" x2="3" y2="20" />
                  <line x1="14" y1="2" x2="14" y2="6" />
                  <line x1="8" y1="10" x2="8" y2="14" />
                  <line x1="16" y1="18" x2="16" y2="22" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              </div>
              <div className="mb-6 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 rounded-xl"
                  data-slot="input"
                />
              </div>
              <div className="space-y-3">
                {/* Optional: list out filter items dynamically */}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Price Range</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input data-slot="input" placeholder="Min" className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-xl" />
                  <input data-slot="input" placeholder="Max" className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-xl" />
                </div>
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm group hover:shadow-lg transition-all duration-300 border-0 bg-white"
              data-slot="card"
            >
              <a className="block" href={`/products/${product._id}`}>
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    alt={product.name}
                    loading="lazy"
                    width="300"
                    height="300"
                    decoding="async"
                    data-nimg="1"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.img || product.imageUrl}
                  />
                </div>
              </a>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm text-blue-600 font-medium mb-1">{product.brand || 'Brand'}</p>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shadow-xs hover:bg-primary/90 h-9 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2"
                  data-slot="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
