import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import logoImg from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number
  }
}


export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3001/games')
      .then(response => setGames(response.data))
  }, [])

  return (
    <div className="flex items-center flex-col max-w-[1344px] mx-auto mt-20 px-4 md:px-8 xl:px-0  ">
      <img className="w-[190px] md:w-auto" src={logoImg} alt="logo" />

      <h1 className="text-white font-black mt-12 text-2xl md:text-5xl lg:text-[64px] ">
        SEU
        <span className="bg-nlw-gradient bg-clip-text text-transparent"> DUO </span>
        ESTÁ AQUI
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16 ">
        {
          games.map((game: Game) => (
            <GameBanner
              key={game.id}
              title={game.title}
              adsAmount={game._count.Ads}
              bannerUrl={game.bannerUrl}
            />
          ))
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>


    </div>
  )
}

