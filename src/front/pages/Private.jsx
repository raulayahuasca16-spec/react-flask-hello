import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { privateCheck } from "../services/backendServices"

export const Private = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const response = await privateCheck()
    console.log(response);
    if (response) {
      setUser(response)
      setLoading(false)
    } else {
      sessionStorage.removeItem("token")
      navigate("/")
    }
  }

  console.log(user);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } else {
      checkToken()
    }
  }, [navigate])

  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="card text-center" style={{ width: '24rem' }}>
            <div className="card-body">
              <h5 className="card-title">Bienvenido</h5>
              <p className="card-text">{user && user.email ? user.email : 'Usuario'}</p>
              <p className="card-text text-muted">Has iniciado sesión correctamente.</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    sessionStorage.removeItem('token')
                    navigate('/')
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
