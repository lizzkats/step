import React from 'react'
import Heading from '../reusable/Heading/Heading'
import RowList from '../reusable/Row/RowList'
import FooterContainer from '../reusable/Footer/FooterContainer'
import { Link } from 'react-router'

const Project = ({ couldDos, project }) => (
  <div className='project-container' >
    <Heading type='project' text={ project.text } />
    <RowList type='could-do' items={ couldDos } />
    <Link to='/project'><Icon type='back' /></Link>
    <FooterContainer type='could-do' />
  </div>
)

export default Project
