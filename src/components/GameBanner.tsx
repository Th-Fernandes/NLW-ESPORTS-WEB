interface Props {
  bannerUrl: string;
  title: string;
  adsAmount: number ;
}

export function GameBanner({title, adsAmount, bannerUrl}: Props) {
  function handleAdsMessage(adsAmount:number) {
    if (adsAmount > 1) return `${adsAmount} anúncios`
    return `${adsAmount} anúncio`
  }

  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
        <strong className="text-white block">
          {title}
        </strong>
        <span className="text-zinc-300 text-sm block ">
          {handleAdsMessage(adsAmount)}
        </span>
      </div>
    </a>
  )
}