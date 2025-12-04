import { useLayoutEffect, useRef, useState } from 'react'

interface EmailCellProps {
  emails: string[]
  currentWidth: number
}

const EmailCell = (props: EmailCellProps) => {
  // destructure
  const { emails, currentWidth } = props
  // console.log(emails , currentWidth, " <<< ")

  const listRef = useRef<HTMLDivElement | null>(null)
  const [textWidth, setTextWidth] = useState(0)

  useLayoutEffect(() => {
    if (listRef.current) {
      const width = listRef.current.getBoundingClientRect().width
      console.log(emails)
      setTextWidth(width)
    }
  }, [currentWidth]) // jika email berubah, hitung ulang
  return (
    // width curent menyesuaikan dengan  variable currentWidth
    <div className="email-cell">
      <div className="email-cell__row">
        {/* butuh di ketahui email list membutuhkan berapa panjang text class ini cell__list  */}
        <div
          className="email-cell__list"
          ref={listRef}
        >
          {emails.join(', ')}
        </div>

        <div>Lebar text: {textWidth}px</div>
        <div>{currentWidth}</div>
      </div>
    </div>
  )
}

export default EmailCell
