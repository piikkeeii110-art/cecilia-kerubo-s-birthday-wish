document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    // --- Universal Butterflies & Floating Hearts Background ---
    const butterflyContainer = document.createElement("div");
    butterflyContainer.className = "butterfly-container";
    for (let i = 0; i < 4; i++) {
        const b = document.createElement("div");
        b.className = "ambient-butterfly";
        b.style.left = `${Math.random() * 100}vw`;
        b.style.animationDelay = `${i * 3.5}s`;
        butterflyContainer.appendChild(b);
    }
    document.body.appendChild(butterflyContainer);

    const heartContainer = document.createElement("div");
    heartContainer.className = "ambient-heart-container";
    for (let i = 0; i < 6; i++) {
        const h = document.createElement("div");
        h.className = "ambient-heart";
        h.style.left = `${Math.random() * 100}vw`;
        h.style.animationDelay = `${i * 1.2}s`;
        h.style.animationDuration = `${6 + Math.random() * 4}s`;
        heartContainer.appendChild(h);
    }
    document.body.appendChild(heartContainer);

    // --- Touch & Mouse Finger Trail Effect ---
    const trailSymbols = ["✨", "💖", "🌸", "⭐", "💕"];
    let lastSpawnTime = 0;

    function createTrailParticle(x, y) {
        const particle = document.createElement("div");
        particle.className = "touch-trail-particle";
        particle.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    window.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastSpawnTime > 50) { // Throttle frequency for smooth performance
            createTrailParticle(e.clientX, e.clientY);
            lastSpawnTime = now;
        }
    });

    window.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const now = Date.now();
        if (now - lastSpawnTime > 40) {
            createTrailParticle(touch.clientX, touch.clientY);
            lastSpawnTime = now;
        }
    }, { passive: true });

    // --- FILE 1: index.html Logic ---
    if (currentPage === "index.html" || currentPage === "") {
        const lockStep = document.getElementById("lock-step");
        const welcomeContent = document.getElementById("welcome-content");
        const unlockBtn = document.getElementById("unlock-btn");
        const lockFeedback = document.getElementById("lock-feedback");
        const welcomeCard = document.getElementById("welcome-card");

        // 4 rings, each holding 0-9
        const numberSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let dialIndices = [0, 0, 0, 0];

        function updateDials() {
            for (let i = 0; i < 4; i++) {
                const dialEl = document.getElementById(`dial-${i}`);
                if (dialEl) {
                    dialEl.textContent = numberSet[dialIndices[i]];
                }
            }
        }

        // Handle Dial Buttons
        document.querySelectorAll(".dial-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const dialIdx = parseInt(btn.dataset.dial);
                const isUp = btn.classList.contains("up");

                if (isUp) {
                    dialIndices[dialIdx] = (dialIndices[dialIdx] + 1) % numberSet.length;
                } else {
                    dialIndices[dialIdx] = (dialIndices[dialIdx] - 1 + numberSet.length) % numberSet.length;
                }

                const dialEl = document.getElementById(`dial-${dialIdx}`);
                dialEl.style.transform = "scale(1.1)";
                setTimeout(() => dialEl.style.transform = "scale(1)", 150);

                updateDials();
            });
        });

        // Check Passcode
        if (unlockBtn) {
            unlockBtn.addEventListener("click", () => {
                const code = dialIndices.map(idx => numberSet[idx]).join("");

                // Validates your secret 4-digit passcode securely
                if (code === "2005") {
                    welcomeCard.classList.add("unlock-pulse");
                    lockFeedback.textContent = "Unlocked! ✨";
                    lockFeedback.style.color = "#16a34a";

                    setTimeout(() => {
                        lockStep.style.opacity = "0";
                        setTimeout(() => {
                            lockStep.style.display = "none";
                            welcomeContent.classList.remove("hidden-step");
                            initSparkleButton();
                        }, 400);
                    }, 600);
                } else {
                    welcomeCard.classList.add("shake-lock");
                    lockFeedback.textContent = "Incorrect passcode";
                    lockFeedback.style.color = "#dc2626";
                    setTimeout(() => welcomeCard.classList.remove("shake-lock"), 400);
                }
            });
        }

        function initSparkleButton() {
            const sparkleBtn = document.getElementById("sparkle-btn");
            const welcomeMessage = document.getElementById("welcome-message");

            if (sparkleBtn) {
                sparkleBtn.addEventListener("click", (e) => {
                    for (let i = 0; i < 30; i++) {
                        const glitter = document.createElement("div");
                        glitter.className = "glitter";
                        const tx = (Math.random() - 0.5) * 200 + "px";
                        const ty = (Math.random() - 0.5) * 200 + "px";
                        glitter.style.setProperty("--tx", tx);
                        glitter.style.setProperty("--ty", ty);
                        glitter.style.left = e.clientX + "px";
                        glitter.style.top = e.clientY + "px";
                        document.body.appendChild(glitter);
                        setTimeout(() => glitter.remove(), 1000);
                    }

                    sparkleBtn.style.display = "none";
                    welcomeMessage.classList.add("show-text");

                    setTimeout(() => {
                        welcomeCard.classList.add("fade-out");
                        setTimeout(() => {
                            window.location.href = "page2.html";
                        }, 800);
                    }, 2200);
                });
            }
        }

        updateDials();
    }
    
    // --- FILE 2: page2.html Logic ---
    if (currentPage === "page2.html") {
        const yesBtn = document.getElementById("yes-btn");
        const noBtn = document.getElementById("no-btn");
        const modal = document.getElementById("date-modal");
        const dateText = document.getElementById("current-date-text");
        const proceedBtn = document.getElementById("modal-proceed-btn");

        // Format nice readable date
        const optionsToday = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date().toLocaleDateString(undefined, optionsToday);
        dateText.textContent = `Today: ${formattedDate}`;

        function showDateModal() {
            modal.classList.remove("hidden-modal");
        }

        if (yesBtn) {
            yesBtn.addEventListener("click", showDateModal);
        }

        if (noBtn) {
            noBtn.addEventListener("click", () => {
                noBtn.style.transition = "all 0.4s ease";
                noBtn.style.opacity = "0";
                noBtn.style.transform = "scale(0)";
                setTimeout(() => {
                    noBtn.style.display = "none";
                    showDateModal(); // Show modal after "No" disappears
                }, 400);
            });
        }

        if (proceedBtn) {
            proceedBtn.addEventListener("click", () => {
                window.location.href = "page3.html";
            });
        }
    }

    // --- FILE 3: page3.html Logic ---
    if (currentPage === "page3.html") {
        const quizStep = document.getElementById("quiz-step");
        const catchStep = document.getElementById("catch-step");
        const options = document.querySelectorAll(".quiz-option");
        const heartArena = document.getElementById("heart-arena");
        const heartCounter = document.getElementById("heart-counter");

        // Step 1: Quiz Logic
        options.forEach(btn => {
            btn.addEventListener("click", () => {
                quizStep.style.opacity = "0";
                setTimeout(() => {
                    quizStep.classList.add("hidden-step");
                    catchStep.classList.remove("hidden-step");
                    startHeartGame();
                }, 400);
            });
        });

        // Step 2: Catch the Hearts Logic
        function startHeartGame() {
            let caughtCount = 0;
            const totalHearts = 5;

            function spawnHeart() {
                if (caughtCount >= totalHearts) return;

                const heart = document.createElement("div");
                heart.className = "floating-heart";
                
                // Random position inside arena
                const maxX = heartArena.clientWidth - 45;
                const maxY = heartArena.clientHeight - 45;
                heart.style.left = Math.random() * maxX + "px";
                heart.style.top = Math.random() * maxY + "px";

                heart.innerHTML = `
                    <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                `;

                heart.addEventListener("click", () => {
                    caughtCount++;
                    heartCounter.textContent = `Caught: ${caughtCount} / ${totalHearts}`;
                    heart.remove();

                    if (caughtCount >= totalHearts) {
                        setTimeout(() => {
                            window.location.href = "page4.html";
                        }, 500);
                    } else {
                        spawnHeart();
                        spawnHeart(); // spawn extra to keep it flowing
                    }
                });

                heartArena.appendChild(heart);
            }

            // Spawn initial hearts
            for (let i = 0; i < 3; i++) {
                spawnHeart();
            }
        }
    }

    // --- FILE 4: page4.html Logic ---
    if (currentPage === "page4.html") {
        const inputs = document.querySelectorAll(".gap");
        const feedback = document.getElementById("game-feedback");
        const solution = ["a", "p", "i", "d", "y"]; // Correct letter order

        inputs.forEach((input, index) => {
            input.addEventListener("input", (e) => {
                if (e.target.value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                checkAnswer();
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && !input.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });

        function checkAnswer() {
            const userAns = Array.from(inputs).map(i => i.value.toLowerCase());
            if (userAns.every(val => val !== "")) {
                const isCorrect = userAns.every((val, i) => val === solution[i]);
                if (isCorrect) {
                    feedback.textContent = "Correct! ✨";
                    feedback.style.color = "#16a34a";
                    setTimeout(() => {
                        window.location.href = "page5.html";
                    }, 800);
                } else {
                    feedback.textContent = "Try again!";
                    feedback.style.color = "#dc2626";
                }
            }
        }
    }

    // --- FILE 5: page5.html Logic ---
    if (currentPage === "page5.html") {
        const letterContainer = document.getElementById("letter-content");
        const speakBtn = document.getElementById("speak-btn");
        const message = "Dear Cecillia,\n\nOn this special day, may your path be filled with unending joy, warmth, and beautiful moments. You are truly appreciated and cherished.\n\nHappy Birthday ! i love youu \n\nWith all my love,\n[Peter]";

        if (letterContainer) {
            letterContainer.textContent = ""; 
            let index = 0;
            
            function typeLetter() {
                if (index < message.length) {
                    letterContainer.textContent += message.charAt(index);
                    index++;
                    setTimeout(typeLetter, 45);
                }
            }
            setTimeout(typeLetter, 500);
        }

        // Voice Speech Synthesis
        if (speakBtn) {
            speakBtn.addEventListener("click", () => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(message);
                    utterance.rate = 0.95;
                    utterance.pitch = 1.1;
                    window.speechSynthesis.speak(utterance);
                } else {
                    alert("Speech synthesis is not supported on your browser.");
                }
            });
        }

        // --- Manual Fidget Spinner (Left / Right Spin via Drag or Swipe) ---
        const fidgetMatrix = document.getElementById("fidget-matrix");
        if (fidgetMatrix) {
            let isDragging = false;
            let startX = 0;
            let currentRotation = 0;

            function startDrag(x) {
                isDragging = true;
                startX = x;
            }

            function moveDrag(x) {
                if (!isDragging) return;
                const deltaX = x - startX;
                currentRotation += deltaX * 0.8; // Smooth manual rotation left or right
                fidgetMatrix.style.transform = `rotate(${currentRotation}deg)`;
                startX = x;
            }

            function endDrag() {
                isDragging = false;
            }

            // Mouse Events
            fidgetMatrix.addEventListener("mousedown", (e) => startDrag(e.clientX));
            window.addEventListener("mousemove", (e) => moveDrag(e.clientX));
            window.addEventListener("mouseup", endDrag);

            // Touch Events (Mobile friendly)
            fidgetMatrix.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX), { passive: true });
            window.addEventListener("touchmove", (e) => {
                if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
            }, { passive: true });
            window.addEventListener("touchend", endDrag);
        }

        // --- Full-Screen Image Modal Viewer ---
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img-element");
        const closeModalBtn = document.getElementById("close-modal-btn");
        const profileCircles = document.querySelectorAll(".profile-circle");

        profileCircles.forEach(circle => {
            circle.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevents triggering spinner drag
                const img = circle.querySelector("img");
                if (img) {
                    modalImg.src = img.src;
                    modal.classList.remove("hidden-modal");
                }
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => {
                modal.classList.add("hidden-modal");
            });
        }

        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.classList.add("hidden-modal");
                }
            });
        }
    }
});