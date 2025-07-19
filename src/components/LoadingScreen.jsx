import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [throwBomb, setThrowBomb] = useState(false);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prev) => {
        const next = prev - 1;

        if (prev === 2) {
          setTimeout(() => setThrowBomb(true), 800);
        }

        if (prev <= 1) {
          clearInterval(countdown);
          setTimeout(() => setExploded(true), 1000);
          setTimeout(() => {
            onComplete();
          }, 1600);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${exploded ? "bg-red-600" : "bg-black"} text-white`}>
      <div className="relative w-48 h-64 flex items-center justify-center">
        {/* Speech Bubble Above Head */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative bg-white text-black px-4 py-2 rounded-full text-lg font-semibold shadow-md">
            {count > 0 ? count : "Boom!"}
            {/* Optional speech bubble pointer */}
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
          </div>
        </div>

        {/* Stickman SVG */}
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Head */}
          <circle cx="20" cy="15" r="6" stroke="white" strokeWidth="2" fill="none" />
          {/* Body */}
          <line x1="20" y1="21" x2="20" y2="50" stroke="white" strokeWidth="2" />
          {/* Arms in throwing pose */}
          <path d="M20 28 Q10 20 5 10" stroke="white" strokeWidth="2" fill="none" />
          <path d="M20 28 Q30 32 40 38" stroke="white" strokeWidth="2" fill="none" />
          {/* Legs */}
          <path d="M20 50 Q15 65 10 80" stroke="white" strokeWidth="2" fill="none" />
          <path d="M20 50 Q25 65 30 80" stroke="white" strokeWidth="2" fill="none" />
        </svg>

        {/* Bomb Animation */}
        {throwBomb && (
          <div className="absolute left-[5px] top-[5px] w-5 h-5 rounded-full bg-gradient-to-tr from-red-700 to-black shadow-lg animate-bomb-fly">
            <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full absolute -top-1 left-1 animate-flicker" />
          </div>
        )}
      </div>

      {/* Optional Explosion Flash */}
      {exploded && <div className="absolute inset-0 bg-white opacity-80 animate-fadeout pointer-events-none" />}

      {/* Keyframes */}
      <style>
        {`
          @keyframes bomb-fly {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translateX(500px) translateY(-150px) rotate(720deg); opacity: 0; }
          }

          @keyframes flicker {
            0%, 100% { opacity: 0.9; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.3); }
          }

          @keyframes fadeout {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }

          .animate-bomb-fly {
            animation: bomb-fly 1.2s ease-in forwards;
          }

          .animate-flicker {
            animation: flicker 0.3s infinite;
          }

          .animate-fadeout {
            animation: fadeout 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};
