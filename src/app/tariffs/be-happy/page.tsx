"use client"

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export default function BeHappy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const waveColors = [
    "hsl(70, 90%, 48%)",
    "hsl(50, 90%, 48%)", 
    "hsl(10, 90%, 48%)"  
  ];

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const waveCount = Math.max(5, Math.floor(containerHeight / 150));

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-rose-950 to-gray-800 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: waveCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-12 w-[300%]"
            style={{
              bottom: `${10 + (i * 100 / waveCount)}%`,
              left: "0%",
              borderRadius: "100% 50%",
              background: waveColors[i % waveColors.length],
              filter: "blur(1px)",
              willChange: "transform",
              mixBlendMode: isHovered ? "difference" : "hard-light",
              opacity: 0.7 - (i * 0.5 / waveCount)
            }}
            animate={{
              x: ["0%", "-100%"],
              y: [0, i % 2 === 0 ? -8 : 8],
              rotate: [0, 3, 0, -3, 0]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
              y: {
                duration: 8 + i * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              },
              rotate: {
                duration: 10 + i * 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 grid min-h-screen place-items-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <main className="flex flex-col items-center gap-8 max-w-2xl text-center">
          {/* Логотип */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              damping: 7
            }}
          >
            <Image
              src="/Picsart_25-05-25_00-26-53-042.png"
              alt="GXLand Logo"
              width={192}
              height={192}
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
              priority
            />
          </motion.div>

          {/* Основной текст */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Тариф <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">&quot;Быть счастливым&quot;</span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            className="text-xl text-white text-shadow-gray-400 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Потому что счастье — это не пункт назначения, а способ путешествия
          </motion.p>
          
          {/* Декоративная линия */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-rose-500 to-white my-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
          />

          {/* Описание тарифа */}
          <motion.div
            className="text-white-100 text-shadow-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="mb-4">
              Этот тариф для тех, кто понял, что деньги — всего лишь инструмент. 
              Настоящее богатство — в свободе, гармонии и возможности говорить &quot;нет&quot; тому, что не приносит радости.
            </p>
            
            <div className="bg-gradient-to-br from-rose-900/30 to-emerald-900/30 p-4 rounded-lg border border-rose-800/50 my-6">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-white mb-2">
                Что включает просветление:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-left">
                <li>Ежедневные медитации &quot;Ом на минималках&quot;</li>
                <li>Доступ к закрытым чатам с псевдобуддами</li>
                <li>Гарантия невозврата денег (непривязанность к материальному)</li>
                <li>Персональный коуч, который скажет вам то, что вы хотите услышать</li>
                <li>NFT-сертификат &quot;Я духовно богат&quot;</li>
                <li>Любой дом в любой точке мира на выбор</li>
                <li>Гражданство абсолютно всех бантустанов мира</li>
                <li>Любая машина на цвет и вкус</li>
                <li>Техника по высшему разряду</li>
                <li>Личные крепостные</li>
                <li>Ангар с транспортом всех мастей</li>
                <li>Много... очень много оружия!</li>
              </ul>
            </div>

            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-white mt-6">
              Всего 427 346 529 110 ₸ (ответ на главный вопрос жизни)
            </p>
            <p className="text-sm text-gray-400 mt-2">
              *42 — согласно &quot;Автостопом по галактике&quot;, ответ на главный вопрос жизни, вселенной и всего такого
            </p>
          </motion.div>

          {/* Группа кнопок */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-8 w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/tariffs/pf3" passHref className="w-full sm:w-auto flex-1 min-w-[200px]">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-gray-500 hover:from-rose-700 hover:to-gray-600 text-white rounded-full font-medium transition-colors w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Купить просветление
              </motion.button>
            </Link>

            <Link href="/" passHref className="w-full sm:w-auto flex-1 min-w-[200px]">
              <motion.button
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium transition-colors w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Я уже счастлив
              </motion.button>
            </Link>
          </motion.div>

          {/* Дополнительный текст */}
          <motion.p 
            className="text-white text-shadow-gray-400 mt-6 text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            *Оплачивая этот тариф, вы осознаёте, что настоящее счастье нельзя купить. 
            Но за эти деньги мы сделаем вид, что это не так.
          </motion.p>
        </main>
      </motion.div>
    </div>
  );
}