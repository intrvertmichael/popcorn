import { APP_FEATURES } from "constants/general"

export default function Intro() {
  return (
    <div className='flex items-center justify-center flex-1 py-10'>
      <ul className='flex flex-col px-10 py-5 border-2 border-neutral-900 rounded-md bg-gradient-to-r from-neutral-950 to-neutral-900 h-fit'>
        {APP_FEATURES?.map(feature => (
          <li key={feature.icon} className='flex items-center gap-3'>
            <span className='text-2xl'>{feature.icon}</span>{" "}
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
