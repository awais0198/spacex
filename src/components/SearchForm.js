import { useState } from 'react'
import Modal from 'react-modal'
import SingleRocket from '../pages/SingleRocket'
import { getCurrentUser } from '../services'

export default function SearchForm() {
  const [searchInput, setSearchInput] = useState('')
  const [selectedRocket, setSelectedRocket] = useState(null)

  const openModal = (rocketId) => setSelectedRocket(rocketId)

  const closeModal = () => setSelectedRocket(null)

  const searchRocket = async () => {
    const response = await fetch(`https://api.spacexdata.com/v3/rockets/${searchInput}`)
    const result = await response.json()

    if (result && result.rocket_id)
      openModal(result.rocket_id)
  }

  return (
    <div className='md:w-96'>
      <div className='relative flex w-full flex-wrap items-stretch'>
        <input
          type='search'
          className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
          placeholder='Enter Rocket ID. i.e falcon9'
          aria-label='Enter Rocket ID...'
          aria-describedby='button-addon1'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          className='relative flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg'
          type='button'
          id='button-addon1'
          disabled={!getCurrentUser()?.token}
          onClick={searchRocket}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-5 w-5'
          >
            <path
              fillRule='evenodd'
              d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <Modal
          isOpen={selectedRocket !== null}
          onRequestClose={closeModal}
          portalClassName='test-modal-portal'
          style={{ content: { background: 'black' }, overlay: { background: '#000000a8' } }}
        >
          <SingleRocket id={selectedRocket} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  )
}
