let zSpacing = -1000,
    lastPoss = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVall = []


window.onscroll = function() {

  let top = document.documentElement.scrollTop,
      delta = lastPoss - top

  lastPoss = top

  frames.forEach(function(n, i) {
    zVall.push((i * zSpacing)+ zSpacing)
    zVall[i] += delta * -6
    let frame = frames[i],
        transform = `translateZ(${zVall[i]}px)`,
        opacity= zVall[i] < Math.abs(zSpacing) / 1.5 ? 1 : 0

    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
  })

}

window.scrollTo(0, 2)


// audio

let musicBtn = document.querySelector('.music-btn'),
    audio = document.querySelector('.audio')


musicBtn.addEventListener('click', e => {
  let target = e.target
  target.classList.toggle('pause')

  audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() {
  musicBtn.classList.contains('pause') ? audio.pause() : audio.play()
}

window.onblur = function() {
  audio.pause()
}