import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const { userid } = useParams()

    return (
        <div className='text-center p-8 bg-gray-700 text-white text-2xl'>
            User: {userid}
        </div>
    )
}

export default User