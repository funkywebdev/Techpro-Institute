import React from 'react'
import Course2 from '../components/CourseDetails'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Faq from '../components/Faq'
import Say from '../components/Say'
import CourseDetails from '../components/CourseDetails'


const CourseDetailPage = () => {
  return (
    <div>
      <Nav />
      <CourseDetails />
      <Say />
      <Faq />
      <Footer/>
    </div>
  )
}

export default CourseDetailPage
