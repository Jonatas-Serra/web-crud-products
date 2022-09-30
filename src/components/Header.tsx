import Img from '../assets/Jonatas.png'

export function Header() {
  return (
    <div className="w-full py-3 flex items-center justify-center bg-gray-900 border-b border-gray-700">
      <img src={Img} alt="Jonatas" width={90} />
    </div>
  )
}
