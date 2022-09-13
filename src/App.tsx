import {MagnifyingGlassPlus} from "phosphor-react"
import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg"
import gameImg from "./assets/game-1.png"

export default function App() {
  return (
    <div className="flex items-center flex-col max-w-[1344px] mx-auto m-20 ">
      <img className="" src={logoImg} alt="" />

      <h1 className="text-[64px] text-white font-black mt-12"> 
      SEU 
      <span className="bg-nlw-gradient bg-clip-text text-transparent"> DUO </span> 
      ESTÁ AQUI</h1>

      <div className="grid grid-cols-6 gap-6 mt-16 ">
        {
          [1, 2, 3, 4, 5, 6].map(() => (
            <a href="" className="relative rounded-lg overflow-hidden">
              <img src={gameImg} alt="" />

              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
                <strong className="text-white block">League of legends</strong>
                <span className="text-zinc-300 text-sm block ">4 anúncios</span>
              </div>
            </a>
          ))
        }
      </div>
        
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
          <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center ">
            <div>
              <strong className="block text-white text-2xl font-black">Não encontrou seu duo?</strong>
              <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
            </div>

            <button className="flex items-center gap-3 bg-violet-500 px-4 py-3 rounded-md hover:bg-violet-600 transition-all
            `">
              <MagnifyingGlassPlus size={24} color="#fff"/>
              <span className="text-white">Publicar anúncio</span>
            </button>
          </div> 
        </div>
    </div>
  )
}

 