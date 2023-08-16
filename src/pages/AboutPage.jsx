import { Link } from "react-router-dom"
import Card from "../components/shared/Card"

function AboutPage() {
  return (
    <Card>
      <h1>About this project</h1>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </Card>
  )
}

export default AboutPage