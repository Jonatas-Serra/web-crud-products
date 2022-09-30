import React from 'react'
import { FaTrashAlt, FaRegEdit, FaFile } from 'react-icons/fa'
import api from '../services/api'

interface Products {
  id: string
  name: string
  quantity: number
  description: string
  price: number
  image: string
}

const TableProducts: React.FC = () => {
  const [products, setProducts] = React.useState<Products[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await api.get('/products')
    setProducts(response.data)
    setLoading(false)
  }

  return (
    <div className="mx-auto">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <form className="w-[70%] mx-auto mb-10 items-center">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Pesquisar por produtos"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pesquisar
            </button>
          </div>
        </form>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nome do Produto
              </th>
              <th scope="col" className="py-3 px-6">
                Quantidade
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-zinc-50 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="py-4 px-6 text-zinc-50">{product.quantity}</td>
                <td className="py-4 px-6 text-zinc-50">R${product.price}</td>
                <td className="py-4 px-6 flex justify-around">
                  <a href="#" className="font-medium text-green-600 ">
                    <FaFile size={18} />
                  </a>
                  <a href="#" className="font-medium text-blue-400">
                    <FaRegEdit size={18} />
                  </a>
                  <a href="#" className="font-medium text-red-500 ">
                    <FaTrashAlt size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableProducts
