import React from "react"

type MemoFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MemoForm = ({ initialValues, onSubmit }: MemoFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <label>
        {`Memo text: `}
        <input placeholder="memo text" />
      </label>
      <button>Submit</button>
    </form>
  )
}

export default MemoForm
