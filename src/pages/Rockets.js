import { useState } from 'react'
import Modal from 'react-modal'
import { Loading } from '../components'
import useFetch from '../hooks/useFetch'
import SingleRocket from './SingleRocket'

Modal.setAppElement('#root')

export default function Rockets() {
  const [data] = useFetch('https://api.spacexdata.com/v3/rockets')
  const [selectedRocket, setSelectedRocket] = useState(null)

  const openModal = (rocketId) => setSelectedRocket(rocketId)

  const closeModal = () => setSelectedRocket(null)

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className='py-32 max-width'>
          <h1 className='heading text-center mb-10'>Rockets</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {data?.map(({ rocket_id, rocket_name, flickr_images, description }) => (
              <div key={rocket_id}>
                <article className='bg-zinc-900'>
                  <img src={flickr_images[0]} alt={rocket_name} className='h-64 object-cover' />

                  <div className='p-5'>
                    <h2 className='font-bold text-white mb-3 text-lg'>{rocket_name}</h2>
                    <p className='text-white opacity-75 mb-10'>{`${description.substring(
                      0,
                      100
                    )}...`}</p>
                    <button
                      onClick={() => openModal(rocket_id)}
                      className='btn'
                      data-testid='read-more-btn'
                    >
                      Read More &rarr;
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <Modal
            isOpen={selectedRocket !== null}
            onRequestClose={closeModal}
            portalClassName='test-modal-portal'
            style={{ content: { background: 'black' }, overlay: { background: '#000000a8' } }}
          >
            <SingleRocket id={selectedRocket} closeModal={closeModal} />
          </Modal>
        </section>
      )}
    </>
  )
}
