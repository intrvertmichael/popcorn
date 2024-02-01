import { APP_FEATURES } from "constants/general"

export default function Intro() {
  return (
    <div className='flex items-center justify-center flex-1 py-10 mx-3'>
      <ul className='flex flex-col gap-3 px-10 py-5 border-2 rounded-md border-neutral-900 bg-gradient-to-r from-neutral-950 to-neutral-900 h-fit'>
        {APP_FEATURES?.map(feature => (
          <li
            key={feature.icon}
            className='flex-row items-center gap-6 sm:flex'
          >
            <span className='text-2xl'>{feature.icon}</span>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
