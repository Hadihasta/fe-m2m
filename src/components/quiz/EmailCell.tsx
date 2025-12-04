

interface EmailCellProps{ 
    emails : string[]
}

const EmailCell = (props : EmailCellProps) => {
    const {emails}  = props
    console.log(emails , " <<< ")

  return (
   <div className="email-cell">
      <div className="email-cell__row">
        <div className="email-cell__list">{emails.join(", ")}</div>
      </div>
    </div>
  )
}

export default EmailCell