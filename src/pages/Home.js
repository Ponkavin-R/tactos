import React from 'react'
import Homehero from '../components/Homehero'
import OurPartner from '../components/OurPartner'
import OurInvestor from '../components/OurInvestor'
import KeyPartners from '../components/KeyPartners'
import Investors from './Investors'
import Mission_Vission from '../components/Mission_Vission'

export default function Home() {
  return (
    <div>
        <Homehero/>
        {/* <OurPartner/>
        <OurInvestor/>
        <KeyPartners/> */}
        <Mission_Vission/>
        <Investors/>
    </div>
  )
}
