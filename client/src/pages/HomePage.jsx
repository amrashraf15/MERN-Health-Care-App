import Header from '../components/Header.jsx'
import Speciality from "../components/Speciality.jsx"
import DoctorsMenu from "../components/DoctorsMenu.jsx"
import Banner from "../components/Banner.jsx"


const HomePage = () => {
  return (
    <div className="mt-20 pt-10">
      <Header/>
      <Speciality/>
      <DoctorsMenu/>
      <Banner/>
    </div>
  )
}

export default HomePage