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
        className="mx-auto h-24 w-24 rounded-full border-4 border-primary object-cover shadow-md sm:h-32 sm:w-32"
      />
      <h3 className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">{member.name}</h3>
      <p className="text-sm text-gray-600 sm:text-base">{member.role}</p>
      {member.bio && <p className="mt-2 px-2 text-xs text-gray-500 sm:text-sm">{member.bio}</p>}
    </motion.div>
  )
}