import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './emailcell.css'
interface EmailCellProps {
  emails: string[]
  currentWidth: number
}

const EmailCell = (props: EmailCellProps) => {
  const { emails, currentWidth } = props
  // console.log(emails , currentWidth, " <<< ")

  const ghostRef = useRef<HTMLDivElement | null>(null)
  const emailCellRef = useRef<HTMLDivElement | null>(null)
  const [emailFit, setEmailFit] = useState(0)
  const [emailDivWidth, setEmailDivWidth] = useState(currentWidth)

  //   const [textWidth, setTextWidth] = useState(0)

  useEffect(() => {
    // kalau false tidak perlu lakukan apa apa
    if (!emailCellRef.current) return
    // pakai resize observer agar tidak heavy re render
    // 7. Column width changes (slider) must react in real-time without heavy re-renders (use ResizeObserver or similar).
    const observer = new ResizeObserver((entry) => {
      const w = entry[0].contentRect.width
      setEmailDivWidth(w)
    })

    observer.observe(emailCellRef.current)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (!ghostRef.current) return

    // hitung email yang muat di curent div widht
    const ghost = ghostRef.current
    let usedWidth = 0
    let count = 0

    // loop emails yang masuk ada berapa index array e.g ['aa@gmail.com','bb@gmail.com']
    for (let i = 0; i < emails.length; i++) {
      // masukan ke div ghost
      ghost.innerText = emails[i]
      //   hitung widthnya dengan cara ini
      const width = ghost.getBoundingClientRect().width
      // index email lebih dari 0 kasih , lalu hitung lagi widthnya
      const sepWidth =
        i > 0
          ? (() => {
              ghost.innerText = ', '
              return ghost.getBoundingClientRect().width
            })()
          : 0
      // 0 + widht ghost div + widht div yang pakai , < dari widht yang di pakai
      if (usedWidth + width + sepWidth <= emailDivWidth) {
        // usedwidht pakai widht ghost yang sudah di isi email dan ", "
        usedWidth += width + sepWidth
        // count email yang berhasil masuk
        count++
      } else {
        break
      }
    }

    setEmailFit(count)
  }, [emails, emailDivWidth]) // hitung ulang jika email berubah dan width berubah

  //   kalau email kosong dan email array string -
  //
  // 9. Edge case: if no emails exist → display a minus sign ("–") or a consistent empty state.
  if (emails.length === 0 || emails[0] === '') return <span>–</span>
  const hiddenCount = emails.length - emailFit

  // CASE: hanya muat 1 email
  //   1.Cell shows the list of emails that fully FIT within the width (no truncation) — unless only one email fits.
  //2. If only one email fits → show the first email. If it’s too long, use ellipsis.
  if (emails.length === 1) {
    return (
      <div
        ref={emailCellRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          maxWidth: currentWidth,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexShrink: 1,
          }}
        >
          {emails[0]}
        </span>

        <div
          ref={ghostRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        />
        {/* <div>{emailFit} test</div> */}
      </div>
    )
  }

  // CASE: lebih dari 1 email muat
  const shown = emails.slice(0, emailFit)

  // kalau ada hiddentcount maka tampilkan badge
  const Badge = () => {
    return (
      <>
        {hiddenCount > 0 && (
          <span
            role="button"
            aria-label={`${emails}`}
            title={emails.join(', ')}
            style={{
              background: '#ccc',
              padding: '1px 6px',
              borderRadius: '10px',
              fontSize: '12px',
              flexShrink: 0,
            }}
          >
            {/* +{hiddenCount} */}
            +N
          </span>
        )}
      </>
    )
  }

  return (
    <div
      ref={emailCellRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        maxWidth: currentWidth,
        overflow: 'hidden',
      }}
    >
      <span style={{ whiteSpace: 'unset' }}>{shown.join(', ')}</span>

      {hiddenCount ? <Badge /> : <></>}
      <div
        ref={ghostRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default EmailCell

// solved case : 1 2 3 4 5 6 7 8 9

// unsolved case :
