import React from 'react'
import { motion } from 'framer-motion'

export default function Landing() {
	const scrollToNext = () => {
		const next = document.querySelector('.functions-section')
		if (next) next.scrollIntoView({ behavior: 'smooth' })
	}

	const title = "Akshat weds Samiksha"
	const letters = title.split("")

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05
			}
		}
	}

	const letterVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	}

	return (
		<section className="hero-section-full">
			<div className="hero-bg-full" style={{ backgroundImage: 'url(cover.jpg)' }} />
			<div className="hero-overlay-full" />
			<div className="site-hashtag">#SamAksh</div>

			<motion.div
				className="hero-text-bottom"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<motion.h1
					className="landing-title"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{letters.map((letter, index) => (
						<motion.span key={index} variants={letterVariants}>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
					))}
				</motion.h1>
				<motion.p
					className="landing-date"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.2 }}
				>
					12th March, 2026
				</motion.p>
				<motion.button
					className="scroll-arrow"
					onClick={scrollToNext}
					aria-label="Scroll to next section"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, y: [0, 8, 0] }}
					transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 1.5 } }}
				>
					↓
				</motion.button>
			</motion.div>
		</section>
	)
}

