import {useDispatch} from 'react-redux'
import { useAlert } from 'react-alert'

function useUtils() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const getDispatch = async(action) => {
        return await dispatch(action)
    }

    const getAlert = (message, timeout, type) => {
        alert.show(message, {
            timeout,
            type,
        })
    }

    return {getDispatch, getAlert}
}

export default useUtils