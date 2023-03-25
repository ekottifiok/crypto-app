const closeBtn = document.getElementById('closeBtn')
const updatebtn = document.getElementById('updatebtn')
const btcValue = document.getElementById('btcValue')

updatebtn.addEventListener('click', () => {
    const btc = btcValue.value
    window.cryptoChildAppAPI.updateBTCValue(btc)
    window.cryptoChildAppAPI.windowQuit()
})

closeBtn.addEventListener('click', () => {
    window.cryptoChildAppAPI.windowQuit()
})