


import React from 'react'
import { motion } from 'framer-motion'
import FrameA from '../assets/images/FrameA.png'
import FrameB from '../assets/images/FrameB.png'
import FrameC from '../assets/images/FrameC.png'

/* ===== VARIANTS ===== */
const sectionVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const floating = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

const Why = () => {
  return (
    <motion.section
      className='py-8 sm:py-12 md:py-[60px] bg-[#F8FAFF] text-[#111827]'
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className='max-w-6xl mx-auto px-6 text-center'>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className='text-xl sm:text-2xl md:text-3xl font-bold'
        >
          Why Learn With TechPro
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className='text-[#6B7280] mt-2 sm:mt-2 text-[14px] sm:text-base '
        >
          We provide structured, practical, and career-focused tech education.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={cardContainer}
          className='mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8'
        >
          {[
            {
              img: FrameA,
              title: 'Expert-Led Courses',
              text: 'Learn directly from experienced professionals who guide you every step of the way.',
            },
            {
              img: FrameB,
              title: 'Hands-On Projects',
              text: 'Build real-world projects that strengthen your skills and portfolio.',
            },
            {
              img: FrameC,
              title: 'Structured Learning Paths',
              text: 'Follow a clear roadmap designed to take you from beginner to advanced level.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: '0px 16px 32px rgba(0,0,0,0.12)',
              }}
              className='p-4 sm:p-6 rounded-xl shadow-md bg-white cursor-pointer'
            >
              {/* Floating Icon */}
              <motion.img
                src={item.img}
                alt={item.title}
                className='mx-auto mb-2 sm:mb-3'
                variants={floating}
                animate="animate"
              />

              <h2 className='font-semibold text-[16px] sm:text-lg mb-1 sm:mb-2'>
                {item.title}
              </h2>

              <p className='text-[#374151] text-[13px] sm:text-sm leading-relaxed'>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  )
}

export default Why
