import { useEffect, useState, FormEvent } from "react";
import * as Dialog  from "@radix-ui/react-dialog";
import * as Checkbox  from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/input";
import axios from "axios"

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number
  }
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean | 'indeterminate'>(false);
  
  useEffect(() => {
    axios('http://localhost:3001/games')
      .then(games => setGames(games.data))
  },[])

  async function handleCreateAd(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name) return

    try {
      axios.post(`http://localhost:3001/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnds: data.hourEnds,
        useVoiceChannel: useVoiceChannel
      })
      console.log('criou ')
    } catch(e) {
      console.error(e)
    }

    console.log({
      ...data,
      weekDays,
      useVoiceChannel
    })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0  bg-black/60" />

      <Dialog.Content 
        className="fixed bg-[#2a2634] py-8 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 
        -translate-y-1/2 w-[480px] shadow-black/20">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form onSubmit={event => handleCreateAd(event)} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <select 
              name="game"
              id="game" 
              className="bg-zinc-900 h-12 py-3 px-4 rounded text-sm text-zinc-300"  
            >
              <option  
                className="text-zinc-500" 
                defaultValue="" 
                disabled
                > 
                  Selecione o game que deseja jogar
                </option>
              {
                games.map(game => (
                  <option key={game.id} value={game.id}>{game.title}</option>
                ))
              }
            </select>
          </div>

          <div className="flex flex-col  gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" type="text" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

          <ToggleGroup.Root 
            type="multiple" 
            onValueChange={setWeekDays}
            value={weekDays}
            className="grid grid-cols-5 gap-1"
          >
              {
                ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',].map((item, index ) => {
                  const indexToString = index + '';
                  const handleSelectedItem = weekDays.includes(indexToString) && 'bg-purple-600';

                  return (
                    <ToggleGroup.Item 
                    value={indexToString} 
                    key={item}
                    className={`bg-zinc-900 text-white w-10 h-10 font-bold ${handleSelectedItem}`}
                    >
                      {item}
                    </ToggleGroup.Item>
                  )
                })
              } 
            </ToggleGroup.Root>

            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-[6px]">
                <Input name="hourStart" id="hourStart" type="time" />
                <Input name="hourEnds" id="hourEnds" type="time" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer select-none ">
            <Checkbox.Root 
              checked={useVoiceChannel}
              onCheckedChange={checked => setUseVoiceChannel(checked)}
              className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
              <Checkbox.Indicator className="text-emerald-400">
                <Check size={16} weight="bold" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="flex gap-4 justify-end mt-8">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              cancelar
            </Dialog.Close>
            <button type="submit" className="flex items-center gap-2 bg-violet-500 rounded-md px-5 font-semibold hover:bg-violet-600">
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}