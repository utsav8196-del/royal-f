import { motion } from 'framer-motion'

interface TeamMember {
  _id: string
  name: string
  role: string
  image?: string
  bio?: string
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="text-center">
      <img
        src={member.image || 'https://via.placeholder.com/150'}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary shadow-md"
      />
      <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
      {member.bio && <p className="text-sm text-gray-500 mt-2">{member.bio}</p>}
    </motion.div>
  )
}