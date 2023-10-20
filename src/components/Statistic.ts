import { state } from '../config';

const Statistic = (): string => {
  return `<div>
    Answers: ${ state.answers },
    Errors: ${ state.errors }
    ${ state.maxErrorsWord && `,Maximum erorrs word: ${ state.maxErrorsWord }` }
  </div>`
}

export default Statistic;