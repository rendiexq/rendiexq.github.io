function startGame() {
    let audio = document.querySelector('audio');
    document.getElementById("start-screen").style.display = 'none';
    document.getElementById('game').style.display = 'block';
    audio.volume = 0.5;
    audio.play();
}

const scenes = {
    "start": {
        img: "img/bg-ispanskie.png",
        text: "Давуху украли! Ты стоишь посреди испанских. Что делать?",
        choices: [
            { text: "Позвать писюна!", target: "panic" },
            { text: "Искать улики", target: "magazine" }
        ]
    },
    "panic": {
        img: "img/bg-ispanskie.png", // Нужна картинка
        text: "Писюн! Эй, писька!",
        choices: [
            { text: "Дальше", target: "afterPanic" }
        ]
    },
    "afterPanic": {
        img: "img/bg-ispanskie.png", // Нужна картинка
        text: "Не откликается, нужно что-то делать.",
        choices: [
            { text: "Дальше", target: "start" }
        ]
    },
    "magazine": {
        img: "img/bg-ispanskie.png", // Нужна картинка
        text: "Ты видишь на стене какое-то объявление.",
        choices: [
            { text: "Прочитать", target: "zapiska" }
        ]
    },
    "zapiska": {
        img: "img/bg-magazine.png", // Нужна картинка
        text: "Ах!!!",
        choices: [
            { text: "Пойти", target: "airplane" },
            { text: "Нафиг надо", target: "sad" }
        ]
    },
    "sad": {
        img: "img/bg-ispanskie.png", // Нужна картинка
        text: "Да, нахуй он мне сдался, гондон. ",
        choices: [
            { text: "Я передумала", target: "airplane" }
        ]
    },
    "airplane": {
        img: "img/bg-plane.png", // Нужна картинка
        text: "Самолет! Летим в балашиху!",
        choices: [
            { text: "Дальше", target: "balashikha" }
        ]
    },
    "balashikha": {
        img: "img/bg-balashikha.png", // Нужна картинка
        text: "Вот я и тут. Что делать?",
        choices: [
            { text: "Позвать писюна", target: "panicB" },
            { text: "Спросить у прохожих", target: "panicB" }
        ]
    },
    "panicB": {
        img: "img/bg-balashikha.png", // Нужна картинка
        text: "Писю-ю-юн! Эй!!! Давуха! Аболту-у-ус! Что-то не отзывается.",
        choices: [
            { text: "Спросить у прохожих", target: "macan1" }
        ]
    },
    "macan1": {
        img: "img/bg-balashikha.png", // Нужна картинка
        text: "Ты идешь по улице и доходишь до здания с надписью 'ОДОН Им. Дзержинского'. Рядом с табличкой стоит какой-то мужчина в военной форме.",
        choices: [
            { text: "Подойти и спросить у него.", target: "macan2" }
        ]
    },
    "macan2": {
        img: "img/bg-macan.jpg", // Нужна картинка
        text: "Ксюньтик: 'Здравствуйте, а вы не видели писюнчика-давуху?'. Ты показала фото аболтуса на телефоне. Неизвесный: 'Привет, брат, не, не видел брата, брат. А че случилось, братан брата брат?' ",
        choices: [
            { text: "Рассказать.", target: "macan3" }
        ]
    },
    "macan3": {
        img: "img/bg-macan.jpg", // Нужна картинка
        text: "Ксюньтик: 'Ничего себе, Macan!!! Ну моего любимого котеночка украл вонючий владелец Варшавы.' Макан: 'Владелец Варшавы?, - заметно удивился парень. - У меня давно терки с этим глиномесом. Давай помогу.'",
        choices: [
            { text: "Да, спасибо!", target: "macan4" },
            { text: "Да я что-то подумала, не надо.", target: "macanLove" }
        ]
    },
    "macan4": {
        img: "img/bg-macan.jpg", // Нужна картинка
        text: "Ксюньтик: 'Ура, да! Правда, я не знаю где его искать...' Макан: 'Ничего страшного, я знаю где этот владелец-жопосранчик обитает. Иди за мной.'",
        choices: [
            { text: "Пойти", target: "macan5" }
        ]
    },
    "macanLove": {
        img: "img/bg-macan.jpg", // Нужна картинка
        text: "Макан: 'А... так ты не по-настоящему его любишь. Жаль. Я уверен, что, в отличие от некоторых, он любит тебя сильнее всех и желает тебе самого лучшего. Ну, как знаешь.'",
        choices: [
            { text: "Нет, подожди, я передумала.", target: "macan3" }
        ]
    },
    "macan5": {
        img: "img/bg-balashikha1.png", // Нужна картинка
        text: "Ксюняша: 'На самом деле, я очень сильно люблю моего зайчика.'",
        choices: [
            { text: "Идти дальше", target: "macan6" }
        ]
    },
    "macan6": {
        img: "img/bg-balashikha2.png", // Нужна картинка
        text: "Вы идете по Балашихе, пока не дойдете до нужного места. Попутно, ты любуешься красотами вокруг.",
        choices: [
            { text: "Идти дальше", target: "entrance" }
        ]
    },
    "entrance": {
        img: "img/bg-entrance.png", // Нужна картинка
        text: "Вы подошли к какому-то подъезду. Макан: 'Нам в левую дверь. Там подвал, там держат брата.'",
        choices: [
            { text: "Заходим", target: "podvalf" }
        ]
    },
    "podvalf": {
        img: "img/bg-podvalf.png", // Нужна картинкаВ
        text: "Макан: 'Ничего не видно, дрянь. Мы пришли за тобой, пердун! Я про тебя, Варшавный серун!' Вдруг откуда-то из темноты послышались шаги и слова Давухи: 'Суд! Милиция! Помогите, помогите!'",
        choices: [
            { text: "ПИСЮ-Ю-Н!!!!", target: "podval" }
        ]
    },
    "podval": {
        img: "img/bg-podval.png", // Нужна картинкаВ
        text: "Макан включил фонарик на мобиле и... Владелец Варшавы: 'Ай, урод!'. Макан: 'Давай, пузотряс, иди сюда!', послышался удар. Давуха побежал к выходу из подвала и ты за ним. И тут...",
        choices: [
            { text: "Бежим!!!", target: "final" }
        ]
    },
    "final": {
        img: "img/bg-final.png", // Нужна картинкаВ
        text: "Писюнчик: 'Ну неплохой такой фильм, да?'. Ты опомнилась: 'А? Да, хороший.' Давуха: 'Чего задумалась, солнышко?'. Ксюня: 'Да ничего. Просто поняла, что очень люблю тебя!'. Давуха начал что-то говорить, но ты уже не слушала его и просто радовалась тому, что вы рядом. # Игра окончена, чтобы переиграть - обнови страницу. ",
    }
    // ... добавляй сцены сюда
};

function startGame() {
    // Скрываем стартовый экран, показываем игру
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Включаем музыку (браузеры разрешают только после клика)
    document.getElementById('bg-music').play();

    // Запускаем первую сцену
    showScene("start");
}

function showScene(sceneId) {
    const scene = scenes[sceneId];

    // 1. Меняем картинку
    document.getElementById('bg').src = scene.img;

    // 2. Меняем текст
    document.getElementById('text-box').innerText = scene.text;

    // 3. Создаем кнопки
    const choicesBox = document.getElementById('choices-box');
    choicesBox.innerHTML = ""; // Очищаем старые кнопки

    scene.choices.forEach(choice => {
        // Создаем кнопку в памяти
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.className = 'choice-btn'; // Чтобы применился CSS

        // Говорим кнопке: "При клике — запускай следующую сцену"
        btn.onclick = () => showScene(choice.target);

        // Добавляем кнопку на экран
        choicesBox.appendChild(btn);
    });
}