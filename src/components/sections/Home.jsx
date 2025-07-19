import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Home = () => {
  const [stage, setStage] = useState("initial"); // initial → surprise → cake → ghost → final
  const [showWeapon, setShowWeapon] = useState(false);
  const [showGhost, setShowGhost] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [message, setMessage] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [teaseIndex, setTeaseIndex] = useState(0);
  const [showCompliment, setShowCompliment] = useState(false);
  const [showTease, setShowTease] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [showCakeHint, setShowCakeHint] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);

  // Messages sequence with more teasing
  const messages = {
    initial: "Click the stickman to begin Pragathi's special day...",
    surprise: "😂 Haha! “Wait sikirama mudichirum nu nenaichiya 🎂”",
    cake: "BLOW OUT THE CANDLES! (Click 10 times to blow them!) 🕯️",
    ghost: "BOO! 👻 Just kidding... unless? 😈",
    final: "Wishing the most amazing birthday to our favorite troublemaker! 🎉"
  };

  // Teasing messages that will randomly appear
  const teasingMessages = [
    "Pragathi, stop clicking so much! 😤",
    "We know you're excited, but calm down! 😅",
    "Someone's click-happy today! 🖱️",
    "Pragathi's breaking the click counter! 💥",
    "At this rate, you'll wear out your mouse! 🐭",
    "Save some clicks for the rest of us! 🙄"
  ];

  // Complimentary messages
  const compliments = [
    
    "Actually though, you're awesome! 😊",
    "Just kidding, we love you! ❤️",
    "You're the best, even if you click too much! 😘",
    "Our favorite birthday girl! 🥳",
    "The most fun person to tease! 😁"
  ];

  // Wishes from friends
  const birthdayWishes = [
    "Happy Birthday Pragathi! 🎉",
    "Wishing you an amazing year ahead! ✨",
    "May all your dreams come true! 🌟",
    "You're the best! Stay awesome! 😎",
    "Another year of being fabulous! 💃",
    "Hope your day is as special as you are! 💖",
    "Sending you lots of love! ❤️",
    "Eat lots of cake today! 🍰"
  ];

  useEffect(() => {
    if (stage === "surprise") {
      const timer = setTimeout(() => {
        setShowWeapon(true);
        setMessage(messages.surprise);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (stage === "cake") {
      const cakeTimer = setTimeout(() => {
        setShowCake(true);
        setMessage(messages.cake);
        // Show hint after 3 seconds if not clicked
        const hintTimer = setTimeout(() => {
          if (!candleBlown) setShowCakeHint(true);
        }, 3000);
        return () => clearTimeout(hintTimer);
      }, 1000);
      return () => clearTimeout(cakeTimer);
    }

    if (stage === "ghost") {
      const ghostTimer = setTimeout(() => {
        setShowGhost(true);
        setMessage(messages.ghost);
      }, 2000);
      
      const jumpscareTimer = setTimeout(() => {
        setShowJumpscare(true);
        setTimeout(() => setShowJumpscare(false), 800);
      }, 3500);
      
      const finalTimer = setTimeout(() => {
        setStage("final");
        setShowFinal(true);
        setMessage(messages.final);
        setShowHearts(true);
        // Start adding friends
        const friendInterval = setInterval(() => {
          if (friendsCount < 15) {
            setFriendsCount(prev => prev + 1);
          }
        }, 500);
        return () => clearInterval(friendInterval);
      }, 5000);
      
      return () => {
        clearTimeout(ghostTimer);
        clearTimeout(jumpscareTimer);
        clearTimeout(finalTimer);
      };
    }
  }, [stage, candleBlown]);

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      // Show teasing message randomly after 5 clicks
      if (newCount > 5 && Math.random() > 0.7 && !showTease && !showCompliment) {
        setShowTease(true);
        setTeaseIndex(Math.floor(Math.random() * teasingMessages.length));
        setTimeout(() => {
          setShowTease(false);
          // Sometimes follow up with a compliment
          if (Math.random() > 0.5) {
            setShowCompliment(true);
            setTimeout(() => setShowCompliment(false), 2000);
          }
        }, 2000);
      }
      
      return newCount;
    });
    
    if (stage === "initial") {
      setStage("surprise");
      setMessage("");
    } else if (stage === "surprise" && clickCount > 2) {
      setStage("cake");
    } else if (stage === "cake" && clickCount > 10 && !candleBlown) {
      blowCandles();
    }
  };

  const blowCandles = () => {
    setCandleBlown(true);
    setShowCakeHint(false);
    setMessage("Wish granted! 🎉");
    setTimeout(() => {
      setStage("ghost");
    }, 2000);
  };

  // Special easter egg if Pragathi clicks too much
  useEffect(() => {
    if (clickCount > 20) {
      setMessage(`Okay Pragathi, ${clickCount} clicks is enough! 😂`);
    }
  }, [clickCount]);

  // Render a friend stickman
  const renderFriend = (index) => {
    const colors = ["#ff69b4", "#66ccff", "#99ff99", "#ffcc66", "#cc99ff"];
    const color = colors[index % colors.length];
    
    return (
      <motion.div
        key={index}
        className="absolute"
        style={{
          left: `${10 + (index * 6) % 80}%`,
          top: `${20 + Math.random() * 60}%`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          {/* Head */}
          <circle cx="50" cy="30" r="15" fill="#ffe0b2" stroke={color} strokeWidth="2"/>
          
          {/* Smiling face */}
          <circle cx="40" cy="25" r="2" fill="#000"/>
          <circle cx="60" cy="25" r="2" fill="#000"/>
          <path d="M40,35 Q50,45 60,35" fill="none" stroke="#000" strokeWidth="2"/>
          
          {/* Body */}
          <line x1="50" y1="45" x2="50" y2="65" stroke={color} strokeWidth="2"/>
          
          {/* Arms */}
          <line x1="50" y1="55" x2="35" y2="60" stroke={color} strokeWidth="2"/>
          <line x1="50" y1="55" x2="65" y2="60" stroke={color} strokeWidth="2"/>
          
          {/* Legs */}
          <line x1="50" y1="65" x2="40" y2="80" stroke={color} strokeWidth="2"/>
          <line x1="50" y1="65" x2="60" y2="80" stroke={color} strokeWidth="2"/>
          
          {/* Holding a present or balloon */}
          {index % 3 === 0 && <text x="30" y="55" fontSize="12">🎁</text>}
          {index % 3 === 1 && <text x="65" y="55" fontSize="12">🎈</text>}
          {index % 3 === 2 && <text x="65" y="55" fontSize="12">🎉</text>}
        </svg>
        
        {/* Speech bubble with wishes */}
        <motion.div
          className="absolute -top-10 left-0 right-0 bg-white text-black p-2 rounded-lg text-xs"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {birthdayWishes[index % birthdayWishes.length]}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-purple-900 opacity-70"></div>
      
      {/* Floating balloons with Pragathi's name */}
      {stage !== "initial" && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${10 + i * 20}%`,
            top: `${10 + Math.random() * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity
          }}
        >
          {i % 2 === 0 ? "🎈" : "P"}
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xs absolute -bottom-5 left-0 right-0 text-center text-white"
          >
            {i % 2 === 0 ? "Pragathi" : "🎂"}
          </motion.span>
        </motion.div>
      ))}

      {/* Jumpscare effect */}
      <AnimatePresence>
        {showJumpscare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 0.3 }}
              className="text-9xl"
            >
              👻
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-20 text-white text-xl"
            >
              Gotcha, Pragathi! 😈
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teasing message popup */}
      <AnimatePresence>
        {showTease && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed top-20 bg-pink-700 text-white p-4 rounded-lg shadow-lg z-50"
          >
            {teasingMessages[teaseIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compliment message popup */}
      <AnimatePresence>
        {showCompliment && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed top-32 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50"
          >
            {compliments[Math.floor(Math.random() * compliments.length)]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="z-10 text-center">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-pink-400"
          animate={{
            scale: stage === "final" ? [1, 1.1, 1] : 1,
            textShadow: stage === "final" 
              ? ["0 0 10px #ff69b4, 0 0 20px #ff69b4", "0 0 15px #ff69b4, 0 0 25px #ff69b4", "0 0 10px #ff69b4, 0 0 20px #ff69b4"]
              : "none"
          }}
          transition={{ 
            duration: stage === "final" ? 2 : 0,
            repeat: stage === "final" ? Infinity : 0
          }}
        >
          {message || "Hello !!"}
        </motion.h1>

        {/* Click counter tease */}
        {clickCount > 10 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-yellow-300 mb-4"
          >
            Clicks: {clickCount} {clickCount > 15 ? "🙄" : "😏"}
          </motion.div>
        )}

        {/* Cake hint */}
        {showCakeHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 mb-2 text-lg"
          >
            Click the candles 10 times to blow them out! 🎂
          </motion.div>
        )}

        {/* Stickman container */}
        <div className="flex justify-center items-center gap-16 mb-8">
          {/* Birthday person stickman - now represents Pragathi */}
          <motion.div 
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer relative"
            animate={{
              y: stage === "ghost" ? [0, -20, 0] : 0,
              rotate: stage === "ghost" ? [0, 10, -10, 0] : 0
            }}
            transition={{
              duration: 2,
              repeat: stage === "ghost" ? Infinity : 0
            }}
          >
            <svg width="150" height="150" viewBox="0 0 150 150">
              {/* Head */}
              <circle cx="75" cy="40" r="20" fill="#ffe0b2" stroke="#ff69b4" strokeWidth="2"/>
              
              {/* Face changes expression */}
              {stage === "initial" && (
                <>
                  <path d="M65,45 Q75,55 85,45" fill="none" stroke="#000" strokeWidth="2"/>
                  <circle cx="65" cy="35" r="3" fill="#000"/>
                  <circle cx="85" cy="35" r="3" fill="#000"/>
                </>
              )}
              {stage === "surprise" && (
                <>
                  <circle cx="65" cy="35" r="4" fill="#000"/>
                  <circle cx="85" cy="35" r="4" fill="#000"/>
                  <circle cx="65" cy="35" r="1.5" fill="#fff"/>
                  <circle cx="85" cy="35" r="1.5" fill="#fff"/>
                  <path d="M65,50 Q75,40 85,50" fill="none" stroke="#000" strokeWidth="2"/>
                </>
              )}
              {stage === "cake" && (
                <>
                  <path d="M65,45 Q75,55 85,45" fill="none" stroke="#000" strokeWidth="2"/>
                  <circle cx="65" cy="35" r="3" fill="#000"/>
                  <circle cx="85" cy="35" r="3" fill="#000"/>
                  {/* Tongue sticking out */}
                  <path d="M70,50 Q75,60 80,50" fill="red" stroke="#000" strokeWidth="1"/>
                </>
              )}
              {stage === "ghost" && (
                <>
                  <path d="M60,40 Q75,30 90,40" fill="none" stroke="#000" strokeWidth="2"/>
                  <circle cx="65" cy="35" r="3" fill="#000"/>
                  <circle cx="85" cy="35" r="3" fill="#000"/>
                  {/* X eyes */}
                  <line x1="62" y1="33" x2="68" y2="37" stroke="#000" strokeWidth="2"/>
                  <line x1="68" y1="33" x2="62" y2="37" stroke="#000" strokeWidth="2"/>
                  <line x1="82" y1="33" x2="88" y2="37" stroke="#000" strokeWidth="2"/>
                  <line x1="88" y1="33" x2="82" y2="37" stroke="#000" strokeWidth="2"/>
                </>
              )}
              {stage === "final" && (
                <>
                  <path d="M65,45 Q75,60 85,45" fill="none" stroke="#000" strokeWidth="2"/>
                  <circle cx="65" cy="35" r="3" fill="#000"/>
                  <circle cx="85" cy="35" r="3" fill="#000"/>
                  {/* Heart eyes */}
                  <path d="M62,35 Q65,30 68,35 Q65,40 62,35" fill="red"/>
                  <path d="M82,35 Q85,30 88,35 Q85,40 82,35" fill="red"/>
                </>
              )}
              
              {/* Body */}
              <line x1="75" y1="60" x2="75" y2="90" stroke="#ff69b4" strokeWidth="3"/>
              {/* Arms */}
              <line x1="75" y1="70" x2="55" y2="80" stroke="#ff69b4" strokeWidth="3"/>
              <line x1="75" y1="70" x2="95" y2="80" stroke="#ff69b4" strokeWidth="3"/>
              {/* Legs */}
              <line x1="75" y1="90" x2="65" y2="110" stroke="#ff69b4" strokeWidth="3"/>
              <line x1="75" y1="90" x2="85" y2="110" stroke="#ff69b4" strokeWidth="3"/>
              
              {/* Birthday hat */}
              {stage !== "final" && (
                <polygon points="55,25 75,5 95,25" fill="#ff0000"/>
              )}
              
              {/* Party hat for final */}
              {stage === "final" && (
                <>
                  <polygon points="60,20 75,0 90,20" fill="#00ff00"/>
                  <circle cx="75" cy="5" r="3" fill="#ffff00"/>
                </>
              )}
              
              {/* Name tag */}
              <rect x="50" y="95" width="50" height="20" rx="5" fill="white"/>
              <text x="75" y="110" textAnchor="middle" fontSize="12" fill="black">Doli</text>
            </svg>
            <p className="text-white mt-2">
              {stage === "initial" ? "Click here , Pragathi!" : 
               stage === "surprise" ? "Keep clicking ra!" : 
               stage === "cake" ? "Blow the candles!" : 
               stage === "ghost" ? "Watch out!" : "❤️"}
            </p>
          </motion.div>

          {/* Thief stickman (appears after click) */}
          {(stage === "surprise" || stage === "cake") && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: stage === "cake" ? [0, -5, 0] : 0
              }}
              transition={{ 
                duration: 0.5,
                y: stage === "cake" ? {
                  duration: 1,
                  repeat: Infinity
                } : {}
              }}
            >
              <svg width="150" height="150" viewBox="0 0 150 150">
                {/* Head */}
                <circle cx="75" cy="40" r="20" fill="#333" stroke="#666" strokeWidth="2"/>
                {/* Face changes expression */}
                {stage === "surprise" && (
                  <>
                    <circle cx="65" cy="35" r="3" fill="#fff"/>
                    <circle cx="85" cy="35" r="3" fill="#fff"/>
                    <path d="M65,50 Q75,60 85,50" fill="none" stroke="#fff" strokeWidth="2"/>
                  </>
                )}
                {stage === "cake" && (
                  <>
                    <circle cx="65" cy="35" r="3" fill="#fff"/>
                    <circle cx="85" cy="35" r="3" fill="#fff"/>
                    <path d="M65,50 Q75,40 85,50" fill="none" stroke="#fff" strokeWidth="2"/>
                  </>
                )}
                {/* Body */}
                <line x1="75" y1="60" x2="75" y2="90" stroke="#666" strokeWidth="3"/>
                {/* Arms */}
                <line x1="75" y1="70" x2="55" y2="80" stroke="#666" strokeWidth="3"/>
                <line x1="75" y1="70" x2="95" y2="80" stroke="#666" strokeWidth="3"/>
                {/* Legs */}
                <line x1="75" y1="90" x2="65" y2="110" stroke="#666" strokeWidth="3"/>
                <line x1="75" y1="90" x2="85" y2="110" stroke="#666" strokeWidth="3"/>
                {/* Weapon (appears after delay) */}
                {showWeapon && stage === "surprise" && (
                  <text x="40" y="70" fontSize="20" fill="red">💥</text>
                )}
                {/* Cake when in cake stage */}
                {stage === "cake" && showCake && (
                  <g onClick={handleClick} className="cursor-pointer">
                    <rect x="50" y="45" width="50" height="20" rx="5" fill="#f5f5dc" stroke="#d2b48c" strokeWidth="2"/>
                    <rect x="60" y="65" width="30" height="10" fill="#d2b48c"/>
                    {/* Candles - animate when blown */}
                    {!candleBlown ? (
                      <>
                        <line x1="65" y1="45" x2="65" y2="30" stroke="#ffd700" strokeWidth="2"/>
                        <line x1="75" y1="45" x2="75" y2="25" stroke="#ffd700" strokeWidth="2"/>
                        <line x1="85" y1="45" x2="85" y2="30" stroke="#ffd700" strokeWidth="2"/>
                        {/* Flames */}
                        <motion.circle 
                          cx="65" cy="25" r="3" fill="#ff4500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <motion.circle 
                          cx="75" cy="20" r="4" fill="#ff4500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                        <motion.circle 
                          cx="85" cy="25" r="3" fill="#ff4500"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      </>
                    ) : (
                      <>
                        <line x1="65" y1="45" x2="65" y2="35" stroke="#ffd700" strokeWidth="2"/>
                        <line x1="75" y1="45" x2="75" y2="35" stroke="#ffd700" strokeWidth="2"/>
                        <line x1="85" y1="45" x2="85" y2="35" stroke="#ffd700" strokeWidth="2"/>
                        {/* Smoke puffs */}
                        <motion.circle 
                          cx="65" cy="30" r="1" fill="#ccc"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0], cy: [30, 15, 10] }}
                          transition={{ duration: 2 }}
                        />
                        <motion.circle 
                          cx="75" cy="30" r="1.5" fill="#ccc"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0], cy: [30, 10, 5] }}
                          transition={{ duration: 2, delay: 0.3 }}
                        />
                        <motion.circle 
                          cx="85" cy="30" r="1" fill="#ccc"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0], cy: [30, 15, 10] }}
                          transition={{ duration: 2, delay: 0.6 }}
                        />
                      </>
                    )}
                    {/* "Pragathi" written on cake */}
                    <text x="75" y="60" textAnchor="middle" fontSize="8" fill="black">PRAGATHI</text>
                  </g>
                )}
              </svg>
              <p className="text-white mt-2">
                {stage === "surprise" ? "Surprise!" : 
                 candleBlown ? "Wish granted!" : "Make a wish, Pragathi!"}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Ghost element with personalized message */}
      <AnimatePresence>
        {showGhost && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, -20, 20, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1,
              x: { duration: 3, repeat: Infinity }
            }}
            className="absolute top-1/4 text-6xl z-20"
          >
            👻
            <motion.div 
              className="absolute top-full left-0 right-0 text-white text-sm mt-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pragathi's scared! 😱
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final celebration elements */}
      {showFinal && (
        <>
          {/* Friends appearing to celebrate */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(friendsCount)].map((_, i) => renderFriend(i))}
          </div>

          {/* Confetti with Pragathi's name */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  color: ["#ff0000", "#ffcc00", "#00ff00", "#00ccff"][i % 4]
                }}
                initial={{ y: -100, rotate: 0 }}
                animate={{ y: "100vh", rotate: 360 }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 0.5
                }}
              >
                {i % 5 === 0 ? "P" : 
                 i % 5 === 1 ? "🎊" : 
                 i % 5 === 2 ? "✨" : 
                 i % 5 === 3 ? "🎈" : "🎁"}
                {i % 5 === 0 && (
                  <span className="text-xs absolute -bottom-5 left-0 right-0 text-center">
                    Pragathi
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Floating hearts with occasional messages */}
          {showHearts && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl text-pink-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [1, 0],
                scale: [1, 1.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
            >
              {i % 4 === 0 ? "P" : "❤️"}
              {i % 4 === 0 && (
                <span className="text-xs absolute -bottom-5 left-0 right-0 text-center text-white">
                  {i % 8 === 0 ? "Pragathi" : "🎂"}
                </span>
              )}
            </motion.div>
          ))}

          {/* Final birthday message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-10 bg-pink-600 text-white p-4 rounded-lg shadow-lg z-50 text-xl"
          >
           Happy Birthday, Pragathi! 🎉
Hope your day’s as extra as you are 💖
Now stop blushing… okay wait, don’t 😜
          </motion.div>
        </>
      )}
    </div>
  );
};

