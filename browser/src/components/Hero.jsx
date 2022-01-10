import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <div class="flex justify-end pt-8 pr-8">
        <div class="pr-4">
          <button className="glass-button">About</button>
        </div>
        <div>
          <button className="glass-button">Contribute</button>
        </div>
      </div>
      <div className="hero fadeInDown flex flex-col items-center justify-center">
        <h1 className="text-8xl pb-5 m-0">
          Pluriverse <span className="text-3xl">[noun]</span>
        </h1>
        <div className="text-3xl pb-8">plu·​ri·​verse | \ ˈplu̇rəˌvərs \</div>
        <div className="text-7xl pb-8">“a world where many worlds fit”</div>
        <div className="pt-4 text-2xl">– Zapatistas, Chiapas</div>
      </div>
    </div>
  );
}
