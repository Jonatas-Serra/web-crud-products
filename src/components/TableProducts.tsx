import React, { useState } from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import api from '../services/api'
import CurrencyInput from 'react-currency-masked-input'

interface Products {
  _id: string
  name: string
  quantity: number
  description: string
  price: number
  image: string
}

const TableProducts: React.FC = () => {
  const [products, setProducts] = React.useState<Products[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products,
  )
  const [search, setSearch] = useState('')
  const [loading, setLoading] = React.useState(true)
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [modalIsOpenEdit, setModalIsOpenEdit] = React.useState(false)
  const [modalIsOpenDelete, setModalIsOpenDelete] = React.useState(false)

  const getProducts = async () => {
    const response = await api.get('/products')
    setProducts(response.data)
    setLoading(false)
  }

  const handleDeleteProduct = async (_id: string) => {
    await api.delete(`/products/${_id}`)
    setModalIsOpenDelete(false)
    setLoading(true)
    getProducts()
  }

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    await api.post('/products', data)
    setLoading(true)
    getProducts()
    setSelectedProduct({} as Products)
    setModalIsOpen(false)
  }

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    await api.patch(`/products/${selectedProduct._id}`, data)
    setLoading(true)
    getProducts()
    setSelectedProduct({} as Products)
    setModalIsOpenEdit(false)
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <svg
            aria-hidden="true"
            className="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="w-full">
          <div className="shadow-md sm:rounded-lg">
            <div className="flex-col sm:flex sm:flex-row justify-center mb-6 sm:mb-12">
              <form className="flex-1 px-4 items-center mr-2">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                  Pesquisa
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
                    value={search}
                    onChange={(text) => setSearch(text.target.value)}
                    className="block p-4 pl-10 w-full text-base text-zinc-50 font-bold rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Pesquise pelo nome do produto"
                  />
                </div>
              </form>
              <div className="flex justify-center items-center sm:items-stretch mt-6 sm:mt-0">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 sm:py-2.5 text-center ml-2"
                  onClick={() => setModalIsOpen(true)}
                >
                  Adicionar novo produto
                </button>
              </div>
            </div>
            <table className="w-full mx-auto text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nome do Produto
                  </th>
                  <th scope="col" className="hidden sm:table-cell py-3 px-6">
                    Quantidade
                  </th>
                  <th scope="col" className="hidden sm:table-cell py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product: Products) =>
                    product.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((product: Products) => (
                    <tr
                      key={product._id}
                      className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 focus:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-zinc-50  dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td className="hidden sm:table-cell py-4 px-6 text-zinc-50">
                        {product.quantity}
                      </td>
                      <td className="hidden sm:table-cell py-4 px-6 text-zinc-50">
                        R$ {product.price}
                      </td>
                      <td className="py-4 px-6 flex justify-around">
                        <button
                          onClick={() => {
                            setSelectedProduct(product)
                            setModalIsOpenEdit(true)
                          }}
                          className="font-medium text-blue-400"
                        >
                          <FaRegEdit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setModalIsOpenDelete(true)
                            setSelectedProduct(product)
                          }}
                          className="font-medium text-red-500 ml-4"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            {modalIsOpenDelete && (
              <div className="relative h-full w-[100px] md:w-full">
                <div className="overflow-y-auto overflow-x-hidden fixed top-80 md:top-[20%] md:left-[30%] z-50  w-full md:h-full">
                  <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        onClick={() => setModalIsOpenDelete(false)}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="p-6 text-center">
                        <svg
                          aria-hidden="true"
                          className="mx-auto mb-4 w-14 h-14 text-red-600 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Você tem certeza que deseja deletar o produto{' '}
                          <strong className="font-bold text-lg text-red-600">
                            {selectedProduct.name}
                          </strong>
                          ?
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
                          <button
                            onClick={() =>
                              handleDeleteProduct(selectedProduct._id)
                            }
                            className="mb-4 sm:mb-0 text-zinc-50 bg-red-600 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2"
                          >
                            Sim, Deletar
                          </button>
                          <button
                            onClick={() => setModalIsOpenDelete(false)}
                            className="rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-zinc-50 focus:z-10 bg-gray-700 text-zinc-50 border-gray-500 hover:bg-gray-600"
                          >
                            Não, cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {modalIsOpen && (
              <div className="relative h-full w-[100px] md:w-full">
                <div className="overflow-y-auto overflow-x-hidden fixed top-36 md:top-[20%] md:left-[30%] z-50  w-full md:h-full">
                  <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-medium text-zinc-50">
                          Adicionar novo produto
                        </h3>
                        <button
                          onClick={() => setModalIsOpen(false)}
                          type="button"
                          className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <form onSubmit={handleCreateProduct}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Nome do produto
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-zinc-50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Descrição do produto
                            </label>
                            <input
                              type="text"
                              name="description"
                              className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-zinc-50"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Quantidade
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              min={0}
                              className="bg-gray-700 border border-gray-600 text-zinc-50 font-bold text-base rounded-lg block w-full p-2.5 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">
                              Preço
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-zinc-50 font-bold text-base rounded-l-md border border-r-0 bg-gray-600 border-gray-600">
                                R$
                              </span>
                              <CurrencyInput
                                prefix="R$"
                                name="price"
                                min={0}
                                type="number"
                                pattern="^\d+(?:\.\d{1,2})?$"
                                className="bg-gray-700 border border-gray-600 text-zinc-50 font-bold text-base rounded-r-lg block w-full p-2.5 focus:ring-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                          <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setModalIsOpen(false)}
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {modalIsOpenEdit && (
              <div className="relative h-full w-[100px] md:w-full">
                <div className="overflow-y-auto overflow-x-hidden fixed top-36 md:top-[20%] md:left-[30%] z-50  w-full md:h-full">
                  <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-medium text-zinc-50">
                          Editar produto
                        </h3>
                        <button
                          onClick={() => setModalIsOpenEdit(false)}
                          type="button"
                          className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <form onSubmit={handleEditProduct}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Nome do produto
                            </label>
                            <input
                              type="text"
                              name="name"
                              defaultValue={selectedProduct.name}
                              className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-zinc-50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Descrição do produto
                            </label>
                            <input
                              type="text"
                              name="description"
                              defaultValue={selectedProduct.description}
                              className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-zinc-50"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Quantidade
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              defaultValue={selectedProduct.quantity}
                              min={0}
                              className="bg-gray-700 border border-gray-600 text-zinc-50 font-bold text-base rounded-lg block w-full p-2.5 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">
                              Preço
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-zinc-50 font-bold text-base rounded-l-md border border-r-0 bg-gray-600 border-gray-600">
                                R$
                              </span>
                              <CurrencyInput
                                prefix="R$"
                                name="price"
                                min={0}
                                type="number"
                                defaultValue={selectedProduct.price}
                                pattern="^\d+(?:\.\d{1,2})?$"
                                className="bg-gray-700 border border-gray-600 text-zinc-50 font-bold text-base rounded-r-lg block w-full p-2.5 focus:ring-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                          <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setModalIsOpenEdit(false)}
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TableProducts
