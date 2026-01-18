import React from 'react'
import Course1 from '../components/Course1'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Faq from '../components/Faq'
import Say from '../components/Say'
import CourseOverview from '../components/CourseOverview'


const CoursePage1 = () => {
  return (
    <div>
      <Nav />
      <Course1/>
      <CourseOverview />
      <Say />
      <Faq />
      <Footer/>
    </div>
  )
}

export default CoursePage1
