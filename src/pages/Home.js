import React from 'react'
import Homehero from '../components/Homehero'
import OurPartner from '../components/OurPartner'
import OurInvestor from '../components/OurInvestor'
import KeyPartners from '../components/KeyPartners'

export default function Home() {
  return (
    <div>
        <Homehero/>
        <OurPartner/>
        <OurInvestor/>
        <KeyPartners/>
    </div>
  )
}
