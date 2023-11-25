import React from 'react'

function ThanksInput() {

    
  return (
    <>
      <div>
          <input
            type="text"
            name="oneThank"
            value={input.oneThank}
            onChange={handleInput}
            placeholder="첫 번째 감사한 사항을 입력하세요."
          />
          <input
            type="text"
            name="twoThank"
            value={input.twoThank}
            onChange={handleInput}
            placeholder="두 번째 감사한 사항을 입력하세요."
          />
          <input
            type="text"
            name="threeThank"
            value={input.threeThank}
            onChange={handleInput}
            placeholder="세 번째 감사한 사항을 입력하세요."
          />
          <input
            type="text"
            name="fourThank"
            value={input.fourThank}
            onChange={handleInput}
            placeholder="네 번째 감사한 사항을 입력하세요."
          />
          <input
            type="text"
            name="fiveThank"
            value={input.fiveThank}
            onChange={handleInput}
            placeholder="다섯 번째 감사한 사항을 입력하세요."
          />
        </div>
    </>
  )
}

export default ThanksInput
