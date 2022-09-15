import { useEffect, useState } from "react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg"
import "./styles/main.css";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/input";

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
    fetch('http://localhost:3001/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  return (
    <div className="flex items-center flex-col max-w-[1344px] mx-auto m-20 ">
      <img className="" src={logoImg} alt="" />

      <h1 className="text-[64px] text-white font-black mt-12">
        SEU
        <span className="bg-nlw-gradient bg-clip-text text-transparent"> DUO </span>
        ESTÁ AQUI</h1>

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

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  bg-black/60" />

          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-black/20">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form action="" className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar" />
              </div>

              <div className="flex flex-col  gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" type="text" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-5 gap-1">
                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Domingo">
                      D
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Segunda">
                      S
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Terça">
                      T
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Quarta">
                      Q
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Quinta">
                      Q
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Sexta">
                      S
                    </button>

                    <button
                      className="bg-zinc-900 text-white w-10 h-10 font-bold "
                      title="Sábado">
                      S
                    </button>

                  </div>

                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-[6px]">
                    <Input id="hourStart" type="time" />
                    <Input id="hourEnd" type="time" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="flex gap-4 justify-end mt-8">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                >
                  cancelar
                </Dialog.Close>
                <button type="submit" className="flex items-center gap-2 bg-violet-500 rounded-md px-5 font-semibold hover:bg-violet-600">
                  <GameController size={24}/>
                  Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


    </div>
  )
}

