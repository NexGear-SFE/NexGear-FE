import { Camera, RefreshCw, Volume2, VolumeX, X, Zap } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CameraScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScan: (scannedValue: string) => void
  title?: string
  subtitle?: string
  availableSerials?: string[]
}

function playBeep() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1200, ctx.currentTime)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.12)
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}

export function CameraScannerModal({
  isOpen,
  onClose,
  onScan,
  title = 'Quét mã vạch / Serial',
  subtitle,
  availableSerials = [],
}: CameraScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [hasCamera, setHasCamera] = useState<boolean | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [manualInput, setManualInput] = useState('')
  const [scanSuccessMessage, setScanSuccessMessage] = useState('')
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (!isOpen) return

    let isMounted = true

    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (isMounted) setHasCamera(false)
          return
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        }
        setHasCamera(true)
      } catch {
        if (isMounted) setHasCamera(false)
      }
    }

    void startCamera()

    return () => {
      isMounted = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [isOpen, facingMode])

  const handleTriggerScan = useCallback((value: string) => {
    const trimmed = value.trim().toUpperCase()
    if (!trimmed) return

    if (soundEnabled) {
      playBeep()
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100)
    }

    setScanSuccessMessage(`Đã nhận diện: ${trimmed}`)
    onScan(trimmed)
    setTimeout(() => {
      setScanSuccessMessage('')
    }, 1500)
  }, [soundEnabled, onScan])

  // BarcodeDetector loop if supported
  useEffect(() => {
    if (!isOpen || !hasCamera) return

    let animationFrameId: number
    let isDetecting = true

    // Check BarcodeDetector support
    const BarcodeDetectorClass = (window as unknown as { BarcodeDetector?: new () => { detect: (src: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector

    if (BarcodeDetectorClass) {
      const detector = new BarcodeDetectorClass()

      async function scanLoop() {
        if (!isDetecting || !videoRef.current || videoRef.current.readyState < 2) {
          animationFrameId = requestAnimationFrame(scanLoop)
          return
        }

        try {
          const barcodes = await detector.detect(videoRef.current)
          if (barcodes.length > 0 && barcodes[0]?.rawValue) {
            handleTriggerScan(barcodes[0].rawValue)
            return
          }
        } catch {
          // Detection frame error, continue loop
        }

        if (isDetecting) {
          animationFrameId = requestAnimationFrame(scanLoop)
        }
      }

      animationFrameId = requestAnimationFrame(scanLoop)
    }

    return () => {
      isDetecting = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [isOpen, hasCamera, handleTriggerScan])

  function toggleCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="relative flex flex-col h-full w-full sm:h-auto sm:max-h-[92vh] sm:max-w-xl sm:rounded-lg border border-surface-400 bg-surface-900 text-white shadow-2xl overflow-hidden animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-700 bg-surface-800/90 px-4 py-3.5 z-10">
          <div>
            <h3 className="font-heading text-base font-semibold flex items-center gap-2">
              <Camera className="h-5 w-5 text-brand-500" />
              {title}
            </h3>
            {subtitle && <p className="text-xs text-text-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              title={soundEnabled ? 'Tắt âm báo' : 'Bật âm báo'}
              className="rounded p-1.5 text-text-400 hover:text-white hover:bg-surface-700 transition-colors"
            >
              {soundEnabled ? <Volume2 className="h-5 w-5 text-brand-400" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-text-400 hover:text-white hover:bg-surface-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Camera Viewfinder Screen */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] bg-black flex items-center justify-center overflow-hidden">
          {hasCamera !== false && (
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Scanner Reticle Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
            {/* Viewfinder Target Box */}
            <div className="relative w-64 h-44 sm:w-80 sm:h-52 rounded-lg border border-white/20 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-brand-500 rounded-tl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-brand-500 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-brand-500 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-brand-500 rounded-br" />

              {/* Red Animated Laser Scan Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_8px_#ff0000] animate-[bounce_2s_infinite]" />
            </div>

            <p className="mt-4 text-xs font-medium text-white/80 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              Hướng camera vào mã vạch (Barcode / QR) trên vỏ hộp
            </p>

            {scanSuccessMessage && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full bg-success-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg animate-bounce">
                ✓ {scanSuccessMessage}
              </div>
            )}
          </div>

          {/* Camera fallback message if no camera / permission denied */}
          {hasCamera === false && (
            <div className="relative z-10 mx-6 text-center max-w-sm rounded-lg bg-surface-800/95 border border-surface-700 p-6 shadow-xl">
              <Camera className="mx-auto h-10 w-10 text-text-400 mb-3" />
              <h4 className="font-semibold text-sm text-white">Camera không khả dụng hoặc chưa cấp quyền</h4>
              <p className="mt-1 text-xs text-text-400">
                Bro có thể dùng thanh công cụ mô phỏng quét nhanh hoặc gõ trực tiếp bên dưới.
              </p>
            </div>
          )}

          {/* Camera controls in viewfinder */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={toggleCamera}
              title="Đổi camera trước/sau"
              className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/20 hover:bg-black/80"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Đổi cam</span>
            </button>
          </div>
        </div>

        {/* Quick Simulation & Manual Fallback Bar */}
        <div className="border-t border-surface-700 bg-surface-800 p-4 space-y-3">
          {availableSerials.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-text-300 flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-warning-400" />
                  Mã serial gợi ý trong kho (bấm để điền):
                </span>
                <span className="text-[11px] text-text-400">{availableSerials.length} mã khả dụng</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {availableSerials.map((serial) => (
                  <button
                    key={serial}
                    type="button"
                    onClick={() => setManualInput(serial)}
                    className="rounded bg-surface-700 border border-surface-600 px-2.5 py-1 font-mono text-xs text-white hover:bg-brand-600 hover:border-brand-500 active:scale-95 transition-all cursor-pointer"
                    title={`Bấm để điền mã ${serial} vào ô nhập`}
                  >
                    {serial}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manual Input in Modal */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (manualInput.trim()) {
                handleTriggerScan(manualInput)
                setManualInput('')
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Hoặc gõ/paste mã serial tại đây..."
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="flex-1 rounded border border-surface-600 bg-surface-900 px-3 py-2 text-xs font-mono text-white placeholder-text-500 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!manualInput.trim()}
              className="rounded bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600 disabled:opacity-40 transition-colors"
            >
              Nhận diện
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
