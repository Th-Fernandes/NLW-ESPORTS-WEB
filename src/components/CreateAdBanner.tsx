import {MagnifyingGlassPlus} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8  bg-nlw-gradient self-stretch rounded-lg  overflow-hidden ">
      <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center ">
        <div>
          <strong className="block text-white text-2xl font-black">Não encontrou seu duo?</strong>
          <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className="flex items-center gap-3 bg-violet-500 px-4 py-3 rounded-md hover:bg-violet-600 transition-all">
          <MagnifyingGlassPlus size={24} color="#fff" />
          <span className="text-white">Publicar anúncio</span>
        </Dialog.Trigger>
      </div>
    </div>
  )
}