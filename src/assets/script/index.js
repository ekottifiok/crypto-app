const adjustBtn = document.getElementById('adjustBtn')
const btcUSD = document.getElementById('btcUSD')
const currentBtc = document.getElementById('current_btc')


window.cryptoAppAPI.alertBTCValue((event, value) => {
    btcUSD.innerText = value
})

window.cryptoAppAPI.currentBTC((value) => {
    currentBtc.innerText = value
})

adjustBtn.addEventListener('click', () => {
    window.cryptoAppAPI.createAdjustWindow()
})
