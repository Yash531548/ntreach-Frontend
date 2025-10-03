import { useState, useEffect, useRef } from 'react'

const SpeechToText = ({ src, onResult }) => {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.')
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      const combinedText = finalTranscript + interimTranscript
      if (onResult) onResult(combinedText) // Update parent search state
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }
  }, [onResult])

  const toggleListening = () => {
    if (!listening) {
      recognitionRef.current.start()
      setListening(true)
    } else {
      recognitionRef.current.stop()
      setListening(false)
    }
  }

  return (
    <button onClick={toggleListening} className="cursor-pointer">
      <img
        src={src}
        alt={listening ? 'Stop' : 'Start'}
        style={{
          filter: listening
            ? 'invert(21%) sepia(96%) saturate(7476%) hue-rotate(1deg) brightness(100%) contrast(110%)'
            : 'none'
        }}
      />
    </button>
  )
}

export default SpeechToText
