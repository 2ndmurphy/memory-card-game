let gameData = []

function startGame() {
    swal("Masukin nama dulu dong😁:", {
        content: "input",
        buttons: {
            cancel: "Cancel",
            confirm: "Start"
        },
    }).then((value) => {
        if (value) {
            let username = value.trim();
            if (username === '') {
                swal("Error", "Please enter your username!", "error");
                return;
            }

            document.querySelector('.container button').style.display = 'none'; // Sembunyikan tombol start game
            document.querySelector('.reset-btn').style.display = 'block'; // Tampilkan tombol reset game
            document.querySelector('.game').style.display = 'flex'; // Tampilkan game
            document.querySelector('.carousel-container').style.display = 'block'; // Tampilkan carousel

            const emojis = ["😀","😀","😁","😁","😎","😎","😍","😍","😋","😋","😴","😴","😱","😱","😈","😈"];
            let shuffleNum = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);
            let openedCards = []; // menyimpan referensi kartu yang terbuka
            let matchedCards = []; // menyimpan referensi kartu yang cocok
            let startTime = Date.now(); // Waktu mulai permainan

            for (let i = 0; i < emojis.length; i++) {
                let box = document.createElement('div');
                box.classList.add('item');

                box.onclick = (e) => {
                    const clickedCard = e.target;

                    // cek apakah kartu belum terbuka, tidak sedang dibandingkan, dan belum ada lebih dari 2 kartu terbuka
                    if (!clickedCard.classList.contains('boxOpen') && !clickedCard.classList.contains('boxMatch') && openedCards.length < 2) {
                        clickedCard.classList.add('boxOpen');
                        openedCards.push(clickedCard);

                        // jika ada 2 kartu terbuka
                        if (openedCards.length === 2) {
                            const card1Value = openedCards[0].innerHTML;
                            const card2Value = openedCards[1].innerHTML;

                            if (card1Value === card2Value) {
                                // jika kedua kartu cocok
                                openedCards.forEach(card => {
                                    card.classList.add('boxMatch');
                                    matchedCards.push(card);
                                });

                                openedCards = []; // reset array kartu terbuka

                                // jika semua kartu cocok
                                if (matchedCards.length === emojis.length) {
                                    let endTime = Date.now(); // Waktu selesai permainan
                                    let timeTaken = (endTime - startTime) / 1000; // Waktu yang dibutuhkan untuk menyelesaikan permainan (dalam detik)

                                    // Simpan data username dan waktu penyelesaian
                                    gameData.push({
                                        username: username,
                                        timeTaken, timeTaken
                                    });

                                    // Simpan data ke local storage atau kirim ke server, disini kita hanya tampilkan
                                    swal("Wah, Selamat🎉🎉!", `Kamu sudah mencocokan kartu dalam waktu ${timeTaken} detik!`, "success")
                                        .then(() => {
                                            window.location.reload();
                                        });
                                }
                            } else {
                                openedCards.forEach(card => {
                                    card.classList.add('boxNotMatch')
                                })
                                // jika kedua kartu tidak cocok
                                setTimeout(() => {
                                    openedCards.forEach(card => {
                                        card.classList.remove('boxOpen', 'boxNotMatch');
                                    });
                                    openedCards = []; // reset array kartu terbuka
                                }, 500);
                            }
                        }
                    }
                };

                box.innerHTML = shuffleNum[i];
                document.querySelector('.container .game').appendChild(box);
            }
        }
    });
}

function resetGame() {
    window.location.reload();
}