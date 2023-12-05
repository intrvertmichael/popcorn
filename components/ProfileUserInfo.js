import { useUserContext } from "context"

export default function ProfiledUserInfo() {
  const { username, setUsername } = useUserContext()

  const handleNameClick = () =>
    setUsername(prompt("Please enter your name", username ?? ""))

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div className='w-32 bg-gray-500 rounded-full aspect-square' />

      <div className='grid w-1/3 gap-3 text-center group'>
        {username ? (
          <p className='text-3xl capitalize group-hover:hidden'>
            Hello {username}
          </p>
        ) : (
          <p>Hey, what is your name ?</p>
        )}

        <button
          className={`px-3 py-2 text-sm rounded ${
            username
              ? "bg-neutral-950 text-neutral-700 border border-neutral-900 hidden group-hover:block"
              : "bg-neutral-900 text-neutral-400 border border-neutral-700"
          } hover:text-white`}
          onClick={handleNameClick}
        >
          {username ? "Change Name" : "Add name"}
        </button>
      </div>
    </div>
  )
}
