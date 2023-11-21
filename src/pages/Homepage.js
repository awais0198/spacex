import { useState, useEffect } from 'react'
import Rockets from './Rockets'
import { getCurrentUser } from '../services'

export default function Homepage() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getCurrentUser()?.token && setCurrentUser(true)
    window.addEventListener('storage', () => setCurrentUser(true))
  }, [currentUser])

  return (
    <section className='showcase'>
      <div className='overlay'>
        <article className='text-white'>
          <h1 className='heading text-center capitalize'>FALCON 9</h1>
          <p className='max-w-3xl mx-auto text-center mt-6 font-mono text-base'>
            FIRST ORBITAL CLASS ROCKET CAPABLE OF REFLIGHT
          </p>
        </article>
      </div>
      {currentUser && <Rockets />}
    </section>
  )
}
