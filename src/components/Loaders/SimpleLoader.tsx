import Spinner from "react-bootstrap/Spinner"

const SimpleLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default SimpleLoader
