import state from "./state.js"
import * as el from "./elements.js"
import { reset } from "./actions.js"
import { kitchenTimer } from "./sounds.js"

export function countdown() {
  clearTimeout(state.countdownId)

  if(!state.isRunning) {
    return // toda recurção precisa ter um momento de parada, se não elão não vai parar nunca e vai causar um problema na aplicação
  }
  let minutes = Number(el.minutes.textContent)
  let seconds = Number(el.seconds.textContent)


  seconds--
  
  if(seconds < 0 ) {
    seconds = 59
    minutes--
  }

  if(minutes < 0){
    reset()
    kitchenTimer.play()
    return
  }

  updateDisplay(minutes, seconds)
  state.countdownId = setTimeout(() => countdown(), 1000) //CallbackFunction função que chama outra função; Recursão = chama a propria função e fica inicindo a cada 1000 milisegundos/ 1s
}

export function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes //Se for null, pegar do estado
  seconds = seconds ?? state.seconds

  el.minutes.textContent = String(minutes).padStart(2, "0") //padStart 2 caracteres, se tiver vazio, o outro completar com "0"
  el.seconds.textContent = String(seconds).padStart(2, "0")
}