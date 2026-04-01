<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>S4 Vocab Dash: Health & Sports</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f0f4f8; }
        .timer-bar { transition: width 1s linear; }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <div id="game-container" class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- Start Screen -->
        <div id="start-screen" class="p-8 text-center">
            <div class="mb-6 inline-block p-4 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h1 class="text-3xl font-extrabold text-slate-800 mb-4">Vocab Dash: S4 Health & Sports</h1>
            <p class="text-slate-600 mb-8 text-lg">Test your knowledge! 10 points per win, -5 for mistakes. Watch the timer!</p>
            <button onclick="startGame()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-lg">
                START MISSION
            </button>
        </div>

        <!-- Game Screen -->
        <div id="game-screen" class="hidden">
            <div class="bg-slate-800 p-4 flex justify-between items-center text-white">
                <div class="flex items-center gap-2">
                    <span class="text-slate-400 text-sm font-bold">SCORE:</span>
                    <span id="score-display" class="text-xl text-yellow-400 font-black">000</span>
                </div>
                <div class="flex items-center gap-2">
                    <span id="question-count" class="text-slate-400 text-sm">1/32</span>
                </div>
            </div>
            
            <div class="h-2 bg-slate-200 w-full">
                <div id="timer-bar" class="h-full bg-red-500 w-full timer-bar"></div>
            </div>

            <div class="p-8">
                <div id="question-text" class="text-xl font-semibold text-slate-800 mb-8 min-h-[80px]">
                    <!-- Question goes here -->
                </div>

                <div id="options-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Options go here -->
                </div>
            </div>
        </div>

        <!-- Explanation Modal (Hidden by Default) -->
        <div id="explanation-screen" class="hidden p-8 fade-in">
            <div class="bg-red-50 border-l-8 border-red-500 p-6 rounded-xl mb-6">
                <h2 class="text-red-700 font-bold text-lg mb-2">OOPS! THAT'S NOT QUITE RIGHT.</h2>
                <div id="explanation-content" class="text-slate-700">
                    <!-- Explanation content -->
                </div>
            </div>
            <button onclick="nextQuestion()" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all">
                PROCEED →
            </button>
        </div>

        <!-- Result Screen -->
        <div id="result-screen" class="hidden p-8 text-center fade-in">
            <h2 class="text-3xl font-black text-slate-800 mb-2">MISSION COMPLETE!</h2>
            <p id="final-score" class="text-5xl font-black text-blue-600 mb-8">Score: 0</p>
            
            <div id="review-section" class="text-left bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 class="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Your Personal Revision List:</h3>
                <div id="mistakes-list" class="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    <!-- Mistakes will be listed here -->
                </div>
            </div>

            <button onclick="location.reload()" class="mt-8 text-blue-600 font-bold hover:underline">TRY AGAIN</button>
        </div>
    </div>

    <script>
        const vocabData = [
            { word: "aerobics", pos: "n.", zh: "有氧運動", sentence: "Joining an ________ class is a great way to improve your heart health while listening to music.", explanation: "Energetic physical exercises, often performed with music.", example: "She does aerobics twice a week at the local gym." },
            { word: "jogging", pos: "n.", zh: "慢跑", sentence: "I enjoy ________ in the park every morning to get some fresh air.", explanation: "The activity of running at a slow, steady pace.", example: "Jogging is a popular low-cost way to stay fit." },
            { word: "vitamins", pos: "n.", zh: "維他命", sentence: "Fruits and vegetables are full of ________ that help keep our bodies healthy.", explanation: "Natural substances found in food that are necessary for health.", example: "Vitamin C is essential for a strong immune system." },
            { word: "calories", pos: "n.", zh: "卡路里", sentence: "If you eat more ________ than you burn, you might gain weight.", explanation: "Units used to measure the energy value of food.", example: "An apple contains about 95 calories." },
            { word: "nutrition", pos: "n.", zh: "營養", sentence: "Good ________ is essential for teenagers because their bodies are still growing.", explanation: "The process of getting the right type of food for health and growth.", example: "A balanced diet provides all the nutrition you need." },
            { word: "weight training", pos: "n. phr.", zh: "重量訓練", sentence: "He goes to the gym for ________ to build bigger muscles.", explanation: "Physical training that involves lifting weights.", example: "Weight training helps increase bone density." },
            { word: "carbohydrates", pos: "n.", zh: "碳水化合物", sentence: "Pasta and bread are high in ________, which provide energy for your brain.", explanation: "Substances found in foods like bread and rice that provide energy.", example: "Runners eat plenty of carbohydrates before a marathon." },
            { word: "protein", pos: "n.", zh: "蛋白質", sentence: "Meat, eggs, and beans are excellent sources of ________.", explanation: "A substance found in food that is needed to build and repair body tissues.", example: "Bodybuilders need a lot of protein to repair muscles." },
            { word: "yoga", pos: "n.", zh: "瑜伽", sentence: "I practice ________ every evening to help me relax and stay flexible.", explanation: "A system of exercises for physical and mental well-being.", example: "Yoga focuses on breathing and stretching." },
            { word: "boot camp", pos: "n. phr.", zh: "訓練營", sentence: "I joined a fitness ________ this summer, and the instructor was very strict!", explanation: "A short, intensive training program.", example: "The fitness boot camp helped me lose 5kg in a month." },
            { word: "cardio", pos: "n.", zh: "有氧運動", sentence: "Running and swimming are types of ________ exercise that make your heart beat faster.", explanation: "Physical exercise that increases your heart rate.", example: "I do 30 minutes of cardio every morning." },
            { word: "vegetarian", pos: "n./adj.", zh: "素食者", sentence: "As a ________, Jack never eats meat or fish.", explanation: "A person who does not eat meat.", example: "The restaurant has a great menu for vegetarians." },
            { word: "extreme sports", pos: "n. phr.", zh: "極限運動", sentence: "Skydiving and mountainboarding are considered ________ because they are dangerous.", explanation: "Sports that are exciting but involve a high level of risk.", example: "He loves the adrenaline rush from extreme sports." },
            { word: "enquiries", pos: "n.", zh: "查詢", sentence: "For any ________ about the gym membership, please call our office.", explanation: "Questions or requests for information.", example: "We receive many enquiries about our new yoga class." },
            { word: "additional charge", pos: "n. phr.", zh: "額外費用", sentence: "There is an ________ of $10 if you want to rent a locker.", explanation: "An extra amount of money that you must pay.", example: "Is there an additional charge for using the pool?" },
            { word: "healthcare system", pos: "n. phr.", zh: "醫療系統", sentence: "The government is working hard to improve the national ________.", explanation: "The service in a country that provides medical care.", example: "A good healthcare system should be accessible to everyone." },
            { word: "survival skills", pos: "n. phr.", zh: "生存技能", sentence: "Learning how to build a fire is one of the most important ________ in the wild.", explanation: "Skills that help you stay alive in dangerous situations.", example: "The scouts taught us basic survival skills." },
            { word: "mountainboarding", pos: "n.", zh: "山地滑板", sentence: "________ is like snowboarding, but you do it on grass or dirt hills.", explanation: "A sport where you ride a board with wheels down a mountain.", example: "You need a helmet and knee pads for mountainboarding." },
            { word: "skydiving", pos: "n.", zh: "跳傘", sentence: "She was scared at first, but ________ was the most thrilling experience of her life.", explanation: "The sport of jumping from an airplane with a parachute.", example: "Skydiving gives you an amazing view of the earth." },
            { word: "stress", pos: "n.", zh: "壓力", sentence: "Exam week causes a lot of ________ for many students.", explanation: "A feeling of worry or tension caused by difficult situations.", example: "Exercise is a great way to reduce stress." },
            { word: "thrilling experiences", pos: "n. phr.", zh: "刺激的經歷", sentence: "Traveling the world has given him many ________.", explanation: "Exciting and intense events or activities.", example: "Riding the roller coaster was a thrilling experience." },
            { word: "skateboarding", pos: "n.", zh: "滑板運動", sentence: "He spends his weekends ________ at the local park with his friends.", explanation: "The sport of riding on a short board with wheels.", example: "Skateboarding is now an Olympic sport." },
            { word: "anxiety", pos: "n.", zh: "焦慮", sentence: "Public speaking can cause a lot of ________ for some people.", explanation: "A feeling of nervousness or worry about what might happen.", example: "He suffered from anxiety before his final exam." },
            { word: "pressure", pos: "n.", zh: "壓力", sentence: "Athletes are under a lot of ________ to win gold medals for their country.", explanation: "Strong expectations or demands that cause worry.", example: "Peer pressure can influence how teenagers behave." },
            { word: "take risks", pos: "v. phr.", zh: "冒險", sentence: "You must be brave and ________ if you want to succeed in business.", explanation: "To do something although you know that something unpleasant might happen.", example: "Explorers must be willing to take risks." },
            { word: "strength", pos: "n.", zh: "力量", sentence: "Lifting weights regularly will help increase your physical ________.", explanation: "The quality of being physically strong.", example: "It takes a lot of strength to move this piano." },
            { word: "urban environment", pos: "n. phr.", zh: "城市環境", sentence: "Living in an ________ means being surrounded by tall buildings and busy streets.", explanation: "The surroundings found in a city or town.", example: "Modern architects try to bring nature into the urban environment." },
            { word: "gymnastics", pos: "n.", zh: "體操", sentence: "________ requires a high level of balance, strength, and flexibility.", explanation: "A sport involving physical exercises that show skill and agility.", example: "She started gymnastics training when she was five." },
            { word: "federation", pos: "n.", zh: "聯盟/總會", sentence: "The International Football ________ is responsible for organizing the World Cup.", explanation: "An organization or group of clubs/societies.", example: "The sports federation set the new rules for the competition." },
            { word: "competitive sport", pos: "n. phr.", zh: "競技運動", sentence: "Football is a very popular ________ played all over the world.", explanation: "A sport where people or teams play against each other to win.", example: "Playing a competitive sport teaches teamwork." },
            { word: "flexibility", pos: "n.", zh: "靈活性/柔軟度", sentence: "Yoga is famous for improving the ________ of your joints and muscles.", explanation: "The ability to bend easily without breaking.", example: "Gymnasts have incredible flexibility." },
            { word: "audience", pos: "n.", zh: "觀眾", sentence: "The ________ cheered loudly when the player scored the winning goal.", explanation: "The group of people who watch a performance or event.", example: "The stadium was packed with an excited audience." }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let timer;
        let timeLeft = 15;
        let mistakes = [];

        function startGame() {
            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('game-screen').classList.remove('hidden');
            score = 0;
            currentQuestionIndex = 0;
            mistakes = [];
            updateScore();
            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestionIndex >= vocabData.length) {
                showResults();
                return;
            }

            const data = vocabData[currentQuestionIndex];
            document.getElementById('question-count').innerText = `${currentQuestionIndex + 1}/${vocabData.length}`;
            document.getElementById('question-text').innerText = data.sentence;
            
            const options = generateOptions(data.word);
            const grid = document.getElementById('options-grid');
            grid.innerHTML = '';

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "p-4 border-2 border-slate-200 rounded-xl text-left hover:bg-blue-50 hover:border-blue-500 font-medium transition-all text-slate-700";
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt, data.word);
                grid.appendChild(btn);
            });

            startTimer();
        }

        function generateOptions(correct) {
            let options = [correct];
            while (options.length < 4) {
                let randomWord = vocabData[Math.floor(Math.random() * vocabData.length)].word;
                if (!options.includes(randomWord)) options.push(randomWord);
            }
            return options.sort(() => Math.random() - 0.5);
        }

        function startTimer() {
            clearInterval(timer);
            timeLeft = 15;
            const bar = document.getElementById('timer-bar');
            bar.style.width = "100%";
            bar.classList.remove('bg-red-500');
            bar.classList.add('bg-green-500');

            timer = setInterval(() => {
                timeLeft--;
                bar.style.width = (timeLeft / 15 * 100) + "%";
                
                if (timeLeft <= 5) {
                    bar.classList.remove('bg-green-500');
                    bar.classList.add('bg-red-500');
                }

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    handleWrong();
                }
            }, 1000);
        }

        function checkAnswer(selected, correct) {
            clearInterval(timer);
            if (selected === correct) {
                score += 10;
                updateScore();
                nextQuestion();
            } else {
                handleWrong();
            }
        }

        function handleWrong() {
            score = Math.max(0, score - 5);
            updateScore();
            const data = vocabData[currentQuestionIndex];
            
            // Add to mistake list if not already there
            if (!mistakes.some(m => m.word === data.word)) {
                mistakes.push(data);
            }

            document.getElementById('game-screen').classList.add('hidden');
            document.getElementById('explanation-screen').classList.remove('hidden');
            
            document.getElementById('explanation-content').innerHTML = `
                <p class="mb-2"><span class="font-bold text-slate-800">Target Word:</span> <span class="text-blue-600 font-bold">${data.word}</span> <span class="text-slate-400 italic">${data.pos}</span></p>
                <p class="mb-4 text-slate-600">${data.explanation}</p>
                <p class="text-sm bg-white p-3 rounded border border-red-100"><span class="font-bold">Example:</span> "${data.example}"</p>
            `;
        }

        function nextQuestion() {
            document.getElementById('explanation-screen').classList.add('hidden');
            document.getElementById('game-screen').classList.remove('hidden');
            currentQuestionIndex++;
            loadQuestion();
        }

        function updateScore() {
            document.getElementById('score-display').innerText = score.toString().padStart(3, '0');
        }

        function showResults() {
            document.getElementById('game-screen').classList.add('hidden');
            document.getElementById('result-screen').classList.remove('hidden');
            document.getElementById('final-score').innerText = `Score: ${score}`;

            const list = document.getElementById('mistakes-list');
            list.innerHTML = '';

            if (mistakes.length === 0) {
                list.innerHTML = '<p class="text-green-600 font-bold">Perfect! No mistakes found.</p>';
            } else {
                mistakes.forEach(m => {
                    const item = document.createElement('div');
                    item.className = "flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-slate-200";
                    item.innerHTML = `
                        <div>
                            <span class="font-bold text-slate-800">${m.word}</span>
                            <span class="text-xs text-slate-400 ml-1 italic">${m.pos}</span>
                        </div>
                        <div class="text-blue-600 font-medium">${m.zh}</div>
                    `;
                    list.appendChild(item);
                });
            }
        }
    </script>
</body>
</html>
