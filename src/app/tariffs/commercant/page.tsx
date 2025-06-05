"use client"

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Commercant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const waveColors = [
    "hsl(2, 90%, 48%)",  // Тёмно-красный
    "hsl(41, 90%, 48%)", // Тёмно-оранжевый
    "hsl(59, 90%, 48%)"  // Тёмно-жёлтый
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
      className="relative min-h-screen bg-gradient-to-b from-orange-950 via-amber-950 to-yellow-950 overflow-hidden"
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
              filter: "",
              willChange: "transform",
              mixBlendMode: "hard-light",
              opacity: 0.8 - (i * 0.6 / waveCount)
            }}
            animate={{
              x: ["0%", "-100%"],
              y: [0, i % 2 === 0 ? -5 : 5],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
              y: {
                duration: 6 + i * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              },
              rotate: {
                duration: 8 + i * 3,
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
            Тариф <span className="text-orange-500">&quot;Коммерсант&quot;</span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            className="text-xl text-white text-shadow-gray-400 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Для настоящих челноков постсоветского пространства
          </motion.p>
          
          {/* Декоративная линия */}
          <motion.div
            className="w-32 h-1 bg-orange-500 my-2"
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
              Этот тариф создан специально для потомков тех легендарных личностей, которые в 90-е возили 
              &quot;челночные&quot; грузы из Турции и Китая, заполонив рынки дешёвым ширпотребом. 
              Мы чтим ваши традиции!
            </p>
            
            <div className="bg-orange-900 bg-opacity-30 p-4 rounded-lg border border-orange-800 my-6">
              <h3 className="text-xl font-bold text-orange-300 mb-2">Что вы получаете:</h3>
              <ul className="list-disc list-inside space-y-2 text-left">
                <li>Доступ к эксклюзивным &quot;челночным&quot; каналам</li>
                <li>Гарантированная наценка 300% на любой товар</li>
                <li>Секретные схемы ухода от налогов</li>
                <li>Настоящий &quot;базарный&quot; опыт общения</li>
                <li>Ностальгические воспоминания о &quot;Лужниках&quot;</li>
              </ul>
            </div>

            <p className="text-2xl font-bold text-orange-400 mt-6">
              Всего <span className="line-through text-gray-100">5 000</span> 1 МРП ({new Date().getFullYear()} год = 3 932 ₸)
            </p>
            <p className="text-sm text-gray-100 mt-2">
              *Цена привязана к МРП и меняется каждый год, как курс доллара в 90-е
            </p>
          </motion.div>

          {/* Группа кнопок */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-8 w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/tariffs/pf1" passHref className="w-full sm:w-auto flex-1 min-w-[200px]">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-full font-medium transition-colors w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Оплатить как в 90-е
              </motion.button>
            </Link>

            <Link href="/" passHref className="w-full sm:w-auto flex-1 min-w-[200px]">
              <motion.button
                className="px-6 py-3 bg-gray-400 hover:bg-gray-300 text-white rounded-full font-medium transition-colors w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Передумал (слабо?)
              </motion.button>
            </Link>
          </motion.div>

          {/* Дополнительный текст */}
          <motion.p 
            className="text-white text-shadow-white mt-6 text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            *Оплачивая подписку, вы соглашаетесь с тем, что мы не несём ответственности за качество 
            предоставляемых услуг, как и ваши поставщики в 90-е не несли ответственности за качество товара. 
            Но зато всё &quot;дёшево и сердито&quot;!
          </motion.p>
        </main>
      </motion.div>
    </div>
  );
}