import React, { useState } from 'react'
import Prototype1 from './Prototype1'
import Prototype2 from './Prototype2'

const PrototypeCard = ({ title, description, status, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-lg border-2 text-left transition-all hover:shadow-md ${
      isActive
        ? 'border-indigo-600 bg-indigo-50'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className={`text-lg font-semibold ${isActive ? 'text-indigo-700' : 'text-gray-900'}`}>
        {title}
      </h3>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'active'
          ? 'bg-green-100 text-green-800'
          : status === 'in-progress'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-600'
      }`}>
        {status}
      </span>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed">
      {description}
    </p>
  </button>
)

const HomePage = ({ onSelectPrototype }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          IP Eligibility Prototypes
        </h1>
      </div>

      {/* Prototype Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <PrototypeCard
          title="Prototype 1 (separate)"
          description="Separate toggle controls for audience and eligibility."
          status="active"
          onClick={() => onSelectPrototype('prototype1')}
        />

        <PrototypeCard
          title="Prototype 2 (combined)"
          description="Combined radio controls for audience and eligibility."
          status="active"
          onClick={() => onSelectPrototype('prototype2')}
        />
      </div>
    </div>
  </div>
)

function App() {
  const [currentView, setCurrentView] = useState('home')

  const handleSelectPrototype = (prototypeId) => {
    setCurrentView(prototypeId)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  let currentPrototype;
  switch (currentView) {
    case 'prototype1':
      currentPrototype = <Prototype1 />
      break;
    case 'prototype2':
      currentPrototype = <Prototype2 />
  }

  if (currentView === 'home') {
    return <HomePage onSelectPrototype={handleSelectPrototype} />
  }

  else {
    return (
      <div>
        {/* Back to Home Button */}
        <div className="fixed top-3 left-4 z-50">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4L2 8L6 12M2 8H14"/>
            </svg>
            <span>All prototypes</span>
          </button>
        </div>
        {currentPrototype}
      </div>
    )
  }
}

export default App
