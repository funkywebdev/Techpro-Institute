import React from 'react'
import Course2 from '../components/Course2'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Faq from '../components/Faq'
import Say from '../components/Say'
import CourseOverview2 from '../components/CourseOverview2'


const CoursePage1 = () => {
  return (
    <div>
      <Nav />
      <Course2/>
      <CourseOverview2 />
      <Say />
      <Faq />
      <Footer/>
    </div>
  )
}

export default CoursePage1
