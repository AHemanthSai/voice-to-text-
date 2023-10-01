const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
const transcriptionDiv = document.getElementById('transcription');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

recognition.continuous = true;
recognition.interimResults = true;

let isRecording = false;

recognition.onstart = () => {
    isRecording = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    transcriptionDiv.innerHTML = 'Listening...';
};

recognition.onresult = (event) => {
    let transcription = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcription += event.results[i][0].transcript;
        }
    }
    transcriptionDiv.innerHTML = transcription;
};

recognition.onend = () => {
    isRecording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    transcriptionDiv.innerHTML = 'Recording stopped.';
};

startBtn.addEventListener('click', () => {
    if (!isRecording) {
        recognition.start();
    }
});

stopBtn.addEventListener('click', () => {
    if (isRecording) {
        recognition.stop();
    }
});
