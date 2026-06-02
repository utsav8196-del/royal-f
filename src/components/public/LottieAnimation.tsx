import Lottie from 'lottie-react'
// Import a static JSON file (you can download a free animation from lottiefiles.com and place in src/assets/hero-animation.json)
import animationData from '@/assets/hero-animation.json'

export default function LottieAnimation() {
  return <Lottie animationData={animationData} loop={true} className="w-full h-full" />
}