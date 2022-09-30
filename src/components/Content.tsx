import TableProducts from './TableProducts'

export function Content() {
  return (
    <div className="w-[80%] flex-1">
      <h1 className="text-2xl font-bold text-zinc-50 text-center py-3 mb-8">
        Gerenciamento de Produtos
      </h1>
      <TableProducts />
    </div>
  )
}
