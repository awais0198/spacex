import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiSpacex } from 'react-icons/si'
import Modal from 'react-modal'
import { SearchForm } from '../components'
import Account from './Account'
import { getCurrentUser } from '../services'

export default function Header() {
  const [accountModal, setAccountModal] = useState(false)

  const profileClick = () => setAccountModal(true)

  useEffect(() => {
    !getCurrentUser()?.token && profileClick()
  }, [])

  return (
    <>
      <header className='absolute flex items-center justify-between px-5 w-full'>
        <div className='flex justify-between items-center w-full'>
          <Link to='/'>
            <SiSpacex className='text-8xl text-white' />
          </Link>
          <div className='flex items-center ustify-between '>
            <SearchForm />
            <div
              onClick={() => !getCurrentUser()?.token && profileClick()}
              class='flex justify-center items-center space-x-3 cursor-pointer'
            >
              <div class='w-10 h-10 rounded-full overflow-hidden border-2 dark:border-white border-gray-900'>
                <img
                  src='https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
                  alt=''
                  class='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
          <Modal
            isOpen={accountModal}
            portalClassName='account-modal'
          >
            <Account accountModal={setAccountModal} />
          </Modal>
        </div>
      </header>
    </>
  )
}
